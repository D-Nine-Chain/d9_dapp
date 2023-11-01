import { accountStore, usdtBalanceStore } from '$lib/store';
import { STORAGE_DEPOSIT_LIMIT, getReadGasLimit } from '$lib/chain/polkadot';
import { get } from 'svelte/store';

import { getContract } from '..';
import { Currency, reduceByCurrencyDecimal } from '$lib/utils';

export async function getUSDTBalance() {
   const account = get(accountStore);
   const usdt = await getContract("usdt");
   const { result, output } = await usdt.query["psp22::balanceOf"](account.address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   }, account.address);
   return reduceByCurrencyDecimal(output.toJSON().ok, Currency.USDT)
}

export async function updateUSDTBalance() {
   console.log("usdt balance updated")
   let usdtBalance = await getUSDTBalance();
   accountStore.update((account) => {
      account.usdtBalance = usdtBalance
      return account
   })
}




