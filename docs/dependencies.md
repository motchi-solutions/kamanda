# Direct dependencies

This inventory matches `package.json`; `package-lock.json` records exact resolved versions. Install reproducibly with `npm ci`. Only direct dependencies are listed below. No animation library is used.

## Runtime dependencies

| Package       | Declared version | Purpose and use                                                                             | Configuration notes                                                                                                                      |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `next`        | `16.3.6`         | App Router, server rendering, routes/proxy, metadata, Image/Link/font APIs throughout `src` | `next.config.ts`; read installed version-matched docs. Requires Node >=20.9.0.                                                           |
| `react`       | `19.2.8`         | Server/client component model, hooks in mobile menu, nav links, reveals, counters           | React Compiler enabled by Next.js configuration.                                                                                         |
| `react-dom`   | `19.2.8`         | Next.js-managed DOM rendering and hydration                                                 | Keep compatible with React; no custom DOM root is created.                                                                               |
| `react-icons` | `^5.7.0`         | Lucide interface icons in mobile navigation, service links, About link, and contact CTA     | Named imports from `react-icons/lu`; one outline family, decorative icons hidden from accessibility APIs. Brand assets remain unchanged. |

## Development/build dependencies

These packages are needed for development, checking, or production compilation, rather than being application runtime libraries. Make them available during the deployment build stage.

| Package                       | Declared version | Purpose and use                                               | Configuration notes                                                                                                    |
| ----------------------------- | ---------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `typescript`                  | `^5`             | Type checking for source/configuration                        | `tsconfig.json`: strict, noEmit, bundler resolution, `@/*` alias. Next.js performs type checking in production builds. |
| `@types/node`                 | `^20`            | Node/process typings for site configuration and build tooling | Compile-time definitions; not the installed Node runtime version.                                                      |
| `@types/react`                | `^19`            | React components, props, hooks, and JSX types                 | Used across TSX files; align with React major.                                                                         |
| `@types/react-dom`            | `^19`            | React DOM type definitions for the React/Next.js toolchain    | Compile-time only; align with React DOM major.                                                                         |
| `tailwindcss`                 | `^4`             | Utility CSS and brand theme processing                        | Imported in `src/app/globals.css`; CSS-first `@theme inline`; no Tailwind config file.                                 |
| `@tailwindcss/postcss`        | `^4`             | Tailwind's PostCSS integration                                | Enabled in `postcss.config.mjs`.                                                                                       |
| `eslint`                      | `^9`             | Source linting via `npm run lint`                             | Flat config in `eslint.config.mjs`.                                                                                    |
| `eslint-config-next`          | `16.3.6`         | Next.js Core Web Vitals and TypeScript lint rules             | Imported by ESLint config; keep aligned with Next.js version.                                                          |
| `babel-plugin-react-compiler` | `1.0.0`          | Build-time React optimization                                 | Activated through `reactCompiler: true` in `next.config.ts`; no custom Babel config.                                   |

The existing `allowScripts` package metadata is preserved. Fonts are fetched by Next.js font tooling, not separate direct npm packages. Do not add dependencies without a concrete need; use npm to update the manifest and lockfile together.

## ESLint compatibility status

Checked September 28, 2026: ESLint 9 is end-of-life and npm reports a deprecation warning. ESLint 10.11.0 is the current release, but the latest `eslint-plugin-react` (7.37.5) and `eslint-plugin-import` (2.32.0), included by `eslint-config-next` 16.3.6, do not declare ESLint 10 peer compatibility. The project retains ESLint 9 pending compatible plugins; no forced peer overrides or rule removals are applied. This preserves working lint checks but does not resolve the upstream support warning. Recheck these plugin peer ranges before upgrading ESLint and validate with `npm run lint`. See [ESLint version support](https://eslint.org/version-support/).
