import { accountStore } from '$lib/stores/accountStore';
import { STORAGE_DEPOSIT_LIMIT, getGasLimit, getReadGasLimit } from '$lib/rpc/polkadot';
import { get } from 'svelte/store';

import { BN } from '@polkadot/util';
import { getContract } from '..';
import { usdtBalanceStore } from '$lib/stores/usdtBalanceStore';

export async function getUSDTBalance() {
   const account = get(accountStore);
   const usdt = await getContract("usdt");
   const { result, output } = await usdt.query["psp22::balanceOf"](account.address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   }, account.address);
   return new BN(output.toJSON().ok).div(new BN(10).pow(new BN(9))).toNumber()
}

export async function updateUSDTBalance() {
   console.log("usdt balance updated")
   let usdtBalance = await getUSDTBalance();
   usdtBalanceStore.set(usdtBalance)
}




