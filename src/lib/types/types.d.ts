import '@polkadot/api/types/rpc';
export type BurnPortfolio = {
   amountBurned: number;
   balanceDue: number;
   balancePaid: number;
   lastBurn: {
      time: number;
      contract: string;
   };
   lastWithdrawal: number;
}
