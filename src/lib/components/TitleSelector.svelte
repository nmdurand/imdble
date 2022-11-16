<script lang="ts">
	import Title from './TitleOption.svelte';

	export let disabled: boolean = false;
	export let titles: string[];

	let filteredTitles: string[] = [];

	const filterTitles = () => {
		let storageArr: string[] = [];
		let count = 0;
		if (inputValue) {
			titles.forEach((title) => {
				count++;
				if (title.toLowerCase().includes(inputValue.toLowerCase())) {
					storageArr = [...storageArr, title];
				}
			});
		}
		filteredTitles = storageArr;
	};

	/* HANDLING THE INPUT */
	let searchInput: HTMLInputElement; // use with bind:this to focus element
	let inputValue = '';

	$: {
		if (!inputValue) {
			filteredTitles = [];
		}
		// whenever inputValue changes, reset hiliting
		hiLiteIndex = null;
	}

	export const clearInput = () => {
		inputValue = '';
		searchInput.focus();
	};

	const setInputVal = (title: string) => {
		inputValue = title;
		filteredTitles = [];
		hiLiteIndex = null;
		(document.querySelector('#title-input') as HTMLInputElement).focus();
	};

	export let onSubmit: (title: string) => void;

	/* NAVIGATING OVER THE LIST OF COUNTRIES W HIGHLIGHTING */
	let hiLiteIndex: number | null = null;

	const navigateList = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				if (hiLiteIndex === null || hiLiteIndex === filteredTitles.length - 1) {
					hiLiteIndex = 0;
				} else if (hiLiteIndex < filteredTitles.length - 1) {
					hiLiteIndex += 1;
				}
				break;
			case 'ArrowUp':
				e.preventDefault();
				if (hiLiteIndex === null || hiLiteIndex === 0) {
					hiLiteIndex = filteredTitles.length - 1;
				} else if (hiLiteIndex > 0) {
					hiLiteIndex -= 1;
				}
				break;
			case 'Enter':
				if (hiLiteIndex !== null) {
					e.preventDefault();
					setInputVal(filteredTitles[hiLiteIndex]);
				}
				break;
		}
	};
</script>

<svelte:window on:keydown={navigateList} />

<form id="title-selector" autocomplete="off" on:submit|preventDefault={() => onSubmit(inputValue)}>
	<input
		id="title-input"
		type="text"
		placeholder="Type Movie Title"
		{disabled}
		bind:this={searchInput}
		bind:value={inputValue}
		on:input={filterTitles}
	/>

	<!-- FILTERED LIST OF MOVIE TITLES -->
	{#if filteredTitles.length > 0}
		<ul id="autocomplete-items-list">
			{#each filteredTitles as title, i}
				<Title
					itemLabel={title}
					highlighted={i === hiLiteIndex}
					on:click={() => setInputVal(title)}
				/>
			{/each}
		</ul>
	{/if}

	<input type="submit" value="Guess" {disabled} />
</form>

<style>
	#title-selector {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		position: relative;
	}
	input {
		border: 1px solid transparent;
		background-color: #f1f1f1;
		padding: 10px;
		font-size: 16px;
		margin: 0;
		box-sizing: border-box;
	}
	input[type='text'] {
		background-color: #f1f1f1;
	}
	input[type='submit'] {
		background-color: var(--imdb-gold);
		color: black;
		cursor: pointer;
		margin-top: 0.5em;
		border-radius: 3px;
	}
	input[type='submit']:hover {
		opacity: 0.9;
	}
	input[type='submit'][disabled] {
		opacity: 0.9;
		cursor: default;
	}

	#autocomplete-items-list {
		position: absolute;
		width: calc(100% - 2px);
		top: calc(1em + 22px);
		margin: 0;
		padding: 0;
		border: 1px solid #ddd;
		background-color: #ddd;
	}
</style>
