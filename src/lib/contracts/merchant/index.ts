import { PUBLIC_MERCHANT_CONTRACT } from '$env/static/public';
import { accountStore } from '$lib/stores/accountStore';
import { STORAGE_DEPOSIT_LIMIT, getGasLimit, getMerchantContract, getReadGasLimit } from '$lib/rpc/polkadot';
import { get } from 'svelte/store';
import { merchantAccountStore } from '$lib/stores/merchantAccountStore';

import { BN, hexToBn } from '@polkadot/util';
import { toBigNumber } from '$lib/utils';
import { merchantAccountExpiryStore } from '$lib/stores/merchantAccountExpirystore';

export async function getMerchantAccount() {
   const account = get(accountStore);
   const merchant = await getMerchantContract();
   const { result, output } = await merchant.query.getAccount(account.address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   }, account.address);

   if (result.isOk) {
      let merchantAccount = output.toJSON().ok.ok
      console.log(merchantAccount)
      merchantAccount.greenPoints = hexToBn(merchantAccount.greenPoints).div(new BN("10000000000000")).toString()
      if (merchantAccount) {
         merchantAccountStore.set(merchantAccount)
      }
   }
}

export async function getMerchantAccountExpiry() {
   const merchant = await getMerchantContract();
   const account = get(accountStore);
   const { output } = await merchant.query.getExpiry(account.address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   }, account.address);
   let data = output.toJSON().ok
   if (data.err) {
      merchantAccountExpiryStore.set(0)
   } else {
      merchantAccountExpiryStore.set(data.ok)
   }
}


export async function d9Subscribe() {
   const account = get(accountStore);
   const merchant = await getMerchantContract();
   if (!account?.signer) { return };

   return await merchant.tx.d9Subscribe({
      gasLimit: await getGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: 10_000_000_000_000
   })
      .signAndSend(account?.address, { signer: account?.signer }, async (result) => {
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
            result.events.forEach((e) => {
               console.log(e)
            })
            console.error('Transaction failed with dispatch error:', result.dispatchError.toHuman());
         }
      });
}

export async function giveGreenPoints(address: string, amount: number) {
   const account = get(accountStore);
   const merchant = await getMerchantContract();
   if (!account?.signer) { return };
   return await merchant.tx.giveGreenPoints({
      gasLimit: await getGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: toBigNumber(amount)
   }, address).signAndSend(account?.address, { signer: account?.signer }, async (result) => {
      if (result.status.isInBlock) {
         console.log(`Transaction included in block: ${result.status.asInBlock}`);
         await getMerchantAccount();
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

export async function redeemD9(amount: number) {
   const account = get(accountStore);
   const merchant = await getMerchantContract();
   if (!account?.signer) { return };
   return await merchant.tx.redeemD9({
      gasLimit: await getGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
   }, PUBLIC_MERCHANT_CONTRACT).signAndSend(account?.address, { signer: account?.signer }, async (result) => {
      if (result.status.isInBlock) {
         console.log(`Transaction included in block: ${result.status.asInBlock}`);
         await getMerchantAccount();
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

export async function updateMerchantData() {
   await getMerchantAccount();
   await getMerchantAccountExpiry();
}