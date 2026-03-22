<script>
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';

	let isMenuActive = $state(false);

	function toggleMenu() {
		isMenuActive = !isMenuActive;
	}
	
	function closeMenu() {
		isMenuActive = false;
	}
</script>

<nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<!-- Hamburger menu (Left upper corner) -->
		<!-- We use `ml-0` to override the default Bulma margin that pushes it to the right -->
		<button
			class="navbar-burger ml-0 {isMenuActive ? 'is-active' : ''}"
			aria-label="menu"
			aria-expanded={isMenuActive ? 'true' : 'false'}
			onclick={toggleMenu}
		>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</button>

		<!-- Application logo linked to home -->
		<a class="navbar-item" href="/" onclick={closeMenu}>
			<img src="/icon.svg" alt="Application Logo" />
		</a>
	</div>

	<div class="navbar-menu {isMenuActive ? 'is-active' : ''}">
		<div class="navbar-start">
			<a class="navbar-item" href="/about" onclick={closeMenu}>
				About
			</a>

			<a class="navbar-item" href="/configuration" onclick={closeMenu}>
				Configuration
			</a>
		</div>

		<div class="navbar-end">
			<div class="navbar-item">
				<LanguageSwitcher />
			</div>
		</div>
	</div>
</nav>

<style>
	/* Make sure the logo and burger align nicely since the burger is now on the left */
	.navbar-brand {
		align-items: center;
	}
</style>
