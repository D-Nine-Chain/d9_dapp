/**
 * @module utils
 * 
 * misc things to help throughout the UI such number formating, etc
 */

import { transactionInfoStore } from '$lib/store';
import { BN, hexToBn, hexToU8a, isHex, isU8a } from '@polkadot/util';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import Swal, { type SweetAlertIcon } from 'sweetalert2'
// import swal from 'sweetalert';

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
export function sendToast(title: string, icon: SweetAlertIcon = "info") {
   Swal.fire({
      position: 'top-end',
      icon: icon,
      title: title,
      // text: text,
      showConfirmButton: false,
      color: 'darkblue',
      background: "#eefcff",
      timer: 2500,
      toast: true,
      timerProgressBar: true,
   })
}

export function sendNotification(icon: SweetAlertIcon, title: string, text: string | undefined) {
   if (icon == "error") {
      Swal.fire({
         position: 'center',
         icon: "error",
         title: title,
         text: text,
         backdrop: true,
         showConfirmButton: true,
      })
   } else {
      Swal.fire({
         position: 'center',
         icon: icon,
         title: title,
         color: '#fff',
         background: "#0096FF",
         text: text,
         backdrop: false,
         showConfirmButton: false,
         timer: 2500
      })
   }
}


export function toBigNumberString(number: number | string, currency: Currency): string {
   const numberString = new BN(number).mul(new BN(10).pow(new BN(CURRENCY_DECIMALS[currency]))).toString()
   return numberString
}


export function reduceByCurrencyDecimal(number: string | number, currency: Currency): number {
   // Check if the input is an empty string
   if (typeof number === 'string' && number.trim().length === 0) {
      return new BN(0).toNumber();
   }
   // Check if the input is a string starting with '0x'
   else if (typeof number === 'string' && number.startsWith('0x')) {
      console.log("starts with 0x");
      return hexToBn(number).div(new BN(10).pow(new BN(CURRENCY_DECIMALS[currency]))).toNumber();
   }
   // If the input is a string but not a hex string, convert it using hexToU8a
   else if (typeof number === 'string') {
      return new BN(number).div(
         new BN(10).pow(new BN(CURRENCY_DECIMALS[currency]))
      ).toNumber();
   }
   // If the input is a number, handle it directly
   else if (typeof number === 'number') {
      return new BN(number).div(
         new BN(10).pow(new BN(CURRENCY_DECIMALS[currency]))
      ).toNumber();
   }
   // If none of the above, return 0 or throw an error
   else {
      console.error('Invalid number format');
      return 0; // or throw new Error('Invalid number format');
   }
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