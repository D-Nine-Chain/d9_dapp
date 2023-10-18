<script lang="ts">
	import Ancestor from '$lib/components/Ancestor.svelte';
	import { getParent, getAncestors } from '$lib/rpc';
	import { accountStore } from '$lib/stores/accountStore';
	import BurnPortfolio from '$lib/components/BurnPortfolio.svelte';
	import BurnFunctions from '$lib/components/BurnFunctions.svelte';
	import { burnPortfolioStore } from '$lib/stores/burnPortfolioStore';
	let ancestry: any[] = [];

	accountStore.subscribe(async (userAccount) => {
		if (userAccount.address) {
			ancestry = await getAncestors(userAccount.address);
		}
	});

	$: burnPortfolio = $burnPortfolioStore;
</script>

<div id="home">
	<div id="left">
		{#if burnPortfolio.amountBurned > 0}
			<BurnPortfolio />
		{:else}
			<p>还没有开始燃烧</p>
		{/if}
	</div>
</div>
<div id="right">
	<div id="ancestry">
		{#each ancestry as ancestor}
			<Ancestor {ancestor} />
		{/each}
	</div>
</div>
<BurnFunctions />

<style>
	#home {
		display: flex;
		flex-direction: row;
		height: 700px;
		width: 600px;
		gap: 10px;
	}
	#left {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	#right {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 500px;
		background-color: red;
	}
	#ancestry {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
