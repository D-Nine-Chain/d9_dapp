<script lang="ts">
	import Ancestor from '$lib/components/Ancestor.svelte';
	import { getParent, getAncestors, burn } from '$lib/rpc';
	import { getPortfolio } from '$lib/burn';
	import { accountStore } from '$lib/stores/accountStore';
	import BurnPortfolio from '$lib/components/BurnPortfolio.svelte';
	let ancestry: any[] = [];
	let parent: any;
	let burnPortfolio: any;
	accountStore.subscribe(async (userAccount) => {
		if (userAccount.address) {
			parent = await getParent(userAccount.address);
			ancestry = await getAncestors(userAccount.address);
			burnPortfolio = await getPortfolio();
			console.log(burnPortfolio);
		}
	});
	let burnAmount: number = 200;
</script>

<div id="home">
	<div id="left">
		<div>父母的地址:{parent}</div>
		{#if burnPortfolio}
			<BurnPortfolio {burnPortfolio} />
		{/if}
		<div id="functions">
			<div>
				<input bind:value={burnAmount} placeholder="enter burn amount" />
				<button
					on:click={async () => {
						let result = await burn(burnAmount);
						console.log(result);
					}}><h2>烧伤</h2></button
				>
			</div>
		</div>
	</div>
	<div id="right">
		<div id="ancestry">
			{#each ancestry as ancestor}
				<Ancestor {ancestor} />
			{/each}
		</div>
	</div>
</div>

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
	}
	#ancestry {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
