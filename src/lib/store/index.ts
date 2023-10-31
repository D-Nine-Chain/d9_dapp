/** 
 * @module stores
 * 
 * defines all the data that is meant to be shared between components
*/
import type { Account, BurnPortfolio, LiquidityProvider, MerchantAccount } from '$lib/types/types';
import { writable } from 'svelte/store';

export const merchantAccountStore = writable<MerchantAccount>({
   greenPoints: 0,
   lastConversion: null,
   redeemedUsdt: 0,
   redeemedD9: 0,
   createdAt: 0,
   expiry: new Date().toLocaleDateString('zh-CN')
})

export const accountStore = writable<Account>({
   address: '',
   meta: null,
   signer: null,
   parent: '',
   ancestors: [],
   usdtBalance: 0,
   d9Balances: {
      free: 0,
      reserved: 0,
      frozen: 0
   }
})

export const liquidityProviderStore = writable<LiquidityProvider>({
   account_id: '',
   usdt: 0,
   d9: 0,
   lp_token: 0,
})

export const burnPortfolioStore = writable<BurnPortfolio>({
   amountBurned: 0,
   balanceDue: 0,
   balancePaid: 0,
   lastBurn: {
      time: 0,
      contract: ''
   },
   lastWithdrawal: {
      time: 0,
      contract: ''
   }
})

export const currencyReservesStore = writable({
   usdt: 1,
   d9: 1,
})

export const merchantAccountExpiryStore = writable(0)

export const totalBurnedStore = writable(0)

export const usdtBalanceStore = writable(0)

export const usdtPriceStore = writable(1)

export const userStore = writable({
   lastBurnAmount: 0,
})

export const transactionStatus = writable({});
export const d9BalanceStore = writable({ free: 0, reserved: 0, frozen: 0 });