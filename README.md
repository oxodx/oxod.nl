# oxod.nl

My developer portfolio. A single-page dark-themed site built with modern tooling — React, TypeScript, Vite, and Tailwind CSS.

## Stack

- [React 19](https://react.dev) with the [React Compiler](https://react.dev/learn/react-compiler)
- [Vite](https://vitejs.dev) + [Tailwind CSS v4](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- TypeScript, pnpm, ESLint 9 (flat config)

## Getting started

```sh
pnpm install
pnpm dev
```

## Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `pnpm dev`      | Start the dev server with HMR        |
| `pnpm build`    | Build for production into `dist/`    |
| `pnpm preview`  | Preview the production build         |
| `pnpm lint`     | Run ESLint                           |
| `pnpm lint:fix` | Run ESLint and auto-fix issues       |
| `pnpm typecheck`| Run `tsc --noEmit`                   |

## Project structure

```
src/
  components/   UI components and page sections
  data/         Content: user, stack, projects
  pages/        Route-level pages
  types/        Shared TypeScript types
```

Most content lives in `src/data/` — edit `user.ts`, `stack.ts`, or `projects.ts` to update your profile, tech stack, and project list without touching component code.

## Deployment

On push to `main`, the [deploy workflow](.github/workflows/deploy.yml) runs `pnpm typecheck`, `pnpm lint`, and `pnpm build` (via [build.yml](.github/workflows/build.yml)), then publishes `dist/` to GitHub Pages.

## License

[MIT](LICENSE)