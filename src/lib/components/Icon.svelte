<script lang="ts">
	export let src = '';
	export let alt = '';
	export let onClick: () => void = () => {};
</script>

<img class={`icon ${$$props.class}`} {src} {alt} on:click={onClick} on:keydown={() => {}} />

<style>
	.icon {
		width: 1.5em;
		height: 1.5em;
		cursor: pointer;
		margin: 0.2em;
	}
	.icon:hover {
		filter: drop-shadow(0 0 0.75em white);
	}
</style>
