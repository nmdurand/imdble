<script lang="ts">
	import type { GameGuess } from '../../routes/stores';

	export let guesses: (GameGuess | undefined)[];
</script>

<div class="answers section">
	{#each guesses as guess}
		{#if guess}
			<div class="answer-slot" style:background-color={guess.isCorrect ? '#0e390e' : '#3e0c0c'}>
				{guess.answer}
			</div>
		{:else}
			<div class="answer-slot" />
		{/if}
	{/each}
</div>

<style>
	.answer-slot {
		height: 2.2em;
		border-radius: 0.25em;
		margin: 0.2em 0;
		padding: 0 0.5em;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		background-color: var(--imdb-grey);
		border: 1px solid var(--imdb-light-grey);
		color: white;
	}
</style>
