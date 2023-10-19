
import { getAPI } from "./polkadot"
import { getBurnPortfolio, getTotalBurned } from '$lib/burn';

// customTypes.d.ts
export async function getParent(account: string) {
   const api = await getAPI();
   return await api.rpc.referral.getParent(account);
}


export async function getAncestors(account: string) {
   const api = await getAPI();
   return await api.rpc.referral.getAncestors(account);
}

export async function updateData() {
   console.log("updating data")
   await getBurnPortfolio();
   await getTotalBurned();
}