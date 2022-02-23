import {
  Block,
  ExternalProvider,
  JsonRpcProvider,
  JsonRpcSigner,
} from '@ethersproject/providers';
import {ethers} from 'ethers';

import {
  FocalPoint,
  FocalPoint__factory,
  Presale,
  Presale__factory,
} from './contracts';
import {smallNumber} from './utils';

const PRESALE_ADDRESS = '0x004f127fD332220C8aFAdECaDDD3EdFC8af022A0';
const TOKEN_ADDRESS = '0xF0ca100000e47A0dd2087C81EC910B0BDe6Ad6f5';

export type WalletState = null | 'disconnected' | 'connected' | 'notinstalled';

interface MetamaskProvider extends ExternalProvider {
  networkVersion: string;
}

interface PresaleDetails {
  tokenAddress: '0xF0ca100000e47A0dd2087C81EC910B0BDe6Ad6f5';
  contractAddress: '0x004f127fD332220C8aFAdECaDDD3EdFC8af022A0';
  timeStarted: Date | null;
  raised: number;
  tokensSold: number;
  tokensAvailable: number;
  state: PresaleState;
}

interface PresaleUserDetails {
  tokensUnclaimed: number;
  isWhitelisted: boolean;
  isPrivatesale: boolean;
  address: string | null;
  signer: JsonRpcSigner | null;
}

export type PresaleState =
  | 'Unknown'
  | 'NotStarted'
  | 'WhitelistOnly'
  | 'PublicOpen'
  | 'Filled'
  | 'Finalized'
  | 'Vested';

export function isInstalled(): boolean {
  return (window as any).ethereum !== undefined;
}

export async function isConnected(): Promise<boolean> {
  const ethereum = (window as any).ethereum as MetamaskProvider;
  const provider = new ethers.providers.Web3Provider(ethereum, 'any');
  return (await provider.listAccounts()).length > 0;
}

export class FocalPresale {
  private initialized = false;

  public presaleInstance: Presale | null = null;
  public tokenInstance: FocalPoint | null = null;

  public presaleDetails: PresaleDetails;
  public userDetails: PresaleUserDetails;

  public openProvider: JsonRpcProvider = this.getProvider(
    'http://localhost:8545'
  );
  public signer: JsonRpcSigner | null = null;
  public walletState: WalletState = null;

  constructor() {
    this.presaleDetails = {
      tokenAddress: TOKEN_ADDRESS,
      contractAddress: PRESALE_ADDRESS,
      tokensSold: 0,
      tokensAvailable: 5_612_500,
      raised: 0,
      timeStarted: null,
      state: 'Unknown',
    };
    this.userDetails = {
      tokensUnclaimed: 0,
      isWhitelisted: false,
      isPrivatesale: false,
      address: null,
      signer: null,
    };
  }

  private getProvider(url: string = 'https://bsc-dataseed.binance.org/') {
    const res = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    console.log(`Opened provider manually... ${url}`);
    return res;
  }

  private connectContracts() {
    this.presaleInstance = new ethers.Contract(
      PRESALE_ADDRESS,
      Presale__factory.abi,
      this.openProvider
    ) as Presale;
    this.tokenInstance = new ethers.Contract(
      TOKEN_ADDRESS,
      FocalPoint__factory.abi,
      this.openProvider
    ) as FocalPoint;
  }

  public async initialize() {
    if (this.initialized) {
      return;
    }
    this.connectContracts();
    if (this.tokenInstance === null || this.presaleInstance === null) {
      console.log('Failed to connect contracts...');
      return;
    }
    // connect to the presale contract
    console.log(`Connected to presale at ${this.presaleInstance.address}!`);
    this.initialized = true;
    this.openProvider.on('block', async () => {
      await this.getInfo();
      console.log('new block');
    });
    this.walletState = 'disconnected';

    await this.getInfo();
  }

  public async getInfo() {
    if (this.tokenInstance === null || this.presaleInstance === null) {
      console.log('Contracts not connected');
      return;
    }
    this.presaleDetails.state = await this.getPresaleState();

    if (!['Unknown', 'NotStarted'].includes(this.presaleDetails.state)) {
      let ts = (await this.presaleInstance.timestampStarted()).toString();
      this.presaleDetails.timeStarted = new Date(parseInt(ts));
      this.presaleDetails.raised = smallNumber(
        await this.presaleInstance.bnbReceived()
      );
      this.presaleDetails.tokensSold = this.presaleDetails.raised * 11_225;
    }
    let listener = document.getElementById('control-box');
    console.log(listener);
    const event = new CustomEvent('presaleState', {
      detail: this.presaleDetails,
      bubbles: true,
    });
    listener!.dispatchEvent(event);
    if (this.signer !== null) {
      this.getUserInfo();
    }
  }

  public async getPresaleState() {
    if (this.initialized === false || this.presaleInstance === null) {
      console.log(
        'Instance of FocalPresale must be initialize() after construction'
      );
      return 'Unknown';
    }
    // determine if we are
    let started = await this.presaleInstance.timestampStarted();
    console.log(`Time started: ${started}`);
    let finalizeTime = await this.presaleInstance.claimStart();
    let presaleRaised = await this.presaleInstance.bnbReceived();
    let blockNumber = await this.presaleInstance.provider.getBlockNumber();
    let latestBlock: Block = await this.presaleInstance.provider.getBlock(
      blockNumber
    );
    let now = latestBlock.timestamp;
    console.log(
      `TIME NOW: ${now}, time started: ${started}, time finalized: ${finalizeTime}`
    );
    // > waiting for presale to start
    if (started.toNumber() == 0) {
      return 'NotStarted';
    }
    // > presale filled
    if (smallNumber(presaleRaised) >= 500) {
      if (
        (await this.presaleInstance.claimEnabled()) == false &&
        finalizeTime.toNumber() == 0
      ) {
        return 'Filled';
      }
    }
    // > presale finalized
    if (await this.presaleInstance.claimEnabled()) {
      if (now - finalizeTime.toNumber() < 60 * 60 * 24 * 7) {
        return 'Finalized';
      }
      // > vested for a week
      return 'Vested';
    }
    // > presale started; whitelist only
    if (now - started.toNumber() <= 1800) {
      return 'WhitelistOnly';
    }
    // > presale started and public
    if (smallNumber(presaleRaised) <= 500) {
      return 'PublicOpen';
    }
    return 'Unknown';
  }

  async getMetameme(): Promise<JsonRpcSigner | null> {
    if (!isInstalled()) {
      this.walletState = 'notinstalled';
      throw new Error("Metamask isn't installed");
    }
    const ethereum = (window as any).ethereum as MetamaskProvider;
    const provider = new ethers.providers.Web3Provider(ethereum, 'any');
    await provider.send('eth_requestAccounts', []);
    if (ethereum.networkVersion != '56') {
      try {
        await provider.send('wallet_switchEthereumChain', [{chainId: '0x38'}]);
      } catch (error) {
        // if user cancels metamask request
        if ((error as any).code === 4001) {
          console.log('Metamask Connection Cancelled');
          return null;
        }
      }
    }
    this.signer = provider.getSigner();

    // reconnect to the contract with a signer
    // so we can send transactions too
    this.presaleInstance = new ethers.Contract(
      PRESALE_ADDRESS,
      Presale__factory.abi,
      this.signer
    ) as Presale;
    this.walletState = 'connected';
    await this.getUserInfo();
    return this.signer;
  }

  async getUserInfo() {
    if (this.signer === null) {
      console.log('call getMetameme() first!');
      return;
    }
    this.userDetails.address = await this.signer.getAddress();
    this.userDetails = {
      ...this.userDetails,
      isWhitelisted: await this.presaleInstance!.whitelisted(
        this.userDetails.address
      ),
      isPrivatesale: await this.presaleInstance!.privatesaler(
        this.userDetails.address
      ),
      tokensUnclaimed: smallNumber(
        await this.presaleInstance!.tokensUnclaimed(this.userDetails.address)
      ),
    };
  }

  async buyPresale(amountBnb: number) {
    // ensure metamememe is connected
    // verify presale state
    // check if the user already bought the max allocation
    // check if the user is whitelisted
    if (this.signer === null) return;
    if (this.userDetails.tokensUnclaimed >= 22450) {
      return;
    }
    if (this.userDetails.isPrivatesale) {
      return;
    }
    if (this.presaleDetails.state == 'WhitelistOnly') {
      if (!this.userDetails.isWhitelisted) {
        return;
      }
      await (
        await this.presaleInstance!.buy(this.userDetails.address!, {
          value: ethers.utils.parseEther(amountBnb.toString()),
        })
      ).wait();
    }
    if (this.presaleDetails.state == 'PublicOpen') {
      await (
        await this.presaleInstance!.buy(this.userDetails.address!, {
          value: ethers.utils.parseEther(amountBnb.toString()),
        })
      ).wait();
    }
  }

  async claimPresale() {
    // ensure metamememe is connected
    // verify presale state
    // check unclaimed tokens
    if (this.signer === null) {
      return;
    }
    if (!['Finalized', 'Vested'].includes(this.presaleDetails.state)) {
      return;
    }
    if (this.userDetails.tokensUnclaimed == 0) {
      return;
    }
    await (await this.presaleInstance!.claimTokens()).wait();
  }
}
