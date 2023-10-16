<script lang="ts">
	import { onMount } from 'svelte';
	import { accountStore } from '$lib/stores/accountStore';
	import { totalBurnedStore } from '$lib/stores/totalBurnedStore';
	import NoAccountModal from '$lib/components/NoAccountModal.svelte';
	import { checkForExtension, getAccounts } from '$lib/utils';
	import { web3FromAddress } from '@polkadot/extension-dapp';
	import { updateData } from '$lib/rpc';
	let showNoAccountModal: boolean = true;
	let extensions: any[] = [];
	let account: any;
	onMount(async () => {
		extensions = await checkForExtension();
		const accounts = await getAccounts();
		console.log(accounts);
		if (accounts.length > 0) {
			account = accounts[0];
			const injector = await web3FromAddress(account.address);
			account.signer = injector.signer;
			accountStore.set(account);
			updateData();
		}

		console.log(account);
	});
	let totalBurned: any;
	$: {
		if (extensions.length > 0) {
			showNoAccountModal = false;
		}
		totalBurned = $totalBurnedStore;
	}
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
				<div id="account-info">
					<p>
						{#if account}
							{account.address}
						{/if}
					</p>
				</div>
			</div>
		</div>
		<div id="total-burned">
			<h3>燃烧总量。</h3>
			<p>{totalBurned}</p>
		</div>
	</div>

	<div />
</div>
<div id="content">
	<slot />
</div>
{#if showNoAccountModal}
	<NoAccountModal bind:showNoAccountModal />
{/if}

<style>
	:global(body) {
		background: #ebebeb;
	}
	* {
		box-sizing: border-box;
	}
	#home {
		display: flex;
		flex-direction: column;
	}
	#top-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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
	#account-info {
		display: flex;
		flex-direction: column;
		border: 0;
		border-radius: 6px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		background-color: white;
		width: 100%;
		padding-left: 24px;
		padding-top: 8px;
		padding-bottom: 8px;
	}
	#account-info > p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 300px;
	}
	#content {
		margin-top: 70px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		background-color: white;
	}
</style>
