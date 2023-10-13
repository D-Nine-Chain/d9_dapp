<script lang="ts">
	import { onMount } from 'svelte';
	import { accountStore } from '$lib/accountStore';
	import NoAccountModal from '$lib/components/NoAccountModal.svelte';
	import { checkForExtension, getAccounts } from '$lib/utils';
	let showNoAccountModal: boolean = true;
	let extensions: any[] = [];
	let account: any;
	onMount(async () => {
		extensions = await checkForExtension();
		const accounts = await getAccounts();
		console.log(accounts);
		if (accounts.length > 0) {
			account = accounts[0];
			accountStore.set(account);
			console.log('should change');
		}
		console.log(account);
	});
	$: {
		if (extensions.length > 0) {
			showNoAccountModal = false;
		}
	}
</script>

<div id="home">
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
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		background-color: white;
	}
</style>
