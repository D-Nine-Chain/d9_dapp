import { PUBLIC_BURN_CONTRACT } from '$env/static/public';
import { accountStore, totalBurnedStore, burnPortfolioStore, transactionInfoStore } from '$lib/store';
import { STORAGE_DEPOSIT_LIMIT, getAPI, getGasLimit, getReadGasLimit } from '$lib/chain/polkadot';
import { get } from 'svelte/store';
import { updateBurnData } from '$lib/chain';
import { Currency, reduceByCurrencyDecimal, sendToast, sendNotification, toBigNumberString, updateTransactionInfo } from '$lib/utils';
import { getContract } from '..';
import { TransactionStatus } from '$lib/utils';
import { hexToBn } from '@polkadot/util';


export async function getBurnPortfolio(address: string) {
   const main = await getContract("main");
   console.log("address in get burn portfolio function call is ", address)
   const { result, output } = await main.query.getPortfolio(address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   }, address);

   if (result.isOk) {
      // sendNotification()
      let burnPortfolio = output.toJSON().ok
      console.log(burnPortfolio)
      if (burnPortfolio) {
         // sendNotification()
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
   console.log("total burned", output.toJSON().ok)

   totalBurnedStore.set(reduceByCurrencyDecimal(hexToBn(output.toJSON().ok).toString(), Currency.D9))
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
   sendNotification("info", "开始燃烧", "请稍等")
   const account = get(accountStore);
   const main = await getContract("main");
   const api = await getAPI();

   if (!account?.signer) { return };

   return await main.tx.burn({
      gasLimit: await getGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: toBigNumberString(burnAmount, Currency.D9)
   }, PUBLIC_BURN_CONTRACT)
      .signAndSend(account?.address, { signer: account?.signer }, async (result) => {
         if (result.status.isInBlock) {
            sendNotification("info", "交易状态", "交易在一个区块中")
            console.log(`Transaction included in block: ${result.status.asInBlock}`);
         } else if (result.status.isFinalized) {
            await updateBurnData(account.address);
            sendNotification("success", "交易状态", "交易已完成")
            console.log(`Transaction finalized in block: ${result.status.asFinalized}`);
         } else if (result.status.isBroadcast) {
            sendNotification("info", "交易状态", "交易正在广播")
            console.log('Transaction has been broadcasted');
         } else if (result.status.isReady) {
            console.log('Transaction is ready');
         } else if (result.status.isFuture) {
            console.log('Transaction is scheduled for a future block');
         }

         // Check for dispatch error
         if (result.dispatchError) {
            updateTransactionInfo("burn", TransactionStatus.Error)
            sendNotification("error", "", `${JSON.stringify(result.dispatchError.toHuman())}`)
            result.events.forEach((e) => {
               console.log(e.toJSON())
            })
            console.log("transaction result is ", result.toHuman())
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
   sendNotification("info", "开始提款", "请稍等");
   const account = get(accountStore);
   const main = await getContract("main");
   if (!account?.signer) { return };
   return await main.tx.withdraw({
      gasLimit: await getGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
   }, PUBLIC_BURN_CONTRACT).signAndSend(account?.address, { signer: account?.signer }, async (result) => {
      if (result.status.isInBlock) {
         sendNotification("info", "交易状态", "2/3 交易已包含在区块中")
         console.log(`Transaction included in block: ${result.status.asInBlock}`);
         await updateBurnData(account.address);
      } else if (result.status.isFinalized) {
         sendNotification("success", "交易状态", "3/3 交易已完成")
         console.log(`Transaction finalized in block: ${result.status.asFinalized}`);
      } else if (result.status.isBroadcast) {
         sendNotification("info", "1/3 交易已广播", "请稍等")
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
         sendNotification("error", "交易错误", `${JSON.stringify(result.dispatchError.toHuman())}`)
         console.error('Transaction failed with dispatch error:', result.dispatchError.toHuman());
      }
   });
} 