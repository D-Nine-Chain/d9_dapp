/**
 * @module utils
 * 
 * misc things to help throughout the UI such number formating, etc
 */

import { transactionInfoStore } from '$lib/store';
import { BN, hexToU8a, isHex, isU8a } from '@polkadot/util';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
/**
 * @description defines the currencies supported by the app
 * @readonly
 * @enum {number}
 */
export enum Currency {
   D9 = "D9",
   USDT = "USDT",
   GREEN_POINTS = "GREEN_POINTS"
}
export enum TransactionStatus {
   Broadcast,
   InBlock,
   Finalized,
   Error,
}
/**
 * @description defines the decimals for each currency
 * @readonly
 */
export const CURRENCY_DECIMALS = {
   [Currency.D9]: 12,
   [Currency.USDT]: 2,
   [Currency.GREEN_POINTS]: 12
}



export function toBigNumberString(number: number | string, currency: Currency): string {
   const numberString = new BN(number).mul(new BN(10).pow(new BN(CURRENCY_DECIMALS[currency]))).toString()
   return numberString
}


export function reduceByCurrencyDecimal(number: string | number, currency: Currency): number {
   if (number == '') {
      return new BN(0).toNumber();
   }
   return new BN(number).div(
      new BN(10).pow(
         new BN(CURRENCY_DECIMALS[currency])
      )
   ).toNumber();
}

export function formatNumber(number: number): string {
   return number.toLocaleString('zh-CN', { compactDisplay: "short", maximumFractionDigits: 2, notation: "compact" })
}

export function isValidAddress(address: string): boolean {
   try {
      encodeAddress(
         isHex(address)
            ? hexToU8a(address)
            : decodeAddress(address)
      );

      return true;
   } catch (error) {
      return false;
   }
}

export function updateTransactionInfo(action: string, status: TransactionStatus) {

   transactionInfoStore.update((info) => {
      if (info) {
         info.status = status;
         info.action = action;
      }

      return info;
   })
}