import '@polkadot/api/types/rpc';
export type BurnPortfolio = {
   amountBurned: number;
   balanceDue: number;
   balancePaid: number;
   lastBurn: {
      time: number;
      contract: string;
   };
   lastWithdrawal: {
      time: number;
      contract: string;
   };
}

export type D9Balances = {
   free: number,
   frozen: number,
   reserved: number
}
export type Account = {
   meta: any;
   address: string;
   signer: any;
   parent: string;
   ancestors: string[];
   usdtBalance: number;
   d9Balances: D9Balances;
}

export type LiquidityProvider = {
   account_id: string;
   usdt: number;
   d9: number;
   lp_token: number;
}

export type MerchantAccount = {
   greenPoints: number;
   lastConversion: any;
   redeemedUsdt: number;
   redeemedD9: number;
   createdAt: number;
   //locale date string
   expiry: string;
}