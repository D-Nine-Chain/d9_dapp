import '@polkadot/api/types/rpc';
export type BurnPortfolio = {
   amountBurned: string;
   balanceDue: string;
   balancePaid: string;
   lastBurn: {
      time: string;
      contract: string;
   };
   lastWithdrawal: string;
}
