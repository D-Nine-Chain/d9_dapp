<script lang="ts">
	import { burn, dryBurn, withdraw } from '$lib/contracts/burn';
	let burnAmount: number = 200;
</script>

<div id="functions" class="shadow color-and-shape">
	<input bind:value={burnAmount} placeholder="enter burn amount" style="display:block" />
	<button
		id="burn-button"
		on:click={async () => {
			await burn(burnAmount);
		}}>烧伤</button
	>
	<button
		id="withdraw-button"
		on:click={async () => {
			await withdraw();
		}}>提取</button
	>
	<!-- <button
					id="withdraw-button"
					on:click={async () => {
						await dryBurn(burnAmount);
					}}><h2>dry burn</h2></button
				> -->
</div>

<style>
	#functions {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 95%;
		border-radius: 6px;
		height: 80px;
		border-radius: 6px;
		gap: 8px;
		margin: 0 auto;
		/* ... other styles ... */
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
	button {
		display: inline-block;
		box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
		border-radius: 6px;
		font-weight: 500;
		font-size: 1.1em;
		padding: 12px 32px;
	}
	#burn-button {
		background-color: #ff0000;
		border: none;
		color: white;
		text-align: center;
		text-decoration: none;
		display: block;
	}
	#withdraw-button {
		background-color: green;
		border: none;
		color: white;
		text-align: center;
		text-decoration: none;
		display: block;
	}
</style>
