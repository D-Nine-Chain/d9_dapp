<script lang="ts">
	import { onMount } from 'svelte';
	import NoAccountModal from '$lib/components/NoAccountModal.svelte';
	import { page } from '$app/stores';
	import { checkForBrowserExtension, getAccountsFromBrowser, prepAccount } from '$lib/chain';
	import { goto } from '$app/navigation';
	import type { TransactionNotification } from '$lib/types/types';
	import { TransactionStatus, sendNotification, sendToast } from '$lib/utils';
	let showNoAccountModal: boolean = true;
	let extensions: any[] = [];
	let transactionColor: string = '';
	let transactionNotification: TransactionNotification = {
		action: 'burn',
		status: TransactionStatus.Finalized
	};
	let n;
	onMount(async () => {
		extensions = await checkForBrowserExtension();
		const accounts = extensions.length > 0 ? await getAccountsFromBrowser() : [];
		sendToast('寻找兼容的浏览器钱包');
		console.log('accounts are ', accounts);
		if (accounts.length > 0) {
			sendToast('发现浏览器扩展');
			console.log('found accounts, preppping the first one');
			try {
				await prepAccount(accounts[0]);
				sendToast('所有数据均已记录', 'success');
			} catch (e) {
				sendNotification('error', '无法准备帐户', '看来我们遇到了错误');
			}
		}
	});

	$: {
		if (extensions.length > 0) {
			showNoAccountModal = false;
		}
	}

	// $: transactionUpdate = $transactionInfoStore;
	$: {
		if (transactionNotification) {
		}
	}
</script>

<div id="home">
	<div id="top-row">
		<div id="navigation">
			<button
				id="account-management"
				class:selected-button={$page.url.pathname === '/'}
				on:click={() => {
					goto('/');
				}}>帐户管理</button
			>
			<button
				id="ancestor-info"
				class:selected-button={$page.url.pathname === '/ancestor'}
				on:click={() => {
					goto('/ancestor');
				}}>祖先信息</button
			>
			<button
				id="burn-portfolio"
				class:selected-button={$page.url.pathname === '/burn-mining'}
				on:click={() => {
					goto('/burn-mining');
				}}>燃烧采矿</button
			>
			<button
				id="merchant"
				class:selected-button={$page.url.pathname === '/merchant'}
				on:click={() => {
					goto('/merchant');
				}}>商家帐户</button
			>
			<button
				id="amm"
				class:selected-button={$page.url.pathname === '/amm'}
				on:click={() => {
					goto('/amm');
				}}>交换</button
			>
		</div>
	</div>
	<div id="content">
		<slot />
	</div>
</div>

{#if showNoAccountModal}
	<NoAccountModal bind:showNoAccountModal />
{/if}

<style>
	:root {
		--primary-color: #0065b2;
		--desaturated-primary-color: #0065b2;
		--secondary-color: #a7c1d6;
		--background-color: #ebebeb;
		--shadow-color: #c8c8c8;
		--green: rgba(0, 128, 0, 0.526);
		--red: rgba(255, 0, 0, 0.526);
	}
	:global(body) {
		/* background: #ecf0f3; */
		background: var(--background-color);
		font-family: sans-serif;
	}
	:global(button) {
		display: flex;
		align-items: center; /* Vertically center content */
		padding: 10px 20px; /* Adjust as needed */
		background-color: #fff; /* White background */
		border: none;
		border-radius: 10px; /* Rounded corners */
		box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
		cursor: pointer;
		font-size: 16px; /* Adjust as needed */
		transition: box-shadow 0.3s ease, transform 0.3s ease;
	}
	:global(input) {
		width: auto;
		border: 0;
		outline: none;
		background-color: white;
		border-radius: 6px;
		height: auto;
		font-size: 1.8em;
		padding: 12px 0;
		padding-left: 20px;
		box-shadow: -8px 8px 0 #ffffff 70% 8px 8px 8px 0 #aeaec0 20%;
	}
	:global(input::placeholder) {
		color: #cccccc; /* This is a light gray color */
		opacity: 1; /* Optional: Change the opacity for further lightening */
	}
	:global(.shadow) {
		-webkit-box-shadow: 12px 12px 24px var(--shadow-color), -12px -12px 24px #ffffff;
		box-shadow: 12px 12px 24px var(--shadow-color), -12px -12px 24px #ffffff;
	}
	:global(.color-and-shape) {
		/* background: #ecf0f3; */
		background: var(--background-color);
	}
	:global(.color) {
		background: var(--background-color);
	}
	:global(.shape) {
		border-radius: 6px;
		padding: 30px 20px;
	}
	:global(button:hover) {
		color: white;
		background-color: black;
	}
	:global(button:active) {
		box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px, rgba(0, 0, 0, 0.1) -1px 2px 6px -1px;
		transform: translateY(-3px);
	}
	:global(.selected) {
		background-color: black;
		color: white;
	}
	button {
		border: 0;
		border-radius: 6px;
		background-color: white;
		padding: 12px 0;
		color: black;
		cursor: pointer;
		box-shadow: none;
		padding: 12px 12px;
	}
	#home {
		height: 80%;
	}
	#top-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
	}

	#navigation {
		display: flex;
		flex-direction: row;
		margin: 12px auto;
		justify-content: center;
		gap: 18px;
		background-color: white;
		width: 100%;
	}

	#content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: auto;
	}
	.selected-button {
		background-color: var(--primary-color);
		color: white;
		border-radius: 0;
	}
</style>
