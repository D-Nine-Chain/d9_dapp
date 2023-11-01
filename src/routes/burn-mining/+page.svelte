<script lang="ts">
	import SwappableLayout from '$lib/components/SwappableLayout.svelte';
	import BurnMiningHistory from './components/BurnMiningHistory.svelte';
	import BurnDividends from './components/BurnDividends.svelte';
	import BurnMining from './components/BurnMining.svelte';
	import type { BurnPortfolio } from '$lib/types/types';
	import { sendNotification } from '$lib/utils';
	import { onMount } from 'svelte';
	let initialComponent = BurnMining;
	let componentNames = ['燃烧采矿', '烧毁股息', '燃烧采矿历史'];
	let components = [BurnMining, BurnDividends, BurnMiningHistory];
	let burnPortfolio: BurnPortfolio;
	onMount(() => {
		if (!burnPortfolio) {
			sendNotification('warning', '请稍等', '燃烧投资组合仍在加载中');
		}
	});
</script>

<SwappableLayout {initialComponent} buttonNames={componentNames} {components} />

<style>
</style>
