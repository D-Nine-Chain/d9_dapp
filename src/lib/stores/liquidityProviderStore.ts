import { writable } from 'svelte/store';
export const liquidityProviderStore = writable({
   account_id: '',
   usdt: 0,
   d9: 0,
   lp_token: 0,
})

