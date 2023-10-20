import { writable } from 'svelte/store';
export const merchantAccountStore = writable({
   green_points: 0,
   last_conversion: null,
   redeemed_usdt: 0,
   redeemed_d9: 0,
   created_at: 0,
})