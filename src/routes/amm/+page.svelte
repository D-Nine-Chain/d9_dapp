<script>
	import ExchangeManager from '$lib/components/ExchangeManager.svelte';
	let currentComponent = ExchangeManager;
</script>

<div id="amm">
	<svelte:component this={currentComponent} />
</div>

<style>
	#amm {
		margin-top: 24px;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
