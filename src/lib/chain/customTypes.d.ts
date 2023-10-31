// customTypes.d.ts
declare module '@polkadot/api/types' {
   interface RpcInterface {
      referral: {
         getAncestors: (account: string, at?: string) => Promise<string>;
         getParent: (account: string, at?: string) => Promise<string>;
      };
   }
}