<script lang="ts">
	import Ancestor from '$lib/components/Ancestor.svelte';
	import { getParent, getAncestors } from '$lib/rpc';
	import { accountStore } from '$lib/stores/accountStore';
	import BurnPortfolio from '$lib/components/BurnPortfolio.svelte';
	import { burn, dryBurn, withdraw } from '$lib/burn';
	import { burnPortfolioStore } from '$lib/stores/burnPortfolioStore';
	let ancestry: any[] = [];
	let parent: any;
	accountStore.subscribe(async (userAccount) => {
		if (userAccount.address) {
			parent = await getParent(userAccount.address);
			ancestry = await getAncestors(userAccount.address);
		}
	});
	async function withdrawAction() {
		const outcome = await withdraw();
		console.log(outcome);
	}
	$: burnPortfolio = $burnPortfolioStore;
	let burnAmount: number = 200;
</script>

<div id="home">
	<div id="left">
		<div>父母的地址:{parent}</div>
		{#if burnPortfolio.amountBurned > 0}
			<BurnPortfolio />
		{:else}
			<p>还没有开始燃烧</p>
		{/if}
		<div id="functions">
			<div>
				<input bind:value={burnAmount} placeholder="enter burn amount" />
				<button
					id="burn-button"
					on:click={async () => {
						await burn(burnAmount);
					}}><h2>烧伤</h2></button
				>
				<button
					id="withdraw-button"
					on:click={async () => {
						await withdraw();
					}}><h2>提取</h2></button
				>
				<!-- <button
					id="withdraw-button"
					on:click={async () => {
						await dryBurn(burnAmount);
					}}><h2>dry burn</h2></button
				> -->
			</div>
			<div />
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
	button {
		box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
		border-radius: 6px;
	}
	#burn-button {
		background-color: #ff0000;
		border: none;
		color: white;
		padding: 8px 12px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
	}
	#withdraw-button {
		background-color: green;
		border: none;
		color: white;
		padding: 8px 12px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
	}
</style>
