<script lang="ts">
	import {
		d9Subscribe,
		getMerchantAccount,
		getMerchantAccountExpiry,
		giveGreenPoints
	} from '$lib/contracts/merchant';
	import { onMount } from 'svelte';
	import { merchantAccountStore } from '$lib/stores/merchantAccountStore';
	import { merchantAccountExpiryStore } from '$lib/stores/merchantAccountExpiryStore';
	import { toHumanNumber } from '$lib/utils';
	let merchantAccount: any;
	let greenAmount: number = 100;
	let greenAddress: string = '';
	let now = new Date();
	let isMerchant = false;
	let expiry: any;
	onMount(async () => {
		await getMerchantAccountExpiry();
		if (now < new Date(expiry)) {
			console.log('merchant account is active');
			isMerchant = true;
		} else {
			console.log('merchant account is expired');
		}
		await getMerchantAccount();
	});
	$: merchantAccount = $merchantAccountStore;
	$: expiry = $merchantAccountExpiryStore;
	$: {
		if (now < new Date(expiry)) {
			console.log('merchant account is active');
			isMerchant = true;
		} else {
			console.log('merchant account is expired');
		}
	}
</script>

<div id="merchant">
	<div id="merchant-title">
		<h2>商家帐户</h2>
		<!-- <Time relative timestamp={merchantAccount.created_at} /> -->
	</div>
	<div id="merchant-info">
		<div class="merchant-info-row">
			<p>🟢 : {merchantAccount.greenPoints}</p>
			<p>d9已兑换: {toHumanNumber(merchantAccount.redeemedD9)}</p>
		</div>
	</div>
	<div id="button-container">
		<div class="button-row">
			<button
				id="subscribe-button"
				on:click={async () => {
					await d9Subscribe();
				}}>订阅商家帐户</button
			>

			<button id="redeem-button">兑换 d9 代币</button>
		</div>
		<div>
			<input bind:value={greenAddress} placeholder="地址" style="display:block" />
		</div>
		<div class="button-row">
			<input bind:value={greenAmount} placeholder="enter burn amount" style="display:block" />
			<button
				class:give-green-points-button={isMerchant}
				on:click={async () => {
					await giveGreenPoints(greenAddress, greenAmount);
				}}>给绿点</button
			>
		</div>
	</div>
</div>

<style>
	#merchant {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.give-green-points-button {
		background-color: green;
		color: white;
	}
	#redeem-button {
		color: white;
		background-color: rgb(35, 66, 146);
	}
	#subscribe-button {
		color: white;
		background-color: rgb(229, 124, 60);
	}
	button {
		display: inline-block;
		box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
		border-radius: 6px;
		font-weight: 500;
		font-size: 1.1em;
		padding: 12px 32px;
		border: none;
	}
	.button-row {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
		margin-top: 8px;
	}
	input {
		width: auto;
		border: 0;
		background-color: aliceblue;
		border-radius: 6px;
		height: auto;
		font-size: 1.8em;
		padding: 12px 0;
		padding-left: 20px;
	}
	#merchant-info {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.merchant-info-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 80%;
	}
	.gray-button {
		background-color: rgb(35, 66, 146);
		color: white;
		pointer-events: none; /* Prevents any click on the button */
		cursor: not-allowed; /* Shows a 'not allowed' cursor when you hover over it */
		opacity: 0.6; /* Makes the button semi-transparent to show it's disabled */
		background-color: #d3d3d3; /* A generic gray background color */
		border: none; /* Removes the border */
		padding: 10px 20px; /* Provides some padding */
		font-size: 16px; /* Sets the font size */
		border-radius: 4px;
	}
</style>
