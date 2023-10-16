import { writable } from 'svelte/store';
export const accountStore = writable({
   address: '',
   signer: null,
})