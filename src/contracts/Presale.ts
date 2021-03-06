/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface PresaleInterface extends utils.Interface {
  contractName: "Presale";
  functions: {
    "addPrivatesalers(address[],uint256[])": FunctionFragment;
    "addWhitelisters(address[])": FunctionFragment;
    "bnbReceived()": FunctionFragment;
    "buy(address)": FunctionFragment;
    "claimEnabled()": FunctionFragment;
    "claimStart()": FunctionFragment;
    "claimTokens()": FunctionFragment;
    "finalize()": FunctionFragment;
    "hardcap()": FunctionFragment;
    "lastTokensClaimed(address)": FunctionFragment;
    "open()": FunctionFragment;
    "ownedTokens()": FunctionFragment;
    "owner()": FunctionFragment;
    "privatesaler(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setToken(address)": FunctionFragment;
    "timestampStarted()": FunctionFragment;
    "tokensPerBNB()": FunctionFragment;
    "tokensUnclaimed(address)": FunctionFragment;
    "totalTokensSold()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unpurchasedTokens()": FunctionFragment;
    "whitelisted(address)": FunctionFragment;
    "withdrawFunds()": FunctionFragment;
    "withdrawUnsoldTokens()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addPrivatesalers",
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "addWhitelisters",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "bnbReceived",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "buy", values: [string]): string;
  encodeFunctionData(
    functionFragment: "claimEnabled",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claimStart",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claimTokens",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "finalize", values?: undefined): string;
  encodeFunctionData(functionFragment: "hardcap", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "lastTokensClaimed",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "open", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownedTokens",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "privatesaler",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "setToken", values: [string]): string;
  encodeFunctionData(
    functionFragment: "timestampStarted",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokensPerBNB",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokensUnclaimed",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "totalTokensSold",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "unpurchasedTokens",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "whitelisted", values: [string]): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawUnsoldTokens",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "addPrivatesalers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addWhitelisters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bnbReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimEnabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claimStart", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "finalize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hardcap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastTokensClaimed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "open", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ownedTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "privatesaler",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "timestampStarted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokensPerBNB",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokensUnclaimed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalTokensSold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unpurchasedTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "whitelisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawUnsoldTokens",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "PrivateSaleClaimed(address,uint256)": EventFragment;
    "TokensBought(address,uint256)": EventFragment;
    "TokensClaimed(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PrivateSaleClaimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokensBought"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokensClaimed"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type PrivateSaleClaimedEvent = TypedEvent<
  [string, BigNumber],
  { user: string; tokens: BigNumber }
>;

export type PrivateSaleClaimedEventFilter =
  TypedEventFilter<PrivateSaleClaimedEvent>;

export type TokensBoughtEvent = TypedEvent<
  [string, BigNumber],
  { user: string; tokens: BigNumber }
>;

export type TokensBoughtEventFilter = TypedEventFilter<TokensBoughtEvent>;

export type TokensClaimedEvent = TypedEvent<
  [string, BigNumber],
  { user: string; tokens: BigNumber }
>;

export type TokensClaimedEventFilter = TypedEventFilter<TokensClaimedEvent>;

export interface Presale extends BaseContract {
  contractName: "Presale";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PresaleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addPrivatesalers(
      accounts: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addWhitelisters(
      accounts: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    bnbReceived(overrides?: CallOverrides): Promise<[BigNumber]>;

    buy(
      beneficiary: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimEnabled(overrides?: CallOverrides): Promise<[boolean]>;

    claimStart(overrides?: CallOverrides): Promise<[BigNumber]>;

    claimTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    finalize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hardcap(overrides?: CallOverrides): Promise<[BigNumber]>;

    lastTokensClaimed(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    open(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ownedTokens(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    privatesaler(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setToken(
      tokenAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    timestampStarted(overrides?: CallOverrides): Promise<[BigNumber]>;

    tokensPerBNB(overrides?: CallOverrides): Promise<[BigNumber]>;

    tokensUnclaimed(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalTokensSold(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unpurchasedTokens(overrides?: CallOverrides): Promise<[BigNumber]>;

    whitelisted(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    withdrawFunds(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawUnsoldTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addPrivatesalers(
    accounts: string[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addWhitelisters(
    accounts: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  bnbReceived(overrides?: CallOverrides): Promise<BigNumber>;

  buy(
    beneficiary: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimEnabled(overrides?: CallOverrides): Promise<boolean>;

  claimStart(overrides?: CallOverrides): Promise<BigNumber>;

  claimTokens(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  finalize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hardcap(overrides?: CallOverrides): Promise<BigNumber>;

  lastTokensClaimed(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  open(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ownedTokens(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  privatesaler(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setToken(
    tokenAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  timestampStarted(overrides?: CallOverrides): Promise<BigNumber>;

  tokensPerBNB(overrides?: CallOverrides): Promise<BigNumber>;

  tokensUnclaimed(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  totalTokensSold(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unpurchasedTokens(overrides?: CallOverrides): Promise<BigNumber>;

  whitelisted(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  withdrawFunds(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawUnsoldTokens(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addPrivatesalers(
      accounts: string[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    addWhitelisters(
      accounts: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    bnbReceived(overrides?: CallOverrides): Promise<BigNumber>;

    buy(beneficiary: string, overrides?: CallOverrides): Promise<void>;

    claimEnabled(overrides?: CallOverrides): Promise<boolean>;

    claimStart(overrides?: CallOverrides): Promise<BigNumber>;

    claimTokens(overrides?: CallOverrides): Promise<void>;

    finalize(overrides?: CallOverrides): Promise<void>;

    hardcap(overrides?: CallOverrides): Promise<BigNumber>;

    lastTokensClaimed(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    open(overrides?: CallOverrides): Promise<void>;

    ownedTokens(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    privatesaler(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setToken(tokenAddress: string, overrides?: CallOverrides): Promise<void>;

    timestampStarted(overrides?: CallOverrides): Promise<BigNumber>;

    tokensPerBNB(overrides?: CallOverrides): Promise<BigNumber>;

    tokensUnclaimed(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalTokensSold(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unpurchasedTokens(overrides?: CallOverrides): Promise<BigNumber>;

    whitelisted(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    withdrawFunds(overrides?: CallOverrides): Promise<void>;

    withdrawUnsoldTokens(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "PrivateSaleClaimed(address,uint256)"(
      user?: null,
      tokens?: null
    ): PrivateSaleClaimedEventFilter;
    PrivateSaleClaimed(
      user?: null,
      tokens?: null
    ): PrivateSaleClaimedEventFilter;

    "TokensBought(address,uint256)"(
      user?: null,
      tokens?: null
    ): TokensBoughtEventFilter;
    TokensBought(user?: null, tokens?: null): TokensBoughtEventFilter;

    "TokensClaimed(address,uint256)"(
      user?: null,
      tokens?: null
    ): TokensClaimedEventFilter;
    TokensClaimed(user?: null, tokens?: null): TokensClaimedEventFilter;
  };

  estimateGas: {
    addPrivatesalers(
      accounts: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addWhitelisters(
      accounts: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    bnbReceived(overrides?: CallOverrides): Promise<BigNumber>;

    buy(
      beneficiary: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimEnabled(overrides?: CallOverrides): Promise<BigNumber>;

    claimStart(overrides?: CallOverrides): Promise<BigNumber>;

    claimTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    finalize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hardcap(overrides?: CallOverrides): Promise<BigNumber>;

    lastTokensClaimed(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    open(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ownedTokens(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    privatesaler(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setToken(
      tokenAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    timestampStarted(overrides?: CallOverrides): Promise<BigNumber>;

    tokensPerBNB(overrides?: CallOverrides): Promise<BigNumber>;

    tokensUnclaimed(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalTokensSold(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unpurchasedTokens(overrides?: CallOverrides): Promise<BigNumber>;

    whitelisted(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    withdrawFunds(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawUnsoldTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addPrivatesalers(
      accounts: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addWhitelisters(
      accounts: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    bnbReceived(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    buy(
      beneficiary: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimEnabled(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    claimStart(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    claimTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    finalize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hardcap(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastTokensClaimed(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    open(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ownedTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    privatesaler(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setToken(
      tokenAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    timestampStarted(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokensPerBNB(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokensUnclaimed(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalTokensSold(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unpurchasedTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    whitelisted(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawFunds(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawUnsoldTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
