
import { merchantABI } from '$lib/contracts/contractsMetadata/d9_merchant_mining';
import { ammABI } from '$lib/contracts/contractsMetadata/d9_amm';
import { mainABI } from '$lib/contracts/contractsMetadata/d9_main';
import { usdtABI } from './contractsMetadata/d9_usdt';
import { getAPI } from '$lib/chain/polkadot';
import { Abi, ContractPromise } from '@polkadot/api-contract';
import { PUBLIC_AMM_CONTRACT, PUBLIC_MAIN_CONTRACT, PUBLIC_MERCHANT_CONTRACT, PUBLIC_USDT_CONTRACT } from '$env/static/public';

export const contracts: any = {
   "main": { abi: mainABI, address: PUBLIC_MAIN_CONTRACT },
   "merchant": { abi: merchantABI, address: PUBLIC_MERCHANT_CONTRACT },
   "amm": { abi: ammABI, address: PUBLIC_AMM_CONTRACT },
   "usdt": { abi: usdtABI, address: PUBLIC_USDT_CONTRACT },
}

export async function getContract(contractName: string) {
   let api = await getAPI();
   const abi = new Abi(contracts[contractName].abi, api.registry.getChainProperties())
   const contract = new ContractPromise(api, abi, contracts[contractName].address)
   return contract;
}