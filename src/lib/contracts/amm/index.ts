import { PUBLIC_AMM_CONTRACT } from '$env/static/public';
import { accountStore } from '$lib/stores/accountStore';
import { STORAGE_DEPOSIT_LIMIT, getGasLimit, getReadGasLimit } from '$lib/rpc/polkadot';
import { get } from 'svelte/store';
import { merchantAccountStore } from '$lib/stores/merchantAccountStore';

import { BN, hexToBn } from '@polkadot/util';
import { toBigNumberD9 } from '$lib/utils';
import { merchantAccountExpiryStore } from '$lib/stores/merchantAccountExpiryStore';
import { contracts, getContract } from '..';
import { liquidityProviderStore } from '$lib/stores/liquidityProviderStore';
import { currencyReservesStore } from '$lib/stores/currencyReservesStore';
import { updateUSDTBalance } from '../usdt';

export async function getLiquidityProvider() {
   const account = get(accountStore);
   const amm = await contracts.amm;
   const { result, output } = await amm.query.getLiquidityProvider(account.address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT
   }, account.address);

   if (result.isOk) {
      let liquidityProvider = output.toJSON().ok.ok
      console.log(liquidityProvider)
      if (liquidityProvider) {
         liquidityProviderStore.set(liquidityProvider)
      }
   }
}

export async function getCurrencyReserves() {
   const account = get(accountStore);
   const amm = await getContract("amm");
   const { result, output } = await amm.query.getCurrencyReserves(account.address, {
      gasLimit: await getReadGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: 0
   });

   if (result.isOk) {
      let okOutput = output.toJSON().ok
      let d9 = new BN(okOutput[0]).div(new BN(10).pow(new BN(12))).toNumber()
      let usdt = new BN(okOutput[1]).div(new BN(10).pow(new BN(9))).toNumber()
      let currencyReserves = { d9, usdt }
      console.log(currencyReserves)
      if (okOutput) {
         console.log("currency reserves", okOutput)
         currencyReservesStore.set(currencyReserves)
      }
   }
}

export async function getUSDTPrice() {
   await getCurrencyReserves();
   let currencyReserves = get(currencyReservesStore)
   return currencyReserves.usdt / currencyReserves.d9;
}


export async function getUSDT(d9Amount: number) {
   const account = get(accountStore);
   const amm = await getContract("amm");
   if (!account?.signer) { return };

   return await amm.tx.getUsdt({
      gasLimit: await getGasLimit(),
      storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
      value: toBigNumberD9(d9Amount)
   })
      .signAndSend(account?.address, { signer: account?.signer }, async (result) => {
         if (result.status.isInBlock) {
            console.log(`Transaction included in block: ${result.status.asInBlock}`);
            await updateUSDTBalance();
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

// export async function getMerchantAccountExpiry() {
//    const merchant = await getMerchantContract();
//    const account = get(accountStore);
//    const { output } = await merchant.query.getExpiry(account.address, {
//       gasLimit: await getReadGasLimit(),
//       storageDepositLimit: STORAGE_DEPOSIT_LIMIT
//    }, account.address);
//    let data = output.toJSON().ok
//    if (data.err) {
//       merchantAccountExpiryStore.set(0)
//    } else {
//       merchantAccountExpiryStore.set(data.ok)
//    }
// }


// export async function d9Subscribe() {
//    const account = get(accountStore);
//    const merchant = await getMerchantContract();
//    if (!account?.signer) { return };

//    return await merchant.tx.d9Subscribe({
//       gasLimit: await getGasLimit(),
//       storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
//       value: 10_000_000_000_000
//    })
//       .signAndSend(account?.address, { signer: account?.signer }, async (result) => {
//          if (result.status.isInBlock) {
//             console.log(`Transaction included in block: ${result.status.asInBlock}`);
//             await getMerchantAccountExpiry();
//          } else if (result.status.isFinalized) {
//             console.log(`Transaction finalized in block: ${result.status.asFinalized}`);
//          } else if (result.status.isBroadcast) {
//             console.log('Transaction has been broadcasted');
//          } else if (result.status.isReady) {
//             console.log('Transaction is ready');
//          } else if (result.status.isFuture) {
//             console.log('Transaction is scheduled for a future block');
//          }

//          // Check for dispatch error
//          if (result.dispatchError) {
//             result.events.forEach((e) => {
//                console.log(e)
//             })
//             console.error('Transaction failed with dispatch error:', result.dispatchError.toHuman());
//          }
//       });
// }

// export async function giveGreenPoints(address: string, amount: number) {
//    const account = get(accountStore);
//    const merchant = await getMerchantContract();
//    if (!account?.signer) { return };
//    return await merchant.tx.giveGreenPoints({
//       gasLimit: await getGasLimit(),
//       storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
//       value: toBigNumber(amount)
//    }, address).signAndSend(account?.address, { signer: account?.signer }, async (result) => {
//       if (result.status.isInBlock) {
//          console.log(`Transaction included in block: ${result.status.asInBlock}`);
//          await getMerchantAccount();
//       } else if (result.status.isFinalized) {
//          console.log(`Transaction finalized in block: ${result.status.asFinalized}`);
//       } else if (result.status.isBroadcast) {
//          console.log('Transaction has been broadcasted');
//       } else if (result.status.isReady) {
//          console.log('Transaction is ready');
//       } else if (result.status.isFuture) {
//          console.log('Transaction is scheduled for a future block');
//       }

//       // Check for dispatch error
//       if (result.dispatchError) {
//          result.events.forEach((e) => {
//             console.log(e)
//          })
//          console.error('Transaction failed with dispatch error:', result.dispatchError.toHuman());
//       }
//    });
// }

// export async function redeemD9(amount: number) {
//    const account = get(accountStore);
//    const merchant = await getMerchantContract();
//    if (!account?.signer) { return };
//    return await merchant.tx.redeemD9({
//       gasLimit: await getGasLimit(),
//       storageDepositLimit: STORAGE_DEPOSIT_LIMIT,
//    }, PUBLIC_MERCHANT_CONTRACT).signAndSend(account?.address, { signer: account?.signer }, async (result) => {
//       if (result.status.isInBlock) {
//          console.log(`Transaction included in block: ${result.status.asInBlock}`);
//          await getMerchantAccount();
//       } else if (result.status.isFinalized) {
//          console.log(`Transaction finalized in block: ${result.status.asFinalized}`);
//       } else if (result.status.isBroadcast) {
//          console.log('Transaction has been broadcasted');
//       } else if (result.status.isReady) {
//          console.log('Transaction is ready');
//       } else if (result.status.isFuture) {
//          console.log('Transaction is scheduled for a future block');
//       }

//       // Check for dispatch error
//       if (result.dispatchError) {
//          result.events.forEach((e) => {
//             console.log(e)
//          })
//          console.error('Transaction failed with dispatch error:', result.dispatchError.toHuman());
//       }
//    });
// }

// export async function updateMerchantData() {
//    await getMerchantAccount();
//    await getMerchantAccountExpiry();
// }