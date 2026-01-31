# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Prerequisites

This project uses `.nvmrc` to ensure the correct Node.js version is used.
It also uses `pnpm` for package management.

```bash
# use the correct node version
nvm use

# install pnpm if you haven't already
npm install -g pnpm
```

## Developing

Once you've installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## TODO

Just a simple test.