<script lang="ts">
	import { getUSDT, getUSDTPrice } from '$lib/contracts/amm';
	import { onMount } from 'svelte';
	let usdtPrice: number;
	let convertAmount: number;
	onMount(async () => {
		usdtPrice = await getUSDTPrice();
	});
</script>

<div id="exchange-manager">
	<h2>购买 USDT</h2>
	<div>
		USDT/D9 = {usdtPrice ? usdtPrice.toFixed(2) : '...'}
	</div>
	<div>
		你收到 : {(usdtPrice * (convertAmount ?? 0)).toFixed(2)} USDT
	</div>
	<input bind:value={convertAmount} placeholder="您要转换多少 D9" />
	<button
		id="buy-button"
		class:gray-button={Number.isNaN(convertAmount) ||
			convertAmount === 0 ||
			convertAmount === undefined}
		on:click={async () => {
			await getUSDT(convertAmount);
		}}>买</button
	>
</div>

<style>
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

	#exchange-manager {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 50%;
		border-radius: 6px;
		height: auto;
		padding: 20px;
		border-radius: 6px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		gap: 8px;
		margin: 0 auto;
		/* ... other styles ... */
		background-color: white;
	}

	#buy-button {
		background-color: green;
		color: white;
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
