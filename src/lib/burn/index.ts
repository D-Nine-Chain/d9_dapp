import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { PUBLIC_WS_CONNECTION, PUBLIC_MAIN_CONTRACT, PUBLIC_BURN_CONTRACT } from '$env/static/public';
import { encodeAddress } from '@polkadot/util-crypto';
import { accountStore } from '$lib/stores/accountStore';
import { customRpc } from '$lib/rpc/customRpc';
import { main } from '$lib/contractsMetadata/d9_main';
import { BN, BN_ONE } from "@polkadot/util";
import { get } from 'svelte/store';
import { hexToU8a, compactAddLength } from '@polkadot/util';
import type { WeightV2 } from '@polkadot/types/interfaces'
const wsProvider = new WsProvider(PUBLIC_WS_CONNECTION);
const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
const PROOFSIZE = new BN(1_000_000);
const STORAGE_DEPOSIT_LIMIT = null;

export async function getPortfolio() {
   const api = await ApiPromise.create({
      provider: wsProvider, rpc: customRpc, types: {
         D9BurnCommonBurnPortfolio: {
            amountBurned: "Balance",
            balanceDue: "Balance",
            balancePaid: "Balance",
            lastWithdrawal: "Option<D9BurnCommonActionRecord>",
            lastBurn: "D9BurnCommonActionRecord",
         },
         D9BurnCommonActionRecord: {
            time: "u64",
            contract: "AccountId",
         }
      }
   });
   // api?.registry.createType('BurnPortfolio', { refTime: MAX_CALL_WEIGHT, proofSize: PROOFSIZE })
   const contract = new ContractPromise(api, main, PUBLIC_MAIN_CONTRACT);
   const account = get(accountStore);
   const { result } = await contract.query.getPortfolio(account.address, {
      gasLimit:
         api?.registry.createType('WeightV2', { refTime: MAX_CALL_WEIGHT, proofSize: PROOFSIZE }) as WeightV2,
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   }, account.address);
   if (result.isOk) {
      const dataHex = result.toHuman().Ok.data;
      console.log("data hex ", dataHex)
      const dataU8a = hexToU8a(dataHex);
      const portfolio = api.createType('D9BurnCommonBurnPortfolio', dataU8a).toJSON();
      return portfolio;
   } else {
      return Error("Error getting portfolio");
   }


   return result.toHuman();
}
export async function getTotalBurned() {
   const api = await ApiPromise.create({ provider: wsProvider, rpc: customRpc });
   const contract = new ContractPromise(api, main, PUBLIC_MAIN_CONTRACT);
   const account = get(accountStore);
   const { gasRequired, result, output } = await contract.query.getTotalBurned(account.address, {
      gasLimit:
         api?.registry.createType('WeightV2', { refTime: MAX_CALL_WEIGHT, proofSize: PROOFSIZE }) as WeightV2,
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   });
   return result.toHuman();
}
export async function burn(burnAmount: number) {
   console.log(burnAmount)
   const api = await ApiPromise.create({ provider: wsProvider, rpc: customRpc });
   const contract = new ContractPromise(api, main, PUBLIC_MAIN_CONTRACT);
   const account = get(accountStore);
   if (!account?.signer) { return };
   console.log("account", account)
   return await contract.tx.burn({
      gasLimit:
         api?.registry.createType('WeightV2', { refTime: new BN(1_000_000_000_000), proofSize: PROOFSIZE }) as WeightV2,
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: burnAmount
   }, PUBLIC_BURN_CONTRACT).signAndSend(account?.address, { signer: account?.signer }, (result) => {
      if (result.status.isInBlock) {
         console.log(`Transaction included in block: ${result.status.asInBlock}`);
         console.log(result.toHuman());
      } else if (result.status.isFinalized) {
         console.log(`Transaction finalized in block: ${result.status.asFinalized}`);
      } else if (result.status.isBroadcast) {
         console.log('Transaction has been broadcasted');
      } else if (result.status.isReady) {
         console.log('Transaction is ready');
      } else if (result.status.isFuture) {
         console.log('Transaction is scheduled for a future block');
      }

      // Check for dispatch error
      if (result.dispatchError) {
         result.events.forEach((e) => {
            console.log(e)
         })
         console.error('Transaction failed with dispatch error:', result.dispatchError.toHuman());
      }
   });
}