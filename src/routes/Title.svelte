<script lang="ts">
	export let itemLabel: string;
	export let highlighted: boolean;
</script>

<li
	class="autocomplete-items"
	class:autocomplete-active={highlighted}
	on:click
	on:keydown
	on:keyup
	on:keypress
>
	{@html itemLabel}
</li>

<style>
	li.autocomplete-items {
		list-style: none;
		border-bottom: 1px solid #d4d4d4;
		z-index: 99;
		/*position the autocomplete items to be the same width as the container:*/
		top: 100%;
		left: 0;
		right: 0;
		padding: 10px;
		cursor: pointer;
		background-color: var(--imdb-grey);
		opacity: 0.9;
	}

	li.autocomplete-items:hover {
		/*when hovering an item:*/
		background-color: var(--imdb-gold);
		color: black;
	}

	li.autocomplete-items:active {
		/*when navigating through the items using the arrow keys:*/
		background-color: var(--imdb-gold) !important;
		color: black;
	}

	.autocomplete-active {
		/*when navigating through the items using the arrow keys:*/
		background-color: var(--imdb-gold) !important;
		color: black;
	}
</style>
