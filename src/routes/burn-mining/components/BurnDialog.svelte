<script lang="ts">
	import { burn } from '$lib/contracts/burn';
	let burnAmount: number;
</script>

<div id="burn-dialog">
	<input bind:value={burnAmount} type="number" placeholder="你想烧多少" />
	<div id="button-container">
		<button
			id="burn-button"
			on:click={async () => {
				await burn(burnAmount);
			}}>烧</button
		>
	</div>
</div>

<style>
	#burn-dialog {
		display: flex;
		flex-direction: column;
		background-color: white;
		border: 10px;
		border: 0;
	}
	#button-container {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
	#burn-button {
		background-color: var(--red);
		color: white;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}

	@keyframes rotateBackground {
		0%,
		100% {
			background-position: 100% 50%;
		}
		50% {
			background-position: 0% 50%;
		}
	}
</style>
