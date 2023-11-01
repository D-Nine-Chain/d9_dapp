<script lang="ts">
	import { getBurnPortfolio } from '$lib/contracts/burn';
	import Time from 'svelte-time';
	import { burnPortfolioStore } from '$lib/store';
	import { onMount } from 'svelte';
	import { Currency, reduceByCurrencyDecimal } from '$lib/utils';
	import type { BurnPortfolio } from '$lib/types/types';
	export let address: string;
	$: burnPortfolio = $burnPortfolioStore;
	onMount(async () => {
		console.log('bp address is ', address);
		await getBurnPortfolio(address);
	});
</script>

<div id="portfolio">
	<div class="data">
		<h3>🔥 烧毁代币</h3>
		<h2 id="burn-amount">{reduceByCurrencyDecimal(burnPortfolio.amountBurned, Currency.D9)}</h2>
		<!-- Placeholder, update this with actual data -->
	</div>

	<div class="data">
		<h3>🧧 余额到期</h3>
		<h2 id="balance-due">{reduceByCurrencyDecimal(burnPortfolio.balanceDue, Currency.D9)}</h2>
		<!-- Placeholder, update this with actual data -->
	</div>

	<div class="data">
		<h3>🏦 已付余额</h3>
		<h2 id="balance-paid">{reduceByCurrencyDecimal(burnPortfolio.balancePaid, Currency.D9)}</h2>
		<!-- Placeholder, update this with actual data -->
	</div>
	{#if burnPortfolio.lastBurn}
		<div class="data">
			<h3>⏳最后燃烧时间</h3>
			<Time relative timestamp={burnPortfolio.lastBurn.time} />
			<h2 id="last-burn-time">{new Date(burnPortfolio.lastBurn.time).toLocaleString()}</h2>
			<!-- Placeholder, update this with actual data -->
		</div>
	{/if}
	<!-- <div class="data">
		<h3>🤖 最后燃烧合同</h3>
		<p id="last-burn-contract">{burnPortfolio.lastBurn.contract}</p>
	</div> -->

	<div class="data">
		<h3>最后一次提款</h3>

		<h3 id="last-withdrawal">
			{#if !burnPortfolio.lastWithdrawal}
				没有
			{:else}
				<Time timestamp={burnPortfolio.lastWithdrawal.time} relative />
			{/if}
		</h3>
		<!-- Placeholder, update this with actual data -->
	</div>
</div>

<style>
	#portfolio {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* border-radius: 6px; */
		padding: 32px;
		width: 85%;
		margin: 0 auto;
	}
	.data {
		display: flex;
		flex-direction: column;
	}
	.data > h3 {
		font-size: 0.7em;
		color: rgb(50, 69, 91);
		margin: 0;
		padding: 0;
	}
	.data > h2 {
		color: rgb(72, 72, 77);
		margin: 0;
		padding: 0;
		font-size: 1.1em;
		padding-bottom: 18px;
	}
</style>
