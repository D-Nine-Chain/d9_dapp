import { PUBLIC_BURN_CONTRACT } from '$env/static/public';
import { accountStore, totalBurnedStore, burnPortfolioStore } from '$lib/store';
import { STORAGE_DEPOSIT_LIMIT, getAPI, getGasLimit, getReadGasLimit } from '$lib/chain/polkadot';
import { get } from 'svelte/store';
import { updateBurnData } from '$lib/chain';
import { Currency, reduceByCurrencyDecimal, toBigNumberString } from '$lib/utils';
import { getContract } from '..';

export async function getBurnPortfolio(address: string) {
   const main = await getContract("main");
   console.log("address in get burn portfolio function call is ", address)
   const { result, output } = await main.query.getPortfolio(address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   }, address);

   if (result.isOk) {
      let burnPortfolio = output.toJSON().ok
      console.log(burnPortfolio)
      if (burnPortfolio) {
         burnPortfolio.amountBurned = reduceByCurrencyDecimal(burnPortfolio.amountBurned, Currency.D9);
         burnPortfolio.balanceDue = reduceByCurrencyDecimal(burnPortfolio.balanceDue, Currency.D9);
         burnPortfolio.balancePaid = reduceByCurrencyDecimal(burnPortfolio.balancePaid, Currency.D9);
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
   console.log("total burned", output.toJSON())
   totalBurnedStore.set(reduceByCurrencyDecimal(output.toJSON().ok, Currency.D9))
}

export function getReturnPercent() {
   let totalBurned = get(totalBurnedStore);
   let firstThresholdAmount = 200_000_000; // Reduced by 10^12
   let percentage = 0.008;

   if (totalBurned <= firstThresholdAmount) {
      return percentage;
   }

   let excessAmount = totalBurned - firstThresholdAmount;
   let reductions = Math.floor(excessAmount / 100_000_000) + 1; // Reduced by 10^12

   for (let i = 0; i < reductions; i++) {
      percentage /= 2;
   }

   return percentage;


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
      value: toBigNumberString(burnAmount, Currency.D9)
   }, PUBLIC_BURN_CONTRACT)
      .signAndSend(account?.address, { signer: account?.signer }, async (result) => {
         if (result.status.isInBlock) {
            console.log(`Transaction included in block: ${result.status.asInBlock}`);
            await updateBurnData(account.address);
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
      value: toBigNumberString(burnAmount, Currency.D9)
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
         await updateBurnData(account.address);
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