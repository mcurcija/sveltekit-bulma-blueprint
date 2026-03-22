<script>
	import 'bulma/css/bulma.css';
	import '../app.css';
	import { TolgeeProvider } from '@tolgee/svelte';
	import { createTolgee } from '$lib/i18n';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();

	const tolgee = createTolgee();

	// Sync lang attribute
	$effect(() => {
		document.documentElement.lang = tolgee.getLanguage() || 'en';
	});
</script>

<svelte:head>
        <title>SvelteKit + Bulma Demo</title>
        <meta name="description" content="SvelteKit + Bulma Demo" />
</svelte:head>

<TolgeeProvider {tolgee}>
	<div slot="fallback">Loading...</div>
	<Navbar />
	<main>
		{@render children()}
	</main>
</TolgeeProvider>
