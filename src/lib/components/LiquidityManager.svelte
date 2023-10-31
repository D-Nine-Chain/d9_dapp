<script lang="ts">
	// import { getBalance } from '$lib/rpc';
	import {
		accountStore,
		d9BalanceStore,
		liquidityProviderStore,
		usdtBalanceStore
	} from '$lib/store';
	import type { Account } from '$lib/types/types';
	import { formatNumber } from '$lib/utils';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	let usdtBalance: Number;
	let account: Account;
	let d9Balances: { free: any; reserved: any; frozen: any };
	onMount(async () => {
		usdtBalance = get(usdtBalanceStore);
		d9Balances = get(d9BalanceStore);
		console.log(d9Balances.free, 'in liquidity manager');
	});
	$: d9Balances = $d9BalanceStore;
	// $: formattedNumber = toHumanNumber(d9Balance.free).toLocaleString('zn', {
	// 	notation: 'compact',
	// 	compactDisplay: 'short'
	// });
	$: account = $accountStore;
	$: liquidityProvider = $liquidityProviderStore;
</script>

<div id="balances">
	<p>USDT <span class="number">${formatNumber(account.usdtBalance)}</span></p>
	<p>D9 <span class="number">{formatNumber(account.d9Balances.free)}</span></p>
</div>
<div id="liquidity-manager" class="shadow color-and-shape">
	<h2>增加流动性</h2>
	<div id="balance-row">
		<!-- {usdtBalance} USDT / {d9Balance.free} D9 -->
	</div>
	<div id="liquidity-content">
		<div>
			<h3 style="font-weight:400">您提供的资产流动性</h3>
			<div id="provider-account">
				<p>D9 {liquidityProvider.d9}</p>
				<p>USDT {liquidityProvider.usdt}</p>
			</div>
		</div>

		<div id="manage-liquidity">
			<button id="add-liquidity-button" class="shadow">添加</button>
			<button id="remove-liquidity-button" class="shadow">消除</button>
		</div>
	</div>
</div>

<style>
	#liquidity-manager {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 50%;
		border-radius: 6px;
		height: auto;
		padding: 20px;
		border-radius: 20px;
		gap: 8px;
		margin: 0 auto;
	}
	#liquidity-content {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 95%;
	}
	#manage-liquidity {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 22px;
		height: 100%;
	}

	#provider-account {
		display: flex;
		flex-direction: column;
	}
	#balances {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 50%;
		height: auto;
		gap: 8px;
		margin: 0 auto;
	}
	.number {
		color: green;
	}
	#add-liquidity-button {
		background-color: rgba(0, 128, 0, 0.416);
		color: white;
	}
	#remove-liquidity-button {
		background-color: rgba(255, 0, 0, 0.456);
		color: white;
	}
</style>
