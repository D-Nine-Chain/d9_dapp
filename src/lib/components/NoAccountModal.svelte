<script lang="ts">
	export let showNoAccountModal: boolean;
	let dialog: any;
	$: if (dialog && showNoAccountModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:close={() => (showNoAccountModal = false)}>
	<div id="title_bar">
		<h1>警报</h1>
	</div>
	<div id="content">
		<p>请下载兼容 polkadot 的钱包来使用此应用程序。</p>
		<p>安装后，请重新加载页面。</p>
	</div>
</dialog>

<style>
	dialog {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
		width: 96%;
		height: 50%;
		max-height: 400px;
		max-width: 700px;
		border-radius: 4px;
		border: none;
		padding-top: 18px;
	}
	#title_bar {
		color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 4px;
		width: 94%;
		background-color: #d22b2b;
		height: 70px;
	}
	#content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
