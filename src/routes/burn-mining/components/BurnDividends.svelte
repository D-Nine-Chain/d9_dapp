<script lang="ts">
	import type { BurnPortfolio } from '$lib/types/types';
	import { burnPortfolioStore } from '$lib/store';
	import { formatNumber } from '$lib/utils';
	import { get } from 'svelte/store';
	import { getReturnPercent, withdraw } from '$lib/contracts/burn';
	import { onMount } from 'svelte';
	let burnPortfolio: BurnPortfolio;
	$: burnPortfolio = $burnPortfolioStore;
	// let lastWithdrawal: Date = new Date(burnPortfolio.lastWithdrawal.time);

	function calculateDividends(): number {
		let returnPercent = getReturnPercent();
		// Calculate the number of milliseconds elapsed since the last withdrawal
		let timeElapsed = Date.now() - burnPortfolio.lastWithdrawal.time;

		// Convert the elapsed time to days
		let daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);

		// Calculate dividends
		let dividends = returnPercent * daysElapsed * burnPortfolio.balanceDue;

		return dividends;
	}
	onMount(() => {
		console.log(burnPortfolio.balanceDue);
	});
	// Example of how you might call this function
	let lastWithdrawalTime = new Date(); // This should be the actual date of the last withdrawal
	let returnPercent = getReturnPercent(); // This should call your existing function to get the return percent
</script>

<div id="burn-dividends">
	<div class="color shape shadow info-row">
		<h2>到期股息</h2>
		<span>{formatNumber(burnPortfolio.balanceDue)} D9</span>
	</div>
	<div class="color shape shadow info-row">
		<h2>已支付股息</h2>
		<span>{formatNumber(burnPortfolio.balancePaid)} D9</span>
	</div>
	{#if burnPortfolio}
		<div class="color shape shadow info-row">
			<h2>立即提款并收</h2>
			<span>{formatNumber(calculateDividends())} D9</span>
		</div>
	{/if}
	<div id="button-container">
		<button
			id="withdraw-button"
			class="color shadow"
			on:click={async () => {
				await withdraw();
			}}>提取股息</button
		>
	</div>
</div>

<style>
	#burn-dividends {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		width: 95%;
		max-width: 800px;
	}
	.info-row > h2 {
		margin: 0;
		padding: 0;
		font-size: 1.1rem;
	}
	.info-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 95%;
		max-width: 500px;
		padding-left: 32px;
		padding-right: 32px;
	}
	#button-container {
		display: flex;
		width: 95%;
		max-width: 500px;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
	}
	#withdraw-button {
		background-color: var(--green);
		color: white;
	}
</style>
