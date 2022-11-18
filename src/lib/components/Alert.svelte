<script lang="ts">
	import { fly } from 'svelte/transition';

	let message: string = '';
	let hidden = true;

	export const show = (str: string) => {
		message = str;
		hidden = false;
		setTimeout(() => {
			hidden = true;
		}, 2000);
	};
</script>

{#if !hidden}
	<div class="alert-container">
		<div class="alert" class:hidden transition:fly={{ x: 0, y: -20, duration: 300 }}>
			<b>{message}</b>
		</div>
	</div>
{/if}

<style>
	.alert-container {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: none;
	}
	.alert {
		background-color: white;
		border: 1px solid var(--imdb-light-grey);
		color: black;
		padding: 0.5em;
		border-radius: 0.2em;
		box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);
	}
</style>
