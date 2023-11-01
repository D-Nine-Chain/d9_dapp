
/**
 * @module RPC
 * 
 * for all communications to the Runtime that are not for the Contracts pallet
 */
import { getAPI } from "./polkadot"
import { getBurnPortfolio, getTotalBurned } from '$lib/contracts/burn';
import { get } from "svelte/store";
import { accountStore, d9BalanceStore } from "$lib/store";
import { Currency, reduceByCurrencyDecimal } from "$lib/utils";
import { web3FromAddress } from "@polkadot/extension-dapp";
import { getUSDTBalance, updateUSDTBalance } from "$lib/contracts/usdt";
import type { Account } from "$lib/types/types";
export * from './polkadot';
// customTypes.d.ts


export async function prepAccount(injectedAccount: any) {
   console.log("prepping account")
   const injector = await web3FromAddress(injectedAccount.address);
   injectedAccount.signer = injector.signer;
   accountStore.set(injectedAccount);
   await updateAccountWithStorageData(injectedAccount);
   console.log('prep account address ', injectedAccount.address)
   await updateBurnData(injectedAccount.address);
   await updateAncestors(injectedAccount)
   await updateUSDTBalance();
}

export async function getParent(account: string) {
   const api = await getAPI();
   return await (api.rpc as any).referral.getParent(account);
}


export async function updateAncestors(account: Account) {
   const api = await getAPI();
   let ancestors = await (api.rpc as any).referral.getAncestors(account.address);
   accountStore.update((account) => {
      account.ancestors = ancestors.toJSON();
      return account;
   })
}

export async function updateBurnData(address: string) {
   console.log("updating data")
   await getBurnPortfolio(address);
   await getTotalBurned();
}


export async function subscribeToD9Balance() {
   console.log("getting balance")
   const account = get(accountStore);
   const api = await getAPI();
   const unsub = await api.query.system.account(account.address, (rawData) => {
      let data = rawData.toJSON()
      console.log("data from balance", data)
      d9BalanceStore.set(data.balance)
      console.log(`free balance is ${data.balance.free} with ${data.balance.reserved} reserved and a nonce of ${data.nonce}`);
   });
   return unsub;
}

export async function updateAccountWithStorageData(account: any) {
   console.log("updating account with storage data ")
   const api = await getAPI();
   console.log("doing a multi query");
   const result = await api.queryMulti([
      [api.query.system.account, account.address],
      [api.query.d9Referral.referralRelationships, account.address],
   ]);
   const data = result.map((data) => data.toPrimitive());
   console.log("received data is ", data)
   const accountData = data[0] as any;

   if (data[1]) {
      accountStore.update((account) => {
         console.log("parent data", data[1]);
         account.parent = data[1] as string;
         return account;
      })
   }
   if (accountData) {
      const num = reduceByCurrencyDecimal(accountData.data.free, Currency.D9)

      const d9Balance = {
         free: reduceByCurrencyDecimal(accountData.data.free, Currency.D9),
         reserved: reduceByCurrencyDecimal(accountData.data.reserved, Currency.D9),
         frozen: reduceByCurrencyDecimal(accountData.data.frozen, Currency.D9),
      }
      accountStore.update((account) => {
         account.d9Balances = d9Balance;
         return account
      })
      d9BalanceStore.set(d9Balance)
   }

}