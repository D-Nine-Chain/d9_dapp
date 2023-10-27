import { PUBLIC_BURN_CONTRACT } from '$env/static/public';
import { accountStore } from '$lib/stores/accountStore';
import { STORAGE_DEPOSIT_LIMIT, getAPI, getGasLimit, getReadGasLimit } from '$lib/rpc/polkadot';
import { get } from 'svelte/store';
import { burnPortfolioStore } from '$lib/stores/burnPortfolioStore';

import { totalBurnedStore } from '$lib/stores/totalBurnedStore';
import { updateData } from '$lib/rpc';
import { toBigNumberD9 } from '$lib/utils';
import { getContract } from '..';

export async function getBurnPortfolio() {
   const account = get(accountStore);
   const main = await getContract("main");
   const { result, output } = await main.query.getPortfolio(account.address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   }, account.address);

   if (result.isOk) {
      let burnPortfolio = output.toJSON().ok
      console.log(burnPortfolio)
      if (burnPortfolio) {
         burnPortfolioStore.set(burnPortfolio)
      }
   }
}

export async function getTotalBurned() {
   console.log("total burned called")
   const main = await getContract("main");
   const account = get(accountStore);
   const { output } = await main.query.getTotalBurned(account.address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   });
   console.log(output.toJSON())
   totalBurnedStore.set(output.toJSON().ok)
}


export async function burn(burnAmount: number) {
   const account = get(accountStore);
   const main = await getContract("main");
   const api = await getAPI();
   if (!account?.signer) { return };

   console.log("constants", api.consts)
   return await main.tx.burn({
      gasLimit: await getGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: toBigNumberD9(burnAmount)
   }, PUBLIC_BURN_CONTRACT)
      .signAndSend(account?.address, { signer: account?.signer }, async (result) => {
         if (result.status.isInBlock) {
            console.log(`Transaction included in block: ${result.status.asInBlock}`);
            await updateData();
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
export async function dryBurn(burnAmount: number) {

   const account = get(accountStore);
   const main = await getContract("main");
   const api = await getAPI();
   if (!account?.signer) { return };

   console.log("constants", api.consts)
   const { result, output, gasRequired } = await main.query.burn(account.address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: toBigNumberD9(burnAmount)
   }, PUBLIC_BURN_CONTRACT)
   console.log("check")
   console.log(output.toHuman())
   console.log(result.toHuman())
   console.log(gasRequired.toHuman())
}

export async function withdraw() {
   const account = get(accountStore);
   const main = await getContract("main");
   if (!account?.signer) { return };
   return await main.tx.withdraw({
      gasLimit: await getGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
   }, PUBLIC_BURN_CONTRACT).signAndSend(account?.address, { signer: account?.signer }, async (result) => {
      if (result.status.isInBlock) {
         console.log(`Transaction included in block: ${result.status.asInBlock}`);
         await updateData();
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