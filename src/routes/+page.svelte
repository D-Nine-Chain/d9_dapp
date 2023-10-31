<script lang="ts">
	import { accountStore } from '$lib/store';
	import type { Account } from '$lib/types/types';
	import { formatNumber } from '$lib/utils';

	let account: Account;

	$: account = $accountStore;
</script>

{#if !account}
	<h2>加载内容</h2>
{/if}
{#if account}
	{#if account.meta}
		<div id="name-container">
			<h2>{account.meta.name}</h2>
		</div>
	{/if}
	<div id="account" class=" ">
		<h2>地址</h2>
		<div class="info-row color shape shadow">
			<span>{account.address}</span>
		</div>

		<div class="info-row">
			{#if account.d9Balances}
				<div class=" color shape shadow balance">
					<h2>D9余额</h2>
					<span>{formatNumber(account.d9Balances.free)}</span>
				</div>
				<div class=" color shape shadow balance">
					<h2>USDT余额</h2>
					<span>{formatNumber(account.usdtBalance)}</span>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	h2 {
		font-weight: 500;
	}
	#name-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 95%;
		max-width: 600px;
	}
	#account {
		width: 95%;
		max-width: 600px;
		padding-left: 24px;
		display: flex;
		flex-direction: column;
		gap: 24px;
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
	.balance {
		display: flex;
		flex-direction: column;
		flex-grow: 0;
	}
	.balance > span {
		color: var(--green);
		font-size: 1.9rem;
	}
	.balance > h2 {
		font-size: 1.1rem;
		color: black;
	}
</style>
