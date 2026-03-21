# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses `pnpm` for package management.

### Development
- **Run the development server**: `pnpm run dev`
- **Build the project**: `pnpm run build`
- **Preview the production build**: `pnpm run preview`

### Formatting & Linting
- **Format code**: `pnpm run format` (uses Prettier)
- **Lint code**: `pnpm run lint` (runs Prettier check and ESLint)
- **Check Svelte types**: `pnpm run check` (runs svelte-check)

### Testing
- **Run all unit tests**: `pnpm run test:unit` (uses Vitest)
- **Run all unit tests (single run)**: `pnpm run test`

### Internationalization (Tolgee)
- **Pull translations**: `pnpm run i18n:pull`
- **Push translations**: `pnpm run i18n:push`

## Code Architecture and Structure

This is a SvelteKit project using Svelte 5 (`$state`, `$derived`, `$effect`, `{@render children()}` syntax). It integrates Bulma for CSS styling and Tolgee for internationalization.

- **`src/routes/+layout.svelte`**: The root layout file. It imports Bulma CSS, global app CSS, and initializes the Tolgee i18n provider (`<TolgeeProvider>`). It sets the `lang` attribute on the HTML document dynamically based on the current Tolgee language. It also renders the `<LanguageSwitcher>` component.
- **`src/routes/+page.svelte`**: The main demo page showcasing Svelte 5 runes (`$state`, `$derived`) for state management, Tolgee for translations (`$t`), and Bulma for styling. It includes interactive elements like adding numbers, fetching random numbers from an API, and a Bulma modal for confirming a reset action.
- **`src/lib/`**: Contains shared code.
  - **`src/lib/components/`**: Svelte components, including the `LanguageSwitcher.svelte`.
  - **`src/lib/i18n/`**: Tolgee configuration and initialization logic.
- **Styling**: Uses Bulma classes extensively for layout, typography, and components (buttons, modals). Additional styles are either in `src/app.css` or scoped within Svelte components. FontAwesome is available for icons.
- **State Management**: Uses Svelte 5 runes (`$state`, `$derived`, `$effect`) rather than the older `let x; $: ...` reactive statements.
- **Adapter**: Configured with `@sveltejs/adapter-auto`. If deploying to a specific environment, this may need to be changed in `svelte.config.js`.
