<script lang="ts">
	import SwappableLayout from '$lib/components/SwappableLayout.svelte';
	import { onMount } from 'svelte';
	import GiveGreenPoints from './components/GiveGreenPoints.svelte';
	import MerchantAccountComponent from './components/MerchantAccountComponent.svelte';
	import { getMerchantAccountExpiry, isActiveMerchant } from '$lib/contracts/merchant';
	import { merchantAccountStore } from '$lib/store';
	let isMerchant: Boolean = false;
	let componentNames = ['绿点账户', '发送绿点'];

	let components = [MerchantAccountComponent, GiveGreenPoints];
	let initialComponent = components[0];

	onMount(async () => {
		let expiry = await getMerchantAccountExpiry();
		console.log(expiry);
		try {
			isMerchant = await isActiveMerchant();
			if (!isMerchant) {
				components = [MerchantAccountComponent];
			}
		} catch (e) {
			console.log(e);
		}
	});
	$: merchant = $merchantAccountStore;
</script>

<SwappableLayout {initialComponent} buttonNames={componentNames} {components} />
