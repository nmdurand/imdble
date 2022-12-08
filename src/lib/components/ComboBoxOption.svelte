<script lang="ts">
	export let label: string;
	export let highlighted: boolean;
</script>

<li class="combobox-option" class:highlighted on:click on:keydown on:keyup on:keypress>
	{label}
</li>

<style>
	li.combobox-option {
		list-style: none;
		border-bottom: 1px solid #d4d4d4;
		z-index: 99;
		top: 100%;
		left: 0;
		right: 0;
		padding: 10px;
		cursor: pointer;
		background-color: var(--imdb-grey);
		opacity: 0.9;
	}

	li.combobox-option:hover {
		/*when hovering an item:*/
		background-color: var(--imdb-gold);
		color: black;
	}

	li.combobox-option:active {
		/*when navigating through the options using the arrow keys:*/
		background-color: var(--imdb-gold) !important;
		color: black;
	}

	.highlighted {
		/*when navigating through the options using the arrow keys:*/
		background-color: var(--imdb-gold) !important;
		color: black;
	}
</style>
