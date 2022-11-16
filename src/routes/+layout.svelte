<script>
	import './main.css';
	import { gameState } from '../stores';

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
		<button on:click={loadNewQuestion}>NEW GAME</button>
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
		justify-content: space-between;
	}
	.title {
		background-color: var(--imdb-gold);
		color: black;
		border-radius: 0.25em;
		margin: 0;
		padding: 0.2em 0.5em;
		user-select: none;
	}
	hr {
		width: 100%;
		border: 1px solid var(--imdb-gold);
		margin-bottom: 1em;
	}
</style>
