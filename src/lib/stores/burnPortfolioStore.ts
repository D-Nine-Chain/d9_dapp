import { writable } from 'svelte/store';
export const burnPortfolioStore = writable({
   amountBurned: 0,
   balanceDue: 0,
   balancePaid: 0,
   lastBurn: {
      time: 0,
      contract: ''
   },
   lastWithdrawal: 0
})

