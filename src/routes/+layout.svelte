<script>
	import 'bulma/css/bulma.css';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
        <title>Sveltekit + Bulma Demo</title>
        <meta name="description" content="Sveltekit + Bulma Demo" />
</svelte:head>

{@render children()}
