import { BigNumber, ethers } from "ethers";

export function round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export function smallNumber(bn: BigNumber): number {
  return round(parseFloat(ethers.utils.formatEther(bn)), 1);
}
