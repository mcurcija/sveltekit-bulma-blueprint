<script lang="ts">
	const DEFAULT_NUMBERS = [1, 2, 3];

	let numbers = $state(DEFAULT_NUMBERS);
	let sum = $derived(numbers.reduce((t, n) => t + n, 0));

	let loading: boolean = $state(false);

	function reset() {
		numbers = DEFAULT_NUMBERS;
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
	<title>SvelteKit + Bulma Demo</title>
</svelte:head>

<div class="section content">
	<h1 class="title has-text-centered">SvelteKit + Bulma</h1>

	<h2 class="has-text-centered">
		Sample website with <strong>SvelteKit</strong> and <strong>Bulma</strong>
	</h2>
	<div class="section">
		<nav class="level has-text-centered">
			<div class="level-item">
				<p class="field">
					<button
						class="control button is-light is-info"
						onclick={addNumber}
						title="Add following number">Next</button
					>
					<button
						class="control button is-light is-warning"
						class:is-loading={loading}
						disabled={loading}
						onclick={addRandomNumber}
						title="Add random number">Random</button>
					</p>
			</div>
		</nav>
	</div>
	<div class="container has-text-centered">
		{numbers.join(' + ')} = {sum}
	</div>
	<div class="section has-text-centered">
		<button class="button is-light is-danger" onclick={reset}>
			<span class="icon has-text-info">
				<i class="fas fa-arrows-rotate"></i>
			</span>
			<span>Reset</span>
		</button>
	</div>
</div>
<footer class="footer">
	<div class="has-text-centered">
		<a href="https://kit.svelte.dev">SveleKit</a>
		<span>|</span>
		<a href="https://bulma.io">bulma.io</a>
	</div>
</footer>

<!-- TODO this should be placed in app.scss -->
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
