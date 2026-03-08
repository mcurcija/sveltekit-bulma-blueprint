<script>
	import 'bulma/css/bulma.css';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
        <title>SvelteKit + Bulma Demo</title>
        <meta name="description" content="SvelteKit + Bulma Demo" />
</svelte:head>

<main>
	{@render children()}
</main>
