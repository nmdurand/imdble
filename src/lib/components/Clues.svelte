<script lang="ts">
	import type { Question } from '../../routes/stores';

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

<div class="section section-block">
	<div class="section-title">Clues</div>
	<div class="clues">
		{#each clues as clue, i}
			<div class="clue" class:found={currentGuessIndex > i}>
				<div class="clue-label">{clue.label}</div>
				<div class="clue-value">
					{currentGuessIndex > i ? question[clue.prop] : '????'}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
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
