import { writable } from 'svelte/store';
export const burnPortfolioStore = writable({
   amountBurned: "",
   balanceDue: "",
   balancePaid: "",
   lastBurn: {
      time: "",
      contract: ''
   },
   lastWithdrawal: {
      time: "",
      contract: ''
   }
})

