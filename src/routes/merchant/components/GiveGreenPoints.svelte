<script lang="ts">
	import { giveGreenPoints } from '$lib/contracts/merchant';
	import { checkAddress } from '@polkadot/util-crypto';
	let testAddres = '5ED3AFmssWV9BbrkBmsTpBSNSoJESLuX5YKHBnVxo15PQ4mc';
	let isValidInput: boolean = false;
	let address: string = '';
	let amount: number = 0;
	function isValidForm(address: string, amount: number): boolean {
		let addressCheck = checkAddress(address, 42)[0];
		let amountCheck = amount > 0;
		return addressCheck && amountCheck;
	}
</script>

<div id="give-green-points" class="shadow color shape">
	<input
		type="text"
		bind:value={address}
		on:input={() => {
			isValidInput = isValidForm(address, amount);
		}}
		placeholder="输入接收者的地址"
	/>
	<input
		type="number"
		step="0.1"
		bind:value={amount}
		on:input={() => {
			isValidInput = isValidForm(address, amount);
		}}
		placeholder="输入USDT金额"
	/>
	<div id="button-container">
		<button
			id="give-button"
			class="shadow {isValidForm(address, amount) ? 'active-button' : 'not-active-button'}"
			on:click={() => {
				giveGreenPoints(address, amount);
			}}>发送绿点</button
		>
	</div>
</div>

<style>
	#give-green-points {
		display: flex;
		flex-direction: column;
		gap: 8px;
		max-width: 600px;
	}
	#button-container {
		margin-top: 24px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
	.not-active-button {
		pointer-events: none;
		color: white;
		background-color: gainsboro;
	}
	.active-button {
		background-color: var(--green);
		color: white;
		pointer-events: all;
	}
</style>
