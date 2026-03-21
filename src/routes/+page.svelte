<script lang="ts">
	import { getTranslate } from '@tolgee/svelte';

	const { t } = getTranslate();

	const DEFAULT_NUMBERS = [1, 2, 3];

	let numbers = $state(DEFAULT_NUMBERS);
	let sum = $derived(numbers.reduce((acc, n) => acc + n, 0));

	let loading: boolean = $state(false);
	let showResetModal: boolean = $state(false);

	function reset() {
		numbers = DEFAULT_NUMBERS;
		showResetModal = false;
	}

	function openResetModal() {
		showResetModal = true;
	}

	function closeResetModal() {
		showResetModal = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && showResetModal) {
			closeResetModal();
		}
	}

	function addNumber() {
		numbers.push(numbers.length + 1);
	}

	async function addRandomNumber() {
		loading = true;
		var response = await fetch('/api/random')
			.then((response) => {
				return response.json();
			})
			.finally(() => (loading = false));

		console.log(`got ${JSON.stringify(response)}`);
		numbers.push(response?.random);
	}

	// $: sum = numbers.reduce((t, n) => t + n, 0);
</script>

<svelte:head>
	<title>{$t('page-title', 'SvelteKit + Bulma Demo')}</title>
</svelte:head>

<div class="section content">
	<h1 class="title has-text-centered">{$t('home.heading', 'SvelteKit + Bulma')}</h1>

	<h2 class="has-text-centered">
		{@html $t('home.subtitle', 'Sample website with {sveltekit} and {bulma}', {
			sveltekit: '<strong>SvelteKit</strong>',
			bulma: '<strong>Bulma</strong>'
		})}
	</h2>
	<div class="section">
		<nav class="level has-text-centered">
			<div class="level-item">
				<p class="field">
					<button
						class="control button is-light is-info"
						onclick={addNumber}
						title={$t('button.next-title', 'Add the next number')}>{$t('button.next', 'Next')}</button
					>
					<button
						class="control button is-light is-warning"
						class:is-loading={loading}
						disabled={loading}
						onclick={addRandomNumber}
						title={$t('button.random-title', 'Add a random number')}>{$t('button.random', 'Random')}</button>
					</p>
			</div>
		</nav>
	</div>
	<div class="container has-text-centered">
		{numbers.join(' + ')} = {sum}
	</div>
	<div class="section has-text-centered">
		<button class="button is-light is-danger" onclick={openResetModal}>
			<span class="icon has-text-info">
				<i class="fas fa-arrows-rotate"></i>
			</span>
			<span>{$t('button.reset', 'Reset')}</span>
		</button>
	</div>
</div>

<svelte:window onkeydown={handleKeydown} />

<!-- Reset Confirmation Modal -->
<div class="modal" class:is-active={showResetModal}>
	<div
		class="modal-background"
		onclick={closeResetModal}
		onkeydown={(e) => e.key === 'Enter' && closeResetModal()}
		role="button"
		tabindex="-1"
	></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{$t('modal.reset-title', 'Confirm Reset')}</p>
			<button class="delete" aria-label="close" onclick={closeResetModal}></button>
		</header>
		<section class="modal-card-body">
			<p>{$t('modal.reset-body', 'Do you really want to reset this complex calculation?')}</p>
		</section>
		<footer class="modal-card-foot">
			<div class="buttons">
				<button class="button is-success" onclick={reset}>{$t('button.ok', 'OK')}</button>
				<button class="button" onclick={closeResetModal}>{$t('button.cancel', 'Cancel')}</button>
			</div>
		</footer>
	</div>
</div>

<footer class="footer">
	<div class="has-text-centered">
		<a href="https://kit.svelte.dev">SvelteKit</a>
		<span>|</span>
		<a href="https://bulma.io">bulma.io</a>
	</div>
</footer>

<style>
	/* Compact header and footer */
	.modal-card-head,
	.modal-card-foot {
		padding: 0.75rem 1rem;
	}

	/* Responsive modal width */
	.modal-card {
		width: 90%; /* Mobile default */
		max-width: 100%;
	}

	@media screen and (min-width: 769px) {
		.modal-card {
			width: 75%; /* Tablet */
		}
	}

	@media screen and (min-width: 1024px) {
		.modal-card {
			width: 30%; /* Desktop */
			min-width: 300px; /* Prevent too narrow */
		}
	}
</style>

<!-- TODO: This should be placed in app.scss -->
<!-- <style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}
	h1 {
		text-transform: uppercase;
		font-size: 2rem;
		font-weight: 200;
		margin: 2rem auto;
		max-width: 30rem;
	}

	h2 {
		font-size: 1rem;
		font-weight: 250;
		margin: 2rem auto;
		max-width: 30rem;
	}

	h2 strong {
		font-weight: 500;
	}

	p {
		max-width: 14rem;
	}

	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}

		p {
			max-width: none;
		}
	}
</style> -->
