<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import question from '$lib/icons/question.svg';
	import Icon from '$lib/components/Icon.svelte';

	let modal: Modal;
	const openModal = () => {
		modal.openModal();
	};
</script>

<Icon src={question} alt="Question mark icon" onClick={openModal} />
<Modal title="Rules" bind:this={modal}>
	<p>
		The rules are dead simple: read the plot, guess the movie. Each time you fail, you get a new
		clue (year, director, actor). You have 4 guesses. Good luck!
	</p>
</Modal>
