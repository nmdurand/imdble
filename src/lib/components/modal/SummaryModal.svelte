<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { Question, GameStatus } from 'src/routes/stores';

	export let status: GameStatus;
	export let question: Question;
	export let answer: string | undefined;
</script>

<Modal
	title={status === 'WIN' ? 'Good guess!' : 'Too bad!'}
	shown={status === 'WIN' || status === 'FAIL'}
>
	<div class="section-block">
		<p>
			<a
				href={`https://imdb.com/title/${question.imdb_id}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<b>
					{answer}
				</b>
			</a>
		</p>
		<p>Year: {question.year}</p>
		<p>Director: {question.director}</p>
		<p>Actor: {question.actor}</p>
	</div>
</Modal>
