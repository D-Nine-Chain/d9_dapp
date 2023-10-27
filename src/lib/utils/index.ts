import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { BN } from '@polkadot/util';

export async function checkForExtension(): Promise<any[]> {
   return web3Enable('D9 app')
}

export async function getAccounts() {
   const allAccounts = await web3Accounts();
   return allAccounts;
}

export function toBigNumberD9(number: number | string) {
   const numberString = new BN(number).mul(new BN(10).pow(new BN(12))).toString()
   return numberString
}
export function toBigNumberUSDT(number: number | string) {
   const numberString = new BN(number).mul(new BN(10).pow(new BN(9))).toString()
   return numberString
}

export function toHumanNumber(number: string | number) {
   if (number == '') {
      return new BN(0).toString();
   }
   return new BN(number).div(new BN(1000000000000)).toString() + " D9";
}