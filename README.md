<div align="center">
  <h1>shadcn blog</h1>
  <p>A full-stack blog built with Next.js 15 + Payload CMS, shipping auth, comments, search, RSS, and email templates out of the box.</p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black" alt="Next.js 15" />
    <img src="https://img.shields.io/badge/React-19-61dafb" alt="React 19" />
    <img src="https://img.shields.io/badge/Database-PostgreSQL-336791" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/CMS-Payload-blueviolet" alt="Payload CMS" />
  </p>
</div>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quickstart](#quickstart)
- [Core Modules](#core-modules)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Routes & APIs](#routes--apis)
- [Developer Notes](#developer-notes)

## Overview

- Frontend uses Next.js App Router with Tailwind + shadcn, and fumadocs layout pieces for navigation, pagination, and search.
- Content is managed by Payload CMS (`payload.config.ts`), supporting rich text, tags, cover images, and publish states.
_- Authentication via better-auth (Google/GitHub), sessions and comments stored in Postgres through Drizzle ORM._
- Comments are powered by `@fuma-comment`, and the site generates both `/rss.xml` feeds and `/api/search` indexes.

## Features

- Post management: Payload admin (`/admin`) creates drafts/published posts with cover image, tags, and scheduled publish time.
- Blog UX: paginated lists, tag hub, rich post detail rendering, share button, one-click copy link.
- Social & interaction: Google/GitHub login, better-auth session management, Fuma Comment stored locally.
- Enhancements: RSS feed, on-the-fly search index, automatic Open Graph/OG banners, sitemap via `next-sitemap`.
- Email template: `emails/newsletter-welcome.tsx` using React Email + Tailwind, ready for Resend.
- Ops-friendly: `.env` validation, `start-database.sh` to boot local Postgres, unified Drizzle/Payload scripts for schema.

## Tech Stack

<table>
  <tr>
    <th>Area</th>
    <th>Choice</th>
    <th>Notes</th>
  </tr>
  <tr>
    <td>Framework</td>
    <td>Next.js 15 (App Router)</td>
    <td>Server Components with hybrid static/dynamic rendering</td>
  </tr>
  <tr>
    <td>UI</td>
    <td>Tailwind CSS 4 + shadcn + fumadocs-ui</td>
    <td>Navigation, pagination, sections, theming</td>
  </tr>
  <tr>
    <td>Content</td>
    <td>Payload CMS</td>
    <td>Posts/Users/Media collections, Lexical rich text</td>
  </tr>
  <tr>
    <td>Data</td>
    <td>PostgreSQL + Drizzle ORM</td>
    <td>Auth and comments tables (prefix <code>blog_*</code>)</td>
  </tr>
  <tr>
    <td>Auth</td>
    <td>better-auth + OAuth (Google/GitHub)</td>
    <td>Social login, sessions, extra role field</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>Resend + React Email</td>
    <td>Welcome template, Tailwind styling</td>
  </tr>
</table>

## Quickstart

1) Install toolchain  
   - Node 20+ recommended, use `pnpm` (locked by `pnpm-lock.yaml`).
2) Set environment variables  
   - Copy `.env.example` to `.env`; fill `DATABASE_URL`, `PAYLOAD_SECRET`, `BETTER_AUTH_SECRET`, and OAuth keys if needed.
3) Start Postgres locally  
   - `./start-database.sh` (Docker/Podman) or your own Postgres instance.
4) Install deps and build schema  
   - `pnpm install`  
   - `pnpm db:generate && pnpm db:migrate` (Drizzle auth/comments tables)  
   - `pnpm payload:migrate` (Payload CMS tables)
5) Run dev server  
   - `pnpm dev` (default :3000; Payload Admin `/admin`, blog `/`).
6) Optional extras  
   - `pnpm payload:generate` (types)  
   - `pnpm email:dev -p 3001` (preview email template).

> In development, Payload pre-fills `admin@example.com` / `admin123` on the login form.

## Core Modules

- Content model: `payload.config.ts` defines Posts/Users/Media with cover uploads, tag arrays, publish time, and status.
- Data fetching: `src/lib/payload-posts.ts` wraps post queries, tag stats, pagination, and slug helpers for pages.
- Pages & layout: `src/app/(main)` hosts the site; `_components` includes Hero, CTA, and post list UI.
- Auth & comments: `src/server/auth` (better-auth + Drizzle) and `src/server/comments` storing into `blog_comments` tables.
- Search & feed: `src/app/(main)/api/search/route.ts` builds indexes; `src/app/(main)/rss.xml/route.ts` emits Atom/RSS.
- Email: `emails/newsletter-welcome.tsx` React Email template that accepts a posts array.

Project structure (excerpt):

```text
src/
├── app/
│   ├── (main)/(home)/page.tsx               # Home: hero, recent posts, CTA
│   ├── (main)/(home)/posts/[slug]/page.tsx  # Post detail + comments + share
│   ├── (main)/(home)/posts/page.tsx         # Paginated posts list
│   ├── (main)/(home)/tags/page.tsx          # Tag hub
│   ├── (main)/api/search/route.ts           # Search index API
│   ├── (main)/rss.xml/route.ts              # Atom/RSS feed
│   └── (payload)/admin/...                  # Payload CMS admin
├── lib/                                     # Data + utilities (payload-posts, metadata, auth-client)
├── server/                                  # better-auth + Drizzle schema + comment storage
└── emails/                                  # React Email templates
```

## Environment Variables

<details>
<summary>Required & optional</summary>

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Postgres connection string, e.g. `postgresql://user:pass@localhost:5432/blog` |
| `PAYLOAD_SECRET` | Secret used by Payload CMS for JWT |
| `BETTER_AUTH_SECRET` | better-auth session secret |
| `BETTER_AUTH_URL` | Auth callback base (local: `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Required if enabling Google login |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Required if enabling GitHub login |
| `RESEND_API_KEY` / `RESEND_AUDIENCE_ID` / `EMAIL_FROM` | Required for sending emails |
| `NEXT_PUBLIC_SERVER_URL` | Base URL for links/OG/RSS |
| `NEXT_PUBLIC_UMAMI_URL` / `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Optional analytics |

</details>

## Scripts

- `pnpm dev`: Start Next.js dev server (includes Payload routes).
- `pnpm build` / `pnpm preview`: Build and preview production.
- `pnpm db:generate` / `pnpm db:migrate`: Generate and run Drizzle migrations (auth/comments).
- `pnpm payload:migrate`: Sync Payload CMS tables.
- `pnpm lint` / `pnpm format`: Quality and formatting checks (biome).
- `pnpm email:dev`: Preview React Email templates locally.

## Routes & APIs

- `/`: Home with hero, latest posts, CTA.
- `/posts`: Paginated posts; `/posts/[slug]`: detail with rich text, comments, share.
- `/tags`: Tag cloud with counts.
- `/login`: Google/GitHub login entry.
- `/admin`: Payload CMS admin.
- `/api/search`: Search index endpoint (fumadocs search).
- `/rss.xml`: Atom/RSS feed.

## Developer Notes

- Prefer `./start-database.sh` to boot Postgres locally; the script warns if the port is in use.
- Auth/comment tables use the `blog_` prefix—keep `drizzle.config.ts` `tablesFilter` in sync.
- Payload dev mode pre-fills `admin@example.com` / `admin123` to speed up admin login.
- If you only need to browse the UI without real data, set `SKIP_ENV_VALIDATION=1` and disable features needing external services; full env is recommended for complete coverage.
