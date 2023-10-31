import { PUBLIC_MERCHANT_CONTRACT } from '$env/static/public';
import { accountStore, merchantAccountExpiryStore, merchantAccountStore } from '$lib/store';
import { STORAGE_DEPOSIT_LIMIT, getGasLimit, getReadGasLimit } from '$lib/chain/polkadot';
import { get } from 'svelte/store';
import { getContract } from '$lib/contracts';
import { BN, hexToBn } from '@polkadot/util';
import { Currency, reduceByCurrencyDecimal, toBigNumberString } from '$lib/utils';
import type { Account, MerchantAccount } from '$lib/types/types';

export async function updateMerchantAccount() {
   const account = get(accountStore);
   const merchant = await getContract("merchant");
   console.log("merchant", merchant);

   const { result, output } = await merchant.query.getAccount(account.address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   }, account.address);

   if (result.isOk && output.toJSON().ok.ok) {
      let merchantAccount = output.toJSON().ok.ok;
      merchantAccount.greenPoints = reduceByCurrencyDecimal(hexToBn(merchantAccount.greenPoints).toString(), Currency.GREEN_POINTS);

      if (merchantAccount) {
         let expiryMilliseconds = await getMerchantAccountExpiry();
         merchantAccount.expiry = new Date(parseInt(expiryMilliseconds)).toLocaleDateString('zh-CN');
         merchantAccountStore.set(merchantAccount);
         return merchantAccount;
      }
   }

}

export async function isActiveMerchant(): Promise<boolean> {
   const expiry = await getMerchantAccountExpiry();
   const now = new Date()
   return new Date(parseInt(expiry)) > now;
}

export async function getMerchantAccountExpiry(): Promise<string> {
   const merchant = await getContract("merchant");
   const account = get(accountStore);
   const { output } = await merchant.query.getExpiry(account.address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   }, account.address);
   let accountExpiryResult = output.toJSON().ok
   if (accountExpiryResult.err) {
      merchantAccountExpiryStore.set(0)
      throw new Error("Can not retrieve expiry")
   } else {
      return accountExpiryResult.ok;
   }
}


export async function d9Subscribe(months: number) {
   const account = get(accountStore);
   const merchant = await getContract("merchant");
   if (!account?.signer) { return };

   return await merchant.tx.d9Subscribe({
      gasLimit: await getGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: new BN(months).mul(new BN(10).mul(new BN(10).pow(new BN(12)))).toString()
   })
      .signAndSend(account?.address, { signer: account?.signer }, async (result: any) => {
         if (result.status.isInBlock) {
            console.log(`Transaction included in block: ${result.status.asInBlock}`);
            await getMerchantAccountExpiry();
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
            result.events.forEach((e: any) => {
               console.log(e)
            })
            console.error('Transaction failed with dispatch error:', result.dispatchError.toHuman());
         }
      });
}

export async function giveGreenPoints(address: string, amount: number) {
   const account = get(accountStore);
   const merchant = await getContract("merchant");
   if (!account?.signer) { return };
   return await merchant.tx.giveGreenPoints({
      gasLimit: await getGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: toBigNumberString(amount, Currency.D9)
   }, address).signAndSend(account?.address, { signer: account?.signer }, async (result: any) => {
      if (result.status.isInBlock) {
         console.log(`Transaction included in block: ${result.status.asInBlock}`);
         await updateMerchantAccount();
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
         result.events.forEach((e: any) => {
            console.log(e)
         })
         console.error('Transaction failed with dispatch error:', result.dispatchError.toHuman());
      }
   });
}

export async function redeemD9() {
   const account = get(accountStore);
   const merchant = await getContract("merchant");
   if (!account?.signer) { return };
   return await merchant.tx.redeemD9({
      gasLimit: await getGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
   }).signAndSend(account?.address, { signer: account?.signer }, async (result: any) => {
      if (result.status.isInBlock) {
         console.log(`Transaction included in block: ${result.status.asInBlock}`);
         await updateMerchantAccount();
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
         result.events.forEach((e: any) => {
            console.log(e)
         })
         console.error('Transaction failed with dispatch error:', result.dispatchError.toHuman());
      }
   });
}

export async function updateMerchantData() {
   await updateMerchantAccount();
   await getMerchantAccountExpiry();
}