<script lang="ts">
	import { onMount } from 'svelte';
	import { accountStore } from '$lib/stores/accountStore';
	import { totalBurnedStore } from '$lib/stores/totalBurnedStore';
	import NoAccountModal from '$lib/components/NoAccountModal.svelte';
	import { checkForExtension, getAccounts, toHumanNumber } from '$lib/utils';
	import { web3FromAddress } from '@polkadot/extension-dapp';
	import { getParent, updateData } from '$lib/rpc';
	import BurnPortfolio from '$lib/components/BurnPortfolio.svelte';
	let showNoAccountModal: boolean = true;
	let extensions: any[] = [];
	let account: any;
	let parent: any;
	onMount(async () => {
		extensions = await checkForExtension();
		const accounts = await getAccounts();
		console.log(accounts);
		if (accounts.length > 0) {
			account = accounts[0];
			parent = await getParent(account.address.address);
			const injector = await web3FromAddress(account.address);
			account.signer = injector.signer;
			accountStore.set(account);
			await updateData();
		}

		console.log(account);
	});
	let totalBurned: any;
	$: {
		if (extensions.length > 0) {
			showNoAccountModal = false;
		}
	}
	$: totalBurned = $totalBurnedStore;
</script>

<div id="home">
	<div id="top-row">
		<div id="account-data">
			<div id="account-row">
				<div id="your-account">
					{#if account}
						<h1>你的账户 {account.meta.name}</h1>
					{/if}
				</div>
				<div class="account-info">
					<p>
						{#if account}
							{account.address}
						{/if}
					</p>
				</div>
				<div class="account-info">
					<p>
						{#if account}
							👴 {parent}
						{/if}
					</p>
				</div>
			</div>
		</div>
		<div id="total-burned">
			<h2>燃烧总量 {toHumanNumber(totalBurned)}</h2>
		</div>
	</div>
	<BurnPortfolio />
	<div id="content">
		<slot />
	</div>
</div>

{#if showNoAccountModal}
	<NoAccountModal bind:showNoAccountModal />
{/if}

<style>
	:global(body) {
		background: #ebebeb;
		font-family: sans-serif;
	}
	* {
		box-sizing: border-box;
	}
	#home {
		height: 70%;
	}
	#top-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
	}
	#account-data {
		width: 400px;
	}
	#your-account {
		display: flex;
		flex-direction: column;
		border: 0;
		border-radius: 6px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		background-color: white;
		width: 100%;
		padding-left: 40px;
		margin-bottom: 15px;
	}
	.account-info {
		display: flex;
		flex-direction: column;
		border: 0;
		border-radius: 6px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		background-color: white;
		width: 100%;
		padding-left: 24px;
		margin-bottom: 15px;
		padding-top: 8px;
		padding-bottom: 8px;
	}
	.account-info > p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 300px;
	}

	#total-burned {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: white;
		border: 0;
		height: auto;
		border-radius: 6px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		background-color: white;
		width: auto;
		padding: 0px 24px;
	}
	#total-burned > h2 {
		display: block;
	}
	#content {
		margin-top: 70px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 95%;
		margin-left: auto;
		margin-right: auto;
	}
</style>
