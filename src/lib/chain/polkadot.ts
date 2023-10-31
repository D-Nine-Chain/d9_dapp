import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { PUBLIC_WS_CONNECTION } from '$env/static/public';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { customRpc } from './customRpc';
import { BN, BN_ONE } from "@polkadot/util";
import type { WeightV2 } from '@polkadot/types/interfaces'
const wsProvider = new WsProvider(PUBLIC_WS_CONNECTION);
export const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
export const PROOFSIZE = new BN(119903836479112);
export const STORAGE_DEPOSIT_LIMIT = null;

let apiInstance: ApiPromise | null = null;
export async function getAPI() {
   if (!apiInstance) {
      apiInstance = await ApiPromise.create({
         provider: wsProvider, rpc: customRpc,
      });
   }

   return apiInstance;
}

export const getGasLimit = async () => {
   let api = await getAPI();
   return api.registry.createType('WeightV2', { refTime: new BN(50_000_000_000), proofSize: new BN(800_000) }) as WeightV2;
}

export const getReadGasLimit = async () => {
   return apiInstance?.registry.createType('WeightV2', { refTime: MAX_CALL_WEIGHT, proofSize: PROOFSIZE }) as WeightV2
}

export async function getAccountsFromBrowser() {
   const allAccounts = await web3Accounts();
   return allAccounts;
}

export async function checkForBrowserExtension(): Promise<any[]> {
   return web3Enable('D9 app')
}
