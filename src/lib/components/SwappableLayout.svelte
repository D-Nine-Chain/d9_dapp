<script lang="ts">
	export let initialComponent;
	export let buttonNames = ['First', 'Second'];
	export let components: any[] = [];
	let selectedButton: string = buttonNames[0];
	let currentComponent = initialComponent;

	function setComponent(component: any) {
		currentComponent = component;
	}
</script>

<div id="swappable-layout">
	<div id="action-bar">
		{#each components as component, index}
			<button
				class="shadow"
				class:selected-button={selectedButton === buttonNames[index]}
				on:click={() => {
					selectedButton = buttonNames[index];
					setComponent(component);
				}}>{buttonNames[index]}</button
			>
		{/each}
	</div>
	<svelte:component this={currentComponent} />
</div>

<style>
	button {
		background-color: var(--secondary-color);
		color: white;
	}
	#swappable-layout {
		margin-top: 24px;
		height: 100%;
		min-height: 500px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#action-bar {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 20px;
		width: 100%;
		height: auto;
		margin-bottom: 24px;
		padding: 12px 0;
	}
	.selected-button {
		background-color: var(--primary-color);
		color: white;
	}
</style>
