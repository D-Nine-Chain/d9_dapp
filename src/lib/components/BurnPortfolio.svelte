<script lang="ts">
	import { getBurnPortfolio } from '$lib/burn';
	import { burnPortfolioStore } from '$lib/stores/burnPortfolioStore';
	import type { BurnPortfolio } from '$lib/types/types';
	import { onMount } from 'svelte';
	const DECIMAL = 100_000;
	let burnPortfolio: BurnPortfolio;
	$: burnPortfolio = $burnPortfolioStore;
	onMount(async () => {
		await getBurnPortfolio();
	});
</script>

<div id="portfolio">
	<div class="data">
		<h3>燃烧量 (Burn Amount):</h3>
		<p id="burn-amount">{burnPortfolio.amountBurned / DECIMAL}</p>
		<!-- Placeholder, update this with actual data -->
	</div>

	<div class="data">
		<h3>余额到期 (Balance Due):</h3>
		<p id="balance-due">{burnPortfolio.balanceDue / DECIMAL}</p>
		<!-- Placeholder, update this with actual data -->
	</div>

	<div class="data">
		<h3>已付余额 (Balance Paid):</h3>
		<p id="balance-paid">{burnPortfolio.balancePaid / DECIMAL}</p>
		<!-- Placeholder, update this with actual data -->
	</div>

	<div class="data">
		<h3>最后燃烧时间 (Last Burn Time):</h3>
		<p id="last-burn-time">{burnPortfolio.lastBurn.time}</p>
		<!-- Placeholder, update this with actual data -->
	</div>

	<div class="data">
		<h3>最后燃烧合同 (Last Burn Contract):</h3>
		<p id="last-burn-contract">{burnPortfolio.lastBurn.contract}</p>
		<!-- Placeholder, update this with actual data -->
	</div>

	<div class="data">
		<h3>最后一次提款 (Last Withdrawal):</h3>

		<p id="last-withdrawal">
			{!burnPortfolio.lastWithdrawal ? '黑没有' : burnPortfolio.lastWithdrawal}
		</p>
		<!-- Placeholder, update this with actual data -->
	</div>
</div>

<style>
	#portfolio {
		display: flex;
		flex-direction: column;
	}
	.data {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.data > h3 {
		color: blue;
	}
</style>
