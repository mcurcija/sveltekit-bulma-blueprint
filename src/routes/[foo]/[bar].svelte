<script context="module" lang="ts">
	export async function load({ params, session }) {
		console.log('loading with session user: ' + JSON.stringify(session.user));
		console.log('loading with params: ' + JSON.stringify(params));

		return {
			props: {
				foo: params.foo,
				bar: params.bar
			}
		};
	}
</script>

<script lang="ts">
	// initially will be set on server side
	export let foo: string;
	export let bar: string;
</script>

<div class="container">
	<hi>{foo}/{bar}</hi>
</div>
