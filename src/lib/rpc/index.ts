import { ApiPromise, WsProvider } from '@polkadot/api';
import { PUBLIC_WS_CONNECTION } from '$env/static/public';
import { customRpc } from './customRpc';
declare module '@polkadot/api/types' {
   interface RpcInterface {
      referral: {
         getAncestors: (account: string, at?: string) => Promise<string>;
         getParent: (account: string, at?: string) => Promise<string>;
      };
   }
}

const wsProvider = new WsProvider(PUBLIC_WS_CONNECTION);
// customTypes.d.ts
export async function getParent(account: string) {
   const api = await ApiPromise.create({ provider: wsProvider, rpc: customRpc });
   return await api.rpc.referral.getParent(account);
}

export async function getAncestors(account: string) {
   const api = await ApiPromise.create({ provider: wsProvider, rpc: customRpc });
   return await api.rpc.referral.getAncestors(account);
}