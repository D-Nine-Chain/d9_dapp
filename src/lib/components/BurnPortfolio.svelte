<script lang="ts">
	import { getBurnPortfolio } from '$lib/burn';
	import Time from 'svelte-time';

	import { burnPortfolioStore } from '$lib/stores/burnPortfolioStore';
	import { onMount } from 'svelte';
	import { toHumanNumber } from '$lib/utils';
	let burnPortfolio: any;
	$: burnPortfolio = $burnPortfolioStore;
	onMount(async () => {
		await getBurnPortfolio();
	});
</script>

<div id="portfolio">
	<div class="data">
		<h3>燃烧量 (Burn Amount):</h3>
		<p id="burn-amount">{toHumanNumber(burnPortfolio.amountBurned)}</p>
		<!-- Placeholder, update this with actual data -->
	</div>

	<div class="data">
		<h3>余额到期 (Balance Due):</h3>
		<p id="balance-due">{toHumanNumber(burnPortfolio.balanceDue)}</p>
		<!-- Placeholder, update this with actual data -->
	</div>

	<div class="data">
		<h3>已付余额 (Balance Paid):</h3>
		<p id="balance-paid">{toHumanNumber(burnPortfolio.balancePaid)}</p>
		<!-- Placeholder, update this with actual data -->
	</div>

	<div class="data">
		<h3>最后燃烧时间 (Last Burn Time):</h3>
		<Time relative timestamp={burnPortfolio.lastBurn.time} />
		<p id="last-burn-time">{new Date(burnPortfolio.lastBurn.time).toLocaleString()}</p>
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
			{#if !burnPortfolio.lastWithdrawal}
				没有
			{:else}
				<Time relative timestamp={burnPortfolio.lastWithdrawal.time} />
			{/if}
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
