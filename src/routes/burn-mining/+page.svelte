<script>
	import SwappableLayout from '$lib/components/SwappableLayout.svelte';
	import BurnMiningHistory from './components/BurnMiningHistory.svelte';
	import BurnDividends from './components/BurnDividends.svelte';
	import BurnMining from './components/BurnMining.svelte';
	let initialComponent = BurnMining;
	let componentNames = ['燃烧采矿', '烧毁股息', '燃烧采矿历史'];
	let components = [BurnMining, BurnDividends, BurnMiningHistory];
</script>

<SwappableLayout {initialComponent} buttonNames={componentNames} {components} />

<style>
</style>
