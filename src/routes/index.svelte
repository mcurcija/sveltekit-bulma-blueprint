<script lang="ts">
	const DEFAULT_NUMBERS = [1, 2, 3];
	let numbers = DEFAULT_NUMBERS;
	let loading: boolean;

	function reset() {
		numbers = DEFAULT_NUMBERS;
	}

	function addNumber() {
		// numbers.push(numbers.length + 1);
		numbers = [...numbers, numbers[numbers.length - 1] + 1];
	}

	async function addRandomNumber() {
		loading = true;
		var response = await fetch('/api/random').then((response) => {
			return response.json();
		}).finally(() =>  loading = false);
		// var random = Math.floor(Math.random() * 1000);
		numbers = [...numbers, response?.random];
	}

	$: sum = numbers.reduce((t, n) => t + n, 0);
</script>

<svelte:head>
	<title>SvelteKit Bulma Demo</title>
</svelte:head>

<div class="container section">
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
						on:click={addNumber}
						title="Add following number">Next</button>
					<button
						class="control button is-light is-warning"
						disabled={loading}
						on:click={addRandomNumber}
						title="Add random number">Random</button>
					<span class="control icon" class:is-loading={loading}>
					</span>
				</p>
			</div>
		</nav>
	</div>
	<div class="container has-text-centered">
		{numbers.join(' + ')} = {sum}
	</div>
	<div class="section has-text-centered">
		<button class="button is-light is-danger" on:click={reset}>
			<span class="icon">
				<i class="mdi mdi-refresh" />
			</span>
			<span>Reset</span>
		</button>
	</div>
	<footer class="footer">
		<div class="has-text-centered">
			<a href="https://kit.svelte.dev">SveleKit</a>
			<span>|</span>
			<a href="https://bulma.io">bulma.io</a>
		</div>
	</footer>
</div>

<!-- TODO this should be placed in app.scss -->
<style>
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
</style>
