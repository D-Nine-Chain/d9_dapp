import { accountStore, liquidityProviderStore, currencyReservesStore } from '$lib/store';
import { STORAGE_DEPOSIT_LIMIT, getGasLimit, getReadGasLimit } from '$lib/chain/polkadot';
import { get } from 'svelte/store';

import { BN } from '@polkadot/util';
import { Currency, reduceByCurrencyDecimal, toBigNumberString } from '$lib/utils';
import { contracts, getContract } from '..';
import { updateUSDTBalance } from '../usdt';
import type { Account } from '$lib/types/types';

export async function updateLiquidityProvider() {
   const account = get(accountStore);
   const amm = await contracts.amm;
   const { result, output } = await amm.query.getLiquidityProvider(account.address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   }, account.address);

   if (result.isOk) {
      let liquidityProvider = output.toJSON().ok.ok
      console.log(liquidityProvider)
      if (liquidityProvider) {
         liquidityProviderStore.set(liquidityProvider)
      }
   }
}

export async function getCurrencyReserves() {
   const account = get(accountStore);
   const amm = await getContract("amm");
   const { result, output } = await amm.query.getCurrencyReserves(account.address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: 0
   });

   if (result.isOk) {
      let okOutput = output.toPrimitive().ok
      console.log("currency reserves output", okOutput)
      let d9 = reduceByCurrencyDecimal(okOutput[0], Currency.D9);
      let usdt = reduceByCurrencyDecimal(okOutput[1], Currency.USDT);
      let currencyReserves = { d9, usdt }
      console.log(currencyReserves)
      if (okOutput) {
         console.log("currency reserves", okOutput)
         currencyReservesStore.set(currencyReserves)
      }
   }
}

export async function getUSDTPrice() {
   await getCurrencyReserves();
   let currencyReserves = get(currencyReservesStore)
   return currencyReserves.usdt / currencyReserves.d9;
}


export async function purchaseUSDT(d9Amount: number) {
   const account = get(accountStore);
   const amm = await getContract("amm");
   if (!account?.signer) { return };

   return await amm.tx.getUsdt({
      gasLimit: await getGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: toBigNumberString(d9Amount, Currency.D9)
   })
      .signAndSend(account?.address, { signer: account?.signer }, async (result) => {
         if (result.status.isInBlock) {
            console.log(`Transaction included in block: ${result.status.asInBlock}`);
            await updateUSDTBalance();
         } else if (result.status.isFinalized) {
            console.log(`Transaction finalized in block: ${result.status.asFinalized}`);
         } else if (result.status.isBroadcast) {
            console.log('Transaction has been broadcasted');
         } else if (result.status.isReady) {
            console.log('Transaction is ready');
         } else if (result.status.isFuture) {
            console.log('Transaction is scheduled for a future block');
         }

         // Check for dispatch error
         if (result.dispatchError) {
            result.events.forEach((e) => {
               console.log(e)
            })
            console.error('Transaction failed with dispatch error:', result.dispatchError.toHuman());
         }
      });
}


export async function addLiquidity(account: Account, d9Amount: number, usdtAmount: number) {

   const amm = await getContract("amm");
   if (!account?.signer) { return };

   return await amm.tx.addLiquidity({
      gasLimit: await getGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: toBigNumberString(d9Amount, Currency.D9)
   }, toBigNumberString(usdtAmount, Currency.USDT))
      .signAndSend(account?.address, { signer: account?.signer }, async (result) => {
         if (result.status.isInBlock) {
            console.log(`Transaction included in block: ${result.status.asInBlock}`);
         } else if (result.status.isFinalized) {
            console.log(`Transaction finalized in block: ${result.status.asFinalized}`);
         } else if (result.status.isBroadcast) {
            console.log('Transaction has been broadcasted');
         } else if (result.status.isReady) {
            console.log('Transaction is ready');
         } else if (result.status.isFuture) {
            console.log('Transaction is scheduled for a future block');
         }

         // Check for dispatch error
         if (result.dispatchError) {
            result.events.forEach((e) => {
               console.log(e)
            })
            console.error('Transaction failed with dispatch error:', result.dispatchError.toHuman());
         }
      });
}

