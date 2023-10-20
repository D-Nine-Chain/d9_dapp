import { PUBLIC_MAIN_CONTRACT, PUBLIC_WS_CONNECTION, PUBLIC_MERCHANT_CONTRACT } from '$env/static/public';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { customRpc } from './customRpc';
import { Abi, ContractPromise } from '@polkadot/api-contract';
import { mainABI } from '$lib/contracts/contractsMetadata/d9_main';
import { BN, BN_ONE } from "@polkadot/util";
import type { WeightV2 } from '@polkadot/types/interfaces'
import { updateData } from '$lib/rpc';
import { merchantABI } from '$lib/contracts/contractsMetadata/d9_merchant_mining';
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

export async function getMainContract() {
   let api = await getAPI();
   const abi = new Abi(mainABI, api.registry.getChainProperties())
   const mainContract = new ContractPromise(api, abi, PUBLIC_MAIN_CONTRACT)
   return mainContract;
}

export async function getMerchantContract() {
   let api = await getAPI();
   const abi = new Abi(merchantABI, api.registry.getChainProperties())
   const merchantContract = new ContractPromise(api, abi, PUBLIC_MERCHANT_CONTRACT)
   return merchantContract;
}

export const getGasLimit = async () => {
   let api = await getAPI();
   return api.registry.createType('WeightV2', { refTime: new BN(50_000_000_000), proofSize: new BN(800_000) }) as WeightV2;
}

export const getReadGasLimit = async () => {
   return apiInstance?.registry.createType('WeightV2', { refTime: MAX_CALL_WEIGHT, proofSize: PROOFSIZE }) as WeightV2
}


