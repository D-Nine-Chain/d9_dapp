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
		<div id="ancestor-title"><h2>祖先</h2></div>
		<div id="ancestry">
			{#each ancestry as ancestor}
				<Ancestor {ancestor} />
			{/each}
		</div>
	</div>
	<div id="right" />
</div>

<BurnFunctions />

<style>
	#home {
		display: flex;
		flex-direction: row;
		height: 400px;
		width: 100%;
		gap: 10px;
		align-items: center;
		background-color: white;
		border-radius: 6px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		margin-bottom: 24px;
	}
	#ancestor-title {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 50px;
		margin-bottom: 24px;
		padding-left: 32px;
		padding-top: 12px;
	}
	#left {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
	}
	#right {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 500px;
	}
	#ancestry {
		display: flex;
		flex-direction: column;
		height: 100%;
		align-items: center;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
