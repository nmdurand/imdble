<script lang="ts">
	import { gameState } from './stores';
	import type { PageData } from './$types';
	import Plot from '$lib/components/Plot.svelte';
	import Clues from '$lib/components/Clues.svelte';
	import Answers from '$lib/components/Answers.svelte';
	import TitleSelector from '$lib/components/TitleSelector.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';

	export let data: PageData;
	let titleSelector: TitleSelector;

	const isValidAnswer = (answer: string) => {
		return data.titles.some((title) => title.toLowerCase() === answer.toLowerCase());
	};

	const submitAnswer = async (answer: string) => {
		if (!isValidAnswer(answer)) {
			alert('Invalid answer');
			return;
		}
		const res = await fetch('api/validate-answer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				imdb_id: $gameState.question.imdb_id,
				answer
			})
		});
		if (res.ok) {
			const result = await res.json();
			$gameState.guesses[$gameState.currentGuessIndex] = {
				isCorrect: result.isCorrect,
				answer: result.answer
			};
			if (result.isCorrect) {
				$gameState.status = 'SUCCESS';
			}
			$gameState.currentGuessIndex += 1;
			if ($gameState.currentGuessIndex === $gameState.guesses.length) {
				$gameState.status = 'FAILURE';
			}
		} else {
			throw new Error('Something went wrong');
		}
	};
</script>

<Plot plot={$gameState.question.plot} />

<Clues question={$gameState.question} currentGuessIndex={$gameState.currentGuessIndex} />

<Answers guesses={$gameState.guesses} />

<TitleSelector
	titles={data.titles}
	bind:this={titleSelector}
	onSubmit={(title) => {
		submitAnswer(title);
		titleSelector.clearInput();
	}}
	disabled={$gameState.status !== 'IN_PROGRESS'}
/>

<Modal
	title={$gameState.status}
	shown={$gameState.status === 'SUCCESS' || $gameState.status === 'FAILURE'}
/>
