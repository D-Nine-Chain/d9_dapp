<script lang="ts">
	import { accountStore } from '$lib/store';
	import type { Account } from '$lib/types/types';
	import Ancestor from '$lib/components/Ancestor.svelte';
	import { get } from 'svelte/store';
	let account: Account;

	$: account = $accountStore;
</script>

<div id="ancestors">
	<h3>父节点</h3>
	<div id="parent" class="shadow color-and-shape">{account.parent}</div>
	<h3>完整的祖先列表</h3>
	<div id="ancestors" class="shadow color shape">
		{#if account}
			{#if account.ancestors}
				{#if account.ancestors.length > 0}
					{#each account.ancestors as ancestor}
						<Ancestor {ancestor} />
					{/each}
				{/if}
			{/if}
		{/if}
	</div>
</div>

<style>
	h3 {
		font-weight: 400;
	}
	#parent {
		padding: 16px 24px;
		border-radius: 10px;
	}
</style>
