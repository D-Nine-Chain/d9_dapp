<script lang="ts">
	import ExchangeManager from '$lib/components/ExchangeManager.svelte';
	import LiquidityManager from '$lib/components/LiquidityManager.svelte';
	import { accountStore } from '$lib/store';
	let selectedButton: string = 'exchange';
	let currentComponent = ExchangeManager;
	function setComponent(component: any) {
		currentComponent = component;
	}
	$: account = $accountStore;
	//#0065B2
	//#A7C1D6
</script>

<div id="amm">
	<div id="action-bar">
		<button
			id="liquidity-manager-button"
			class="shadow"
			class:selected-button={selectedButton === 'liquidity'}
			on:click={() => {
				selectedButton = 'liquidity';
				setComponent(LiquidityManager);
			}}>管理流动性账户</button
		>
		<button
			class="shadow"
			class:selected-button={selectedButton === 'exchange'}
			on:click={() => {
				selectedButton = 'exchange';
				setComponent(ExchangeManager);
			}}>交换</button
		>
	</div>
	<svelte:component this={currentComponent} />
</div>

<style>
	button {
		background-color: var(--secondary-color);
		color: white;
	}
	#amm {
		margin-top: 24px;
		height: 100%;
		min-height: 500px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#action-bar {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 20px;
		width: 100%;
		height: auto;
		margin-bottom: 24px;
		padding: 12px 0;
	}
	.selected-button {
		background-color: var(--primary-color);
		color: white;
	}
</style>
