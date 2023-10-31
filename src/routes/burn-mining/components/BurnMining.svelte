<script lang="ts">
	import type { BurnPortfolio } from '$lib/types/types';
	import { onMount } from 'svelte';
	import { totalBurnedStore, burnPortfolioStore } from '$lib/store';
	import { formatNumber } from '$lib/utils';
	import BurnDialog from './BurnDialog.svelte';
	let burnPortfolio: BurnPortfolio;
	let totalNetworkBurn: number = 0;
	let burnDialog;
	let dividendsDue;
	onMount(async () => {});

	function calculateDividends() {
		if (burnPortfolio.amountBurned == 0 || totalNetworkBurn == 0) {
			return 0;
		}
		let percent = (burnPortfolio.amountBurned / totalNetworkBurn) * 100;
		return percent.toFixed(4);
	}
	$: burnPortfolio = $burnPortfolioStore;
	$: totalNetworkBurn = $totalBurnedStore;
	$: dividendsDue = burnPortfolio ? calculateDividends() : 0;
</script>

<div id="burn-mining">
	<div class="outer-circle color shadow">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="inner-circle color" on:click={() => burnDialog.showModal()}>烧</div>
	</div>
	<div class="shape color shadow info-row">
		<h2>全网烧毁 D9</h2>
		<span class="amount">{formatNumber(totalNetworkBurn)}</span>
	</div>
	<div class="shape color shadow info-row">
		<h2>你的贡献</h2>
		<span id="global-total">{dividendsDue} % 全球总计</span>
		<span class="amount">{formatNumber(burnPortfolio.amountBurned)}</span>
	</div>
</div>
<dialog bind:this={burnDialog}>
	<BurnDialog dialog={burnDialog} />
</dialog>

<style>
	#burn-mining {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		width: 95%;
		max-width: 800px;
	}
	span {
		font-size: 1.5rem;
		font-weight: 500;
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
	#global-total {
		font-size: 1.1rem;
	}
	.info-row > h2 {
		margin: 0;
		padding: 0;
		font-size: 1.1rem;
	}
	.outer-circle {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		background: linear-gradient(90deg, darkred, red, orange, yellow, orange, red, darkred);
		background-size: 200% 100%;
		animation: rotateBackground 10s linear infinite;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.inner-circle {
		width: 130px;
		height: 130px;
		font-weight: 900;
		font-size: 2.5rem;
		/* color: rgba(0, 0, 0, 0.63); */
		color: #4d4742bf;
		border-radius: 50%;
		z-index: 2;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		pointer-events: all;
		cursor: pointer;
	}
	.inner-circle:active {
		transform: scale(0.95); /* Slightly reduce the size */
		box-shadow: rgba(50, 50, 93, 0.2) 0px 1px 3px -1px, rgba(0, 0, 0, 0.2) 0px 0.5px 2px -1px; /* Reduce the shadow for a "pressed" effect */
	}
	dialog {
		border: 0;
		border-radius: 6px;
	}
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.871);
	}
	@keyframes rotateBackground {
		0%,
		100% {
			background-position: 100% 50%;
		}
		50% {
			background-position: 0% 50%;
		}
	}
</style>
