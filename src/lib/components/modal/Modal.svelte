<script lang="ts">
	import Xmark from '$lib/icons/xmark.svg';
	import Icon from '$lib/components/Icon.svelte';
	import { fly } from 'svelte/transition';

	export let title: string;
	export let shown: boolean = false;

	export const openModal = () => {
		shown = true;
	};
	export const closeModal = () => {
		shown = false;
	};
</script>

{#key shown}
	<div
		class="modal-backdrop"
		class:shown
		on:click|self={closeModal}
		on:keydown|self={closeModal}
		transition:fly={{ y: -20 }}
	>
		<div class="modal-content section-block">
			<div class="modal-header">
				<h3>{title}</h3>
				<Icon class="close-button" src={Xmark} alt="close-icon" onClick={closeModal} />
			</div>
			<slot />
		</div>
	</div>
{/key}

<style>
	.modal-backdrop {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		align-items: flex-start;
		justify-content: center;
		z-index: 9999;
	}
	.modal-backdrop.shown {
		display: flex;
	}
	.modal-content {
		width: 100%;
		max-width: 500px;
		margin-top: 100px;
		box-sizing: border-box;
		position: relative;
	}
	div :global(.close-button) {
		position: absolute;
		top: 1em;
		right: 1em;
		cursor: pointer;
		width: 1em;
		height: 1em;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
