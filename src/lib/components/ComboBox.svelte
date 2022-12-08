<script lang="ts">
	import ComboBoxOption from './ComboBoxOption.svelte';

	export let disabled: boolean = false;
	export let dataList: string[];
	export let placeholder: string = 'Start typing...';

	let filteredDataList: string[] = [];

	const filterDataList = () => {
		if (inputValue.length < 2) {
			filteredDataList = [];
		} else {
			filteredDataList = dataList.filter((option) =>
				option.toLowerCase().includes(inputValue.toLowerCase())
			);
		}
	};

	/* HANDLING THE INPUT */
	let inputValue = '';
	let textInput: HTMLInputElement;

	$: {
		if (!inputValue) {
			filteredDataList = [];
		}
		// whenever inputValue changes, reset hiliting
		hiLiteIndex = null;
	}

	const setInputVal = (option: string) => {
		inputValue = option;
		filteredDataList = [];
		hiLiteIndex = null;
		textInput.focus();
	};

	export const clearInput = () => {
		setInputVal('');
	};

	export let onSubmit: (value: string) => void;

	/* NAVIGATING OVER THE LIST W HIGHLIGHTING */
	let hiLiteIndex: number | null = null;

	const navigateList = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				if (hiLiteIndex === null || hiLiteIndex === filteredDataList.length - 1) {
					hiLiteIndex = 0;
				} else if (hiLiteIndex < filteredDataList.length - 1) {
					hiLiteIndex += 1;
				}
				break;
			case 'ArrowUp':
				e.preventDefault();
				if (hiLiteIndex === null || hiLiteIndex === 0) {
					hiLiteIndex = filteredDataList.length - 1;
				} else if (hiLiteIndex > 0) {
					hiLiteIndex -= 1;
				}
				break;
			case 'Enter':
				if (hiLiteIndex !== null) {
					e.preventDefault();
					setInputVal(filteredDataList[hiLiteIndex]);
				}
				break;
		}
	};
</script>

<svelte:window on:keydown={navigateList} />

<form
	id="combobox"
	data-testid="combobox"
	autocomplete="off"
	on:submit|preventDefault={() => onSubmit(inputValue)}
>
	<input
		type="text"
		{placeholder}
		{disabled}
		bind:value={inputValue}
		bind:this={textInput}
		on:input={filterDataList}
	/>

	<input type="submit" value="Guess" {disabled} />

	{#if filteredDataList.length > 0}
		<ul id="combobox-options-list">
			{#each filteredDataList as option, i}
				<ComboBoxOption
					label={option}
					highlighted={i === hiLiteIndex}
					on:click={() => setInputVal(option)}
				/>
			{/each}
		</ul>
	{/if}
</form>

<style>
	#combobox {
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

	#combobox-options-list {
		position: absolute;
		width: calc(100% - 2px);
		top: calc(1em + 22px);
		margin: 0;
		padding: 0;
		border: 1px solid #ddd;
		background-color: #ddd;
	}
</style>
