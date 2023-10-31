<script lang="ts">
	import { d9Subscribe, redeemD9, updateMerchantAccount } from '$lib/contracts/merchant';
	import { merchantAccountStore } from '$lib/store';
	import type { MerchantAccount } from '$lib/types/types';
	import { Currency, formatNumber, reduceByCurrencyDecimal } from '$lib/utils';
	import { onMount } from 'svelte';
	let months: number = 1;
	let merchantAccount: MerchantAccount;
	let now = new Date();
	let isMerchant: Boolean = false;
	onMount(async () => {
		try {
			if (merchantAccount.createdAt == 0) {
				await updateMerchantAccount();
			}
		} catch (e) {
			console.log(e);
		}
	});
	$: merchantAccount = $merchantAccountStore;
	$: {
		if (merchantAccount && merchantAccount.expiry) {
			isMerchant = new Date(merchantAccount.expiry) > now;
		}
	}
</script>

<div id="merchant-account" class="shadow color-and-shape">
	<div id="top-row">
		<div style="display:flex;flex-direction:row">
			<p>🟢</p>
			<span>{formatNumber(merchantAccount.greenPoints)}</span>
		</div>
	</div>
	<div id="middle-row">
		<h3>撤回的股息</h3>
		<div id="amount-row">
			<h1>22</h1>
			<p>D9</p>
		</div>
	</div>
	<div id="button-container">
		<button
			on:click={async () => {
				await redeemD9();
			}}
			id="get-dividends-button"
			class="shadow">提取股息</button
		>
	</div>
</div>
{#if !isMerchant}
	<p>您想发放绿点吗？ 立即购买订阅</p>
{:else if isMerchant}
	<p>您是商家</p>
	<p>您的订阅将于 {merchantAccount.expiry} 到期</p>
{/if}
<div id="extend-subscription">
	<p>您想延长吗. 一个月10美金</p>
	<div id="subscribe-button-container">
		<h2 style="font-weight:200">{10 * months} USDT</h2>
		<input type="number" placeholder="几个月" bind:value={months} />
		<button
			id="subscribe-button"
			on:click={async () => {
				await d9Subscribe(months);
			}}
			class="color shadow"
		>
			续订
		</button>
	</div>
</div>

<style>
	#merchant-account {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		border-radius: 1rem;
		margin: 1rem;
		min-width: 500px;
	}
	#top-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding-left: 20px;
		gap: 12px;
	}
	#middle-row {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding-left: 20px;
	}
	#middle-row h3 {
		font-size: 1rem;
		font-weight: 200;
		margin: 0;
		padding: 0;
	}

	#middle-row h1 {
		font-size: 2rem;
		font-weight: 200;
		margin: 0;
		padding: 0;
	}
	#amount-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}
	#button-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
	}
	#get-dividends-button {
		background-color: var(--green);
		color: white;
		border-radius: 6px;
		padding: 12px 24px;
		font-size: 1rem;
		font-weight: 200;
	}
	#extend-subscription {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	#subscribe-button-container {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}
	#subscribe-button-container input {
		width: 120px;
	}
	#subscribe-button {
		background-color: var(--green);
		color: white;
		border-radius: 6px;
		padding: 12px 24px;
		font-size: 1rem;
		font-weight: 200;
	}
	span {
		font-size: 2rem;
		font-weight: bold;
	}
</style>
