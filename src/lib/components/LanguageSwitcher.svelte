<script lang="ts">
	import { getTolgee } from '@tolgee/svelte';
	import { availableLanguages } from '$lib/i18n';

	const tolgee = getTolgee(['language']);

	// Dynamically build language names from tags using Intl.DisplayNames
	const languages = availableLanguages.map((tag) => {
		try {
			const displayNames = new Intl.DisplayNames([tag], { type: 'language' });
			return { tag, name: displayNames.of(tag) || tag };
		} catch {
			return { tag, name: tag };
		}
	});

	let isOpen = $state(false);
	let dropdownNode: HTMLElement;

	function changeLanguage(tag: string) {
		$tolgee.changeLanguage(tag);
		isOpen = false;
	}

	function toggleDropdown(event: MouseEvent) {
		event.stopPropagation();
		isOpen = !isOpen;
	}

	function handleWindowClick(event: MouseEvent) {
		if (isOpen && dropdownNode && !dropdownNode.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			isOpen = false;
		}
	}
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleKeydown} />

<div class="dropdown is-right" class:is-active={isOpen} bind:this={dropdownNode}>
	<div class="dropdown-trigger">
		<button
			class="button"
			aria-haspopup="true"
			aria-controls="language-menu"
			aria-expanded={isOpen}
			onclick={toggleDropdown}
		>
			<span class="icon is-small">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10"></circle>
					<line x1="2" y1="12" x2="22" y2="12"></line>
					<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
				</svg>
			</span>
			<span>{$tolgee.getLanguage() || 'en'}</span>
			<span class="icon is-small">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="6 9 12 15 18 9"></polyline>
				</svg>
			</span>
		</button>
	</div>
	<div class="dropdown-menu" id="language-menu" role="menu">
		<div class="dropdown-content">
			{#each languages as lang}
				<a
					href="#{lang.tag}"
					class="dropdown-item"
					class:is-active={$tolgee.getLanguage() === lang.tag}
					onclick={(e) => {
						e.preventDefault();
						changeLanguage(lang.tag);
					}}
				>
					{lang.tag} - {lang.name}
				</a>
			{/each}
		</div>
	</div>
</div>
