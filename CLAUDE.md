# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ReactDemo is a React playground/demo app showcasing various React patterns, browser APIs, and state management approaches. It contains 60+ independent demo components, each in its own directory under `src/components/`.

## Commands

- `yarn dev` — Start dev server on port 15002 (HTTP)
- `yarn devs` — Start dev server with HTTPS
- `yarn build` — Rsbuild production build to `./dist`
- `yarn preview` — Preview the production build locally
- `yarn serve` — Serve production build locally
- No test runner is configured

## Architecture

**Entry flow:** `src/main/index.js` → `src/bootstrap.js` → `src/view.jsx` → mounts to `<div id="app">`

Rsbuild uses `src/main/index.js` as the entry and `src/html/index.html` as the HTML template. Existing static demo files under `src/` remain available through the dev server's public directory.

**Routing:** React Router v8 with `createBrowserRouter`. Routes defined in `src/router/index.jsx`. Code splitting uses `@loadable/component` via a HOC in `src/router/splitting/index.jsx`. The root route renders a navigation hub with `NavLink` + `Outlet`.

**State management (multiple approaches coexist):**
- **Redux** (primary): `src/store/index.js` with `redux-thunk` + `reselect`, wraps app in `<Provider>`
- **MobX**: `src/store/marketStore.ts` with `makeAutoObservable`, initialized directly in `view.jsx`
- **Zustand**: `src/components/zustand/`
- **Valtio**: `src/components/valtio/`

**Styling (multiple methods):**
- **SCSS** (primary): Global styles in `src/css/index.scss`
- **CSS Modules**: Enabled for `*.module.*` files and legacy `?module` imports
- **styled-components**: Used in Widget1, Widget2
- **Less**: Supported via the Rsbuild Less plugin

**Path aliases:**
- `@/*` → `./src/*` (both tsconfig and Rsbuild)
- `root/*` → `./*` (tsconfig only)

## Rsbuild Config

- `rsbuild.config.mjs` configures React, Sass, Less, SVG-to-React, CSS Modules, asset handling, and source maps.
- The dev server listens on port 15002, supports SPA history fallback, and proxies `/api` to `https://api.agora.io`.
- `yarn devs` enables the self-signed HTTPS plugin used by the original HTTPS development workflow.
- Production output uses Rsbuild's content-hashed chunks and copies `src/worker.js` for the web-worker demo.

## Code Conventions

- **Language mix:** Both JS (.js/.jsx) and TS (.ts/.tsx). TypeScript is transpiled by Rsbuild's SWC integration.
- **Prettier:** No semicolons, single quotes, trailing commas, 120 print width, 2-space indent
- **EditorConfig:** 2-space indent, LF line endings, UTF-8
- **Browserslist:** > 2%, last 2 versions, iOS >= 10, Android >= 5
- **No ESLint** is configured; Prettier is the only code quality tool

## Deployment

Dockerfile uses nginx with SPA `try_files` config and gzip. See `nginx.conf` for routing and compression settings.
