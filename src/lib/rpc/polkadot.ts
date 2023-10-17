import { PUBLIC_WS_CONNECTION } from '$env/static/public';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { customRpc } from './customRpc';
const wsProvider = new WsProvider(PUBLIC_WS_CONNECTION);

let apiInstance: ApiPromise | null = null;

export async function getAPI() {
   if (!apiInstance) {
      apiInstance = await ApiPromise.create({
         provider: wsProvider, rpc: customRpc,
         // types: {
         //    Balance: "u128",
         //    D9BurnCommonActionRecord: {
         //       time: "u64",
         //       contract: "AccountId",
         //    },
         //    D9BurnCommonBurnPortfolio: {
         //       amountBurned: "Balance",
         //       balanceDue: "Balance",
         //       balancePaid: "Balance",
         //       lastWithdrawal: "Option<D9BurnCommonActionRecord>",
         //       lastBurn: "D9BurnCommonActionRecord",
         //    },

         // }
      });
   }

   return apiInstance;
}