<script lang="ts">
	import { getTolgee } from '@tolgee/svelte';

	const tolgee = getTolgee(['language']);

	const languages = [
		{ tag: 'en', name: 'English' },
		{ tag: 'de', name: 'Deutsch' }
	];

	function changeLanguage(tag: string) {
		$tolgee.changeLanguage(tag);
	}
</script>

<div class="field has-addons is-justify-content-center">
	{#each languages as lang}
		<p class="control">
			<button
				class="button"
				class:is-info={$tolgee.getLanguage() === lang.tag}
				class:is-selected={$tolgee.getLanguage() === lang.tag}
				onclick={() => changeLanguage(lang.tag)}
			>
				{lang.name}
			</button>
		</p>
	{/each}
</div>