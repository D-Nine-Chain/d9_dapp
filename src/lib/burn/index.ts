import { ContractPromise } from '@polkadot/api-contract';
import { PUBLIC_MAIN_CONTRACT, PUBLIC_BURN_CONTRACT } from '$env/static/public';
import { accountStore } from '$lib/stores/accountStore';
import { main } from '$lib/contractsMetadata/d9_main';
import { BN, BN_ONE } from "@polkadot/util";
import { getAPI } from '$lib/rpc/polkadot';
import { get } from 'svelte/store';
import type { BurnPortfolio } from '$lib/types/types';
import { hexToU8a, hexToBn } from '@polkadot/util';
import type { WeightV2 } from '@polkadot/types/interfaces'
import { burnPortfolioStore } from '$lib/stores/burnPortfolioStore';
import { updateData } from '$lib/rpc';
const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
const PROOFSIZE = new BN(1_000_000);
const STORAGE_DEPOSIT_LIMIT = null;
const DECIMAL = new BN(10).pow(new BN(6));
export async function getBurnPortfolio() {
   console.log("getting burn portfolio")
   const api = await getAPI();
   const contract = new ContractPromise(api, main, PUBLIC_MAIN_CONTRACT);
   const account = get(accountStore);

   const { result } = await contract.query.getPortfolio(account.address, {
      gasLimit:
         api?.registry.createType('WeightV2', { refTime: MAX_CALL_WEIGHT, proofSize: PROOFSIZE }) as WeightV2,
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   }, account.address);

   if (result.isOk) {
      const dataHex = result.toHuman().Ok.data;
      const dataU8a = hexToU8a(dataHex);
      const burnPortfolio: BurnPortfolio = api.createType('D9BurnCommonBurnPortfolio', dataU8a).toJSON() as BurnPortfolio;
      if (burnPortfolio) {
         burnPortfolioStore.set(burnPortfolio)
      }
   }
}

export async function getTotalBurned() {
   const api = await getAPI();
   const contract = new ContractPromise(api, main, PUBLIC_MAIN_CONTRACT);
   const account = get(accountStore);

   const { result } = await contract.query.getTotalBurned(account.address, {
      gasLimit:
         api?.registry.createType('WeightV2', { refTime: MAX_CALL_WEIGHT, proofSize: PROOFSIZE }) as WeightV2,
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   });
   console.log("result", result.toHuman())
   const humanReadableData = result.toHuman();
   const dataU8a = hexToU8a(humanReadableData.Ok.data);
   const decodedHex = api.createType('u128', dataU8a).toJSON()?.toString();
   const totalBurned = hexToBn(humanReadableData.data).divRound(DECIMAL).toString();
   // const totalBurned = new BN().toNumber();
   console.log("totalBurned", totalBurned)
   // totalBurnedStore.set(result.toHuman())
}
export async function burn(burnAmount: number) {
   console.log(burnAmount)
   const api = await getAPI();
   const contract = new ContractPromise(api, main, PUBLIC_MAIN_CONTRACT);
   const account = get(accountStore);
   if (!account?.signer) { return };
   console.log("account", account)
   return await contract.tx.burn({
      gasLimit:
         api?.registry.createType('WeightV2', { refTime: new BN(1_000_000_000_000), proofSize: PROOFSIZE }) as WeightV2,
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: burnAmount
   }, PUBLIC_BURN_CONTRACT).signAndSend(account?.address, { signer: account?.signer }, async (result) => {
      if (result.status.isInBlock) {
         console.log(`Transaction included in block: ${result.status.asInBlock}`);
         await updateData();
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