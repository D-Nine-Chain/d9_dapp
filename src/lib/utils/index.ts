import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';

export async function checkForExtension(): Promise<any[]> {
   return web3Enable('D9 app')
}

export async function getAccounts() {
   const allAccounts = await web3Accounts();
   return allAccounts;
}