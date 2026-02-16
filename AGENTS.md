# Copilot Instructions

## Commands

- **Dev server:** `npm start` (port 5173)
- **Build:** `npm run build` (outputs to `dist/analog/`)
- **Test (all):** `npm run test` (Vitest, runs in watch mode)
- **Test (single file):** `npx vitest run src/app/app.spec.ts`
- **Test (by name):** `npx vitest run -t "test name"`

## Architecture

This is an **Analog** (Angular meta-framework) app with SSR and static prerendering, built with Vite.

### File-based routing

Pages live in `src/app/pages/` and map to routes by filename:

- `index.page.ts` → `/`
- `videos.page.ts` → `/videos`
- `blog/[slug].page.ts` → `/blog/:slug` (dynamic param)

### Server API routes

API endpoints live in `src/server/routes/` and use `h3` event handlers:

```ts
// src/server/routes/api/v1/hello.ts → GET /api/v1/hello
import { defineEventHandler } from 'h3';
export default defineEventHandler(() => ({ message: 'Hello World' }));
```

### Blog content

Markdown files in `src/content/blog/` with YAML frontmatter (`title`, `date`, `excerpt`, `tags`). Loaded via `@analogjs/content` using `injectContentFiles<BlogPost>()` for lists and `injectContent()` for single posts. Rendered with `<analog-markdown>` and Prism syntax highlighting.

### Prerendering

Static routes are listed explicitly in `vite.config.ts` under `analog({ prerender: { routes } })`.

## Conventions

### Components

- **Standalone only** — no NgModules
- **Single-file** — inline `template` and optional `styles` in the `.ts` file
- **Signals over observables** — use `signal()`, `computed()`, `toSignal()` for state; avoid raw RxJS subscriptions in components
- **`inject()` function** — use functional injection, not constructor injection
- Component file naming: `name.component.ts`; page file naming: `name.page.ts`

### Project structure

- `src/app/components/` — reusable UI components
- `src/app/pages/` — route pages (Analog file-based routing)
- `src/app/services/` — injectable services (`providedIn: 'root'`)
- `src/app/config/` — static configuration (navigation items, social links, site metadata)
- `src/app/types/` — shared TypeScript interfaces
- `src/styles/tokens.css` — design tokens (colors, spacing, shadows, transitions)

### Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (not PostCSS)
- `@tailwindcss/typography` for prose styling on markdown content
- Design tokens defined in `src/styles/tokens.css`, imported in `src/styles.css`
- Dark theme by default with custom `primary` and `gray` color scales in `tailwind.config.js`

### Testing

- Vitest with `jsdom` environment
- Test files colocated with source: `*.spec.ts`
- Setup file: `src/test-setup.ts`
