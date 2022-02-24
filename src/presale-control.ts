import {FocalPresale, isConnected, isInstalled, PresaleState} from './lib';
import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {round, smallNumber} from './utils';

@customElement('presale-control')
export class PresaleControl extends LitElement {
  @property()
  presale: FocalPresale;

  @property()
  buyAmount = 0.1;

  async firstUpdated() {
    await new Promise((r) => setTimeout(r, 0));
    await this.presale.initialize();
    // need to check this first... 
    if (!isInstalled()) {
      super.requestUpdate();
      this.presale.walletState = "notinstalled";
      return; 
    } 
    if (await isConnected()) {
      // metamask previously authenticated just need to load
      await this.presale.getMetameme();
    }
    this.addEventListener('presaleState', this._handlePresaleState);
    super.requestUpdate();
  }

  constructor() {
    super();
    this.presale = new FocalPresale();
  }

  private async _getClaimState(): Promise<boolean> {
    if (this.presale.userDetails.tokensUnclaimed <= 0) {
      return false;
    }
    let hasClaimed: boolean =
      smallNumber(
        await this.presale.presaleInstance!.lastTokensClaimed(
          this.presale.userDetails.address!
        )
      ) > 0;
    if (this.presale.presaleDetails.state == 'Finalized') {
      if (this.presale.userDetails.isPrivatesale) {
        if (!hasClaimed) {
          return true;
        }
      }
      if (!hasClaimed) {
        return true;
      }
    }
    if (this.presale.presaleDetails.state == 'Vested') {
      return true;
    }
    return false;
  }

  private _getMaxBuyForRemainder() {
    let maxBuy = 2;
    if (this.presale.userDetails.tokensUnclaimed == 0) {
      return maxBuy;
    }
    if (this.presale.userDetails.tokensUnclaimed == 22450) {
      return 0;
    }
    let userBought = round(this.presale.userDetails.tokensUnclaimed / 11225, 1);
    let userRemaining = round(maxBuy - userBought, 1);
    if (this.presale.presaleDetails.raised > 498) {
      maxBuy = round(500 - this.presale.presaleDetails.raised, 1);
      if (maxBuy < userRemaining) {
        console.log(`total space less than user remaining, ${maxBuy}`);
        return maxBuy;
      }
    }
    console.log(
      `user already bought ${userBought}, space left: ${
        500 - this.presale.presaleDetails.raised
      }, user remaining: ${userRemaining}`
    );
    return userRemaining;
  }

  private _renderPurchaseUI(state: PresaleState, max: number) {
    if (this.presale.userDetails.isPrivatesale) {
      return html`<div
        class="min-h-full m-2 flex justify-center items-center font-bold text-xl text-white"
      >
        Private Sale Buyers CANNOT participate! Wait for sale to end to claim.
      </div>`;
    }
    if (state == 'PublicOpen') {
      return html`<div
        class="card p-2 min-h-full flex flex-col justify-center items-center font-bold text-xl text-white"
      >
        <div class="flex">
          <div class="text-white text-lg">Public Sale</div>
        </div>
        <div class="user-details text-sm">
          <div class="text-green-300">
            Address: ${this.presale.userDetails.address}
          </div>
          <div class="text-green-300">
            Purchased: ${this.presale.userDetails.tokensUnclaimed} FOCAL
          </div>
        </div>
        <input
          class="p-2 m-2 text-black min-w-full"
          type="number"
          placeholder="Amount BNB"
          id="quantity"
          name="quantity"
          .value="${this.buyAmount}"
          min="0.1"
          @change=${(e: any) => this._setBuyAmount(e.target.value)}
          max="${max}"
          step="0.1"
        />
        <div class="button-stuff flex p-2 self-end">
          <button
            class="p-2 m-2 rounded-full border-yellow-600 border-2"
            @click=${() => this._setBuyAmount(0.1)}
          >
            Min
          </button>
          <button
            class="p-2 m-2 rounded-full border-yellow-600 border-2"
            @click=${() => this._setBuyAmount(max)}
          >
            Max
          </button>
          <button
            class="p-2 m-2 rounded bg-green-400"
            ?disabled=${max == 0}
            @click=${this._buyTokens}
          >
            Purchase
          </button>
        </div>
      </div>`;
    }
    if (state == 'WhitelistOnly') {
      let isWhitelisted = this.presale.userDetails.isWhitelisted;
      return html`<div
        class="card p-2 min-h-full flex flex-col justify-center items-center font-bold text-xl text-white"
      >
        <div class="flex">
          <div class="text-white text-lg">
            ${isWhitelisted ? 'WHITELIST PERIOD' : 'NOT WHITELISTED!!'}
          </div>
        </div>
        <div class="user-details text-sm">
          <div class="text-green-300">
            Address: ${this.presale.userDetails.address}
          </div>
          <div class="text-green-300">
            Purchased: ${this.presale.userDetails.tokensUnclaimed} FOCAL
          </div>
        </div>
        <input
          class="p-2 m-2 text-black min-w-full"
          type="number"
          placeholder="Amount BNB"
          id="quantity"
          name="quantity"
          .value="${this.buyAmount}"
          min="0.1"
          @change=${(e: any) => this._setBuyAmount(e.target.value)}
          max="${max}"
          step="0.1"
        />
        <div class="button-stuff flex p-2 self-end">
          <button
            class="p-2 m-2 rounded-full border-yellow-600 border-2"
            @click=${() => this._setBuyAmount(0.1)}
          >
            Min
          </button>
          <button
            class="p-2 m-2 rounded-full border-yellow-600 border-2"
            @click=${() => this._setBuyAmount(max)}
          >
            Max
          </button>
          <button
            class="p-2 m-2 rounded bg-green-400"
            ?disabled=${!isWhitelisted || max == 0}
            @click=${this._buyTokens}
          >
            Purchase
          </button>
        </div>
      </div>`;
    }
  }

  private _renderClaimUI() {
    return html`<div
      class="card p-2 min-h-full flex flex-col justify-center items-center font-bold text-xl text-white"
    >
      <div class="flex">
        <div class="text-white text-lg">Claim FOCAL Tokens</div>
      </div>
      <div class="user-details text-sm">
        <div class="text-green-300">
          Address: ${this.presale.userDetails.address}
        </div>
        <div class="text-green-300">
          Unclaimed: ${this.presale.userDetails.tokensUnclaimed} FOCAL
        </div>
      </div>
      <div class="button-stuff flex p-2 self-end">
        <button
          class="p-2 m-2 rounded bg-green-400 m-w-full"
          ?disabled=${!this._getClaimState()}
          @click=${this._claimTokens}
        >
          Claim
        </button>
      </div>
    </div>`;
  }

  private _renderControlUI() {
    if (this.presale.presaleDetails.state == 'NotStarted') {
      return html`<div
        class="min-h-full m-2 flex justify-center items-center font-bold text-xl text-white p-2"
      >
        The sale hasn't started yet!
      </div>`;
    }
    if (
      ['WhitelistOnly', 'PublicOpen'].includes(
        this.presale.presaleDetails.state
      )
    ) {
      return this._renderPurchaseUI(
        this.presale.presaleDetails.state,
        this._getMaxBuyForRemainder()
      );
    }
    if (this.presale.presaleDetails.state == 'Filled') {
      return html`<div
        class="min-h-full m-2 flex justify-center items-center font-bold text-xl text-white"
      >
        Presale filled and waiting to be finalized!
      </div>`;
    }
    if (['Finalized', 'Vested'].includes(this.presale.presaleDetails.state)) {
      return this._renderClaimUI();
    }
  }

  override render() {
    if (this.presale.walletState === null) {
      return html`
        <div
          class="min-h-full m-2 flex justify-center items-center font-bold text-xl text-white"
        >
          <div class="self-center text-white p-2">
            <div class="text-xl m-2">Loading</div>
            <i class="fa-3x fas fa-spinner-third fa-spin m-2"></i>
          </div>
        </div>
      `;
    }
    if (this.presale.walletState === 'notinstalled') {
      return html`
        <div>
          <a href="https://github.com/Focal-Labs-Inc/FocalDeFi/releases/"
            ><button
              class="shadow bg-slate-100 rounded w-full hover:bg-slate-200 flex flex-col p-4 justify-evenly"
            >
              <div class="font-bold self-center">BUY WITH OUR APP</div>
              <div class="w-20 self-center">
                <img
                  src="assets/focalwordmark.svg"
                  class="object-contain"
                  style=""
                />
              </div></button
          ></a>
        </div>
      `;
    }
    if (this.presale.walletState === 'connected') {
      return this._renderControlUI();
    }
    return html`
      <div>
        <button
          class="shadow bg-slate-100 rounded w-full hover:bg-slate-200 flex flex-col p-4 mb-2 justify-evenly"
          id="metamask-connect"
          @click="${this._connectWallet}"
        >
        <div class="font-bold self-center">CONNECT WITH METAMASK/TRUSTWALLET</div>
          <div class="w-20 self-center">
            <img src="assets/metamask.svg" class="object-contain" />
          </div>
        </button>
        <a href="https://github.com/Focal-Labs-Inc/FocalDeFi/releases/"
          ><button
            class="shadow bg-slate-100 rounded w-full hover:bg-slate-200 flex flex-col p-4 justify-evenly"
          >
            <div class="font-bold self-center">BUY WITH OUR APP</div>
            <div class="w-20 self-center">
              <img
                src="assets/focalwordmark.svg"
                class="object-contain"
                style=""
              />
            </div></button
        ></a>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }

  private async _handlePresaleState(e: Event) {
    console.log((e as CustomEvent).detail);
    super.requestUpdate();
  }

  private async _buyTokens() {
    await this.presale.buyPresale(this.buyAmount);
  }
  private async _claimTokens() {
    await this.presale.claimPresale();
  }
  private async _setBuyAmount(amount: number) {
    console.log('NEW AMOUNT ' + amount);
    this.buyAmount = amount;
  }

  private async _connectWallet() {
    await this.presale.getMetameme();
    super.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'presale-control': PresaleControl;
  }
}
