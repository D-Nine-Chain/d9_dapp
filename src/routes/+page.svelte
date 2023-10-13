<script lang="ts">
	import Ancestor from '$lib/components/Ancestor.svelte';
	import { getParent, getAncestors } from '$lib/rpc';
	import { accountStore } from '$lib/accountStore';
	let ancestry: any[] = [];
	let parent: any;
	accountStore.subscribe(async (walletAccount) => {
		if (walletAccount.address) {
			parent = await getParent(walletAccount.address);
			console.log(parent);
			ancestry = await getAncestors(walletAccount.address);
			console.log(ancestry);
			//5ED3AFmssWV9BbrkBmsTpBSNSoJESLuX5YKHBnVxo15PQ4mc
		}
	});
</script>

<div id="home">
	<div id="ancestry">父母的地址:{parent}</div>
	<div id="ancestry">
		{#each ancestry as ancestor}
			<Ancestor {ancestor} />
		{/each}
	</div>
</div>

<style>
	#home {
		display: flex;
		flex-direction: column;
		height: 700px;
		width: 600px;
	}
	#ancestry {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>
