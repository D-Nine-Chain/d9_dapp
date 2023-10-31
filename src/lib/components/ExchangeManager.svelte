<script lang="ts">
	import { purchaseUSDT, getUSDTPrice } from '$lib/contracts/amm';
	import { onMount } from 'svelte';
	let usdtPrice: number;
	let d9Amount: number;
	onMount(async () => {
		usdtPrice = await getUSDTPrice();
	});
</script>

<div id="exchange-manager" class="shadow color-and-shape">
	<h2>购买 USDT</h2>
	<div>
		USDT/D9 = {usdtPrice ? usdtPrice.toFixed(2) : '...'}
	</div>
	<div>
		你收到 : {(usdtPrice * (d9Amount ?? 0)).toFixed(2)} USDT
	</div>
	<div id="input-button-combo">
		<input bind:value={d9Amount} placeholder="您要转换多少 D9" />
		<button
			id="buy-button"
			class:gray-button={Number.isNaN(d9Amount) || d9Amount === 0 || d9Amount === undefined}
			on:click={async () => {
				await purchaseUSDT(d9Amount);
			}}>买</button
		>
	</div>
</div>

<style>
	/* input {
		width: auto;
		border: 0;
		background-color: aliceblue;
		border-radius: 6px;
		height: auto;
		font-size: 1.8em;
		padding: 12px 0;
		padding-left: 20px;
	} */

	#exchange-manager {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 50%;
		border-radius: 6px;
		height: auto;
		padding: 30px 20px 70px;
		border-radius: 20px;
		gap: 24px;
		margin: 0 auto;
		/* ... other styles ... */
	}
	#input-button-combo {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: auto;
		padding: 0 20px;
		background-color: white;
		border-radius: 6px;
	}
	#buy-button {
		background-color: green;
		color: white;
		height: 98%;
		box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
	}
	.gray-button {
		background-color: rgb(35, 66, 146);
		color: white;
		pointer-events: none; /* Prevents any click on the button */
		cursor: not-allowed; /* Shows a 'not allowed' cursor when you hover over it */
		opacity: 0.4; /* Makes the button semi-transparent to show it's disabled */
		background-color: #d3d3d3; /* A generic gray background color */
	}
</style>
