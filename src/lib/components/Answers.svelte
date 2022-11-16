<script lang="ts">
	import type { GameGuess } from '../../stores';

	export let guesses: (GameGuess | undefined)[];
</script>

<div class="answers">
	{#each guesses as guess}
		{#if guess}
			<div class={`answer-slot ${guess.isCorrect ? 'correct' : 'incorrect'}`}>{guess.answer}</div>
		{:else}
			<div class="answer-slot" />
		{/if}
	{/each}
</div>

<style>
	.answers {
		width: 100%;
		margin-bottom: 1em;
	}
	.answer-slot {
		width: 100%;
		height: 2em;
		border-radius: 0.25em;
		margin: 0.2em 0;
		padding: 0 0.5em;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		background-color: var(--imdb-grey);
		color: white;
	}
	.correct {
		background-color: #0e390e;
	}
	.incorrect {
		background-color: #3e0c0c;
	}
</style>
