<script lang="ts">
	import type { Question } from '../../stores';

	export let question: Question;
	export let currentGuessIndex: number;

	type Clue = {
		prop: 'year' | 'director' | 'actor';
		label: string;
	};

	const clues: Clue[] = [
		{ prop: 'year', label: 'Year' },
		{ prop: 'director', label: 'Director' },
		{ prop: 'actor', label: 'Actor' }
	];
</script>

<div class="clues-section">
	<div class="section-title">Clues</div>
	<div class="clues">
		{#each clues as clue, i}
			<div class={`clue${currentGuessIndex > i ? ' found' : ''}`}>
				<div class="clue-label">{clue.label}</div>
				<div class="clue-value">
					{currentGuessIndex > i ? question[clue.prop] : '????'}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.clues-section {
		display: flex;
		flex-direction: column;
		background-color: var(--imdb-grey);
		border-radius: 0.25em;
		padding: 1em 0.75em;
		margin-bottom: 1em;
	}
	.section-title {
		font-size: 1.5em;
		font-weight: bold;
		margin-bottom: 0.25em;
	}
	.clues {
		width: 100%;
		display: flex;
	}
	.clue {
		flex: 1;
		margin: 0.2em;
		border: 1px solid black;
		border-radius: 0.25em;
		padding: 1em;
	}
	.found {
		background-color: var(--imdb-gold);
		color: black;
	}
</style>
