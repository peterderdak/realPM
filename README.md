# Real PM Jobs

Static editorial job board built with Astro, TypeScript, and Tailwind. The site is intentionally lightweight: file-based content, no backend, and GitHub Pages deployment via GitHub Actions.

## Local development

Use Node `22.12.0` from [`.nvmrc`](./.nvmrc).

```bash
nvm use
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## How to add a new job

Add a new YAML entry under [`src/content/jobs`](./src/content/jobs).

Each job file follows the schema in [`src/content/config.ts`](./src/content/config.ts). The most important fields are:

- `title`
- `company`
- `slug`
- `location`
- `remote`
- `level`
- `archetype`
- `stage`
- `applyUrl`
- `summary`
- `whyItMadeBoard`
- `outcomesOwned`
- `decisionRights`
- `discoveryModel`
- `teamTopology`
- `strategyScope`
- `unknowns`
- `reviewedAt`
- `confidence`
- `featured`
- `draft`

Set `draft: false` to publish the job. The `/jobs` index and `/jobs/[slug]` pages are generated automatically from the collection.

## How to edit page copy

Editorial page metadata lives in [`src/content/editorial-pages`](./src/content/editorial-pages).

The page layouts and structured copy live in:

- [`src/pages/index.astro`](./src/pages/index.astro)
- [`src/pages/jobs.astro`](./src/pages/jobs.astro)
- [`src/pages/what-makes-a-pm-role-real.astro`](./src/pages/what-makes-a-pm-role-real.astro)
- [`src/pages/for-employers.astro`](./src/pages/for-employers.astro)
- [`src/pages/methodology.astro`](./src/pages/methodology.astro)

Shared branding, navigation, and the employer submission placeholder link live in [`src/data/site.ts`](./src/data/site.ts).

## GitHub Pages deployment

GitHub Pages deployment runs through [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

This repo is configured as a project site for:

- GitHub username: `peterderdak`
- Repository name: `realPM`

That means Astro builds with the base path `/realPM`, and the deployed site URL will be:

- `https://peterderdak.github.io/realPM/`

Deployment flow:

1. Push to `main`.
2. GitHub Actions builds the site.
3. The workflow deploys the contents of `dist/` to GitHub Pages.

## Current placeholders to replace

- [`src/data/site.ts`](./src/data/site.ts): `employerSubmissionHref` placeholder mailto link
