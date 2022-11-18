<script>
	import './main.css';
	import { gameState } from './stores';
	import RulesModal from '$lib/components/modal/RulesModal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import arrowRotate from '$lib/icons/arrow-rotate.svg';

	const loadNewQuestion = async () => {
		const res = await fetch('api/question', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			const result = await res.json();
			gameState.setNewQuestion(result);
		} else {
			throw new Error('Something went wrong');
		}
	};
</script>

<div class="container">
	<div class="header">
		<h1 class="title">IMDble</h1>
		<RulesModal />
		<Icon src={arrowRotate} alt="Rotate icon" onClick={loadNewQuestion} />
	</div>
	<hr />
	<slot />
</div>

<style>
	.container {
		max-width: 500px;
		margin: 0 auto;
		padding: 0 1em;
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
	.header {
		width: 100%;
		display: flex;
		align-items: center;
	}
	.title {
		justify-self: start;
		background-color: var(--imdb-gold);
		color: black;
		border-radius: 0.25em;
		margin: 0;
		margin-right: auto;
		padding: 0.2em 0.5em;
		user-select: none;
	}
	hr {
		width: 100%;
		border: 1px solid var(--imdb-gold);
		margin-bottom: 1em;
	}
</style>
