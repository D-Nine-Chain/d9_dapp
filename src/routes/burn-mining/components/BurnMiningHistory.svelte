<script lang="ts">
	import type { BurnPortfolio } from '$lib/types/types';
	import { burnPortfolioStore } from '$lib/store';
	let burnPortfolio: BurnPortfolio;
	$: burnPortfolio = $burnPortfolioStore;
</script>

<div id="burn-history">
	<div class="info-row shadow shape color">
		<h2>最后一次提取股息</h2>
		<span>{new Date(burnPortfolio.lastWithdrawal.time).toLocaleDateString('zh-CN')}</span>
	</div>
	<div class="info-row shadow shape color">
		<h2>最后燃烧动作</h2>
		<span>{new Date(burnPortfolio.lastBurn.time).toLocaleDateString('zh-CN')}</span>
	</div>
</div>

<style>
	h2 {
		font-weight: 300;
		font-size: 1rem;
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
	#burn-history {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		width: 95%;
		max-width: 800px;
	}
</style>
