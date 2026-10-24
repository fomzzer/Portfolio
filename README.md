# Portfolio

Personal portfolio of a full-stack web developer. Black liquid-glass design, smooth motion, case studies, command palette and a working contact form.

## Stack

- **Next.js 16** (App Router, React 19, Server Actions, static generation)
- **TypeScript**, **Tailwind CSS v4**
- **Motion** for animations, **Lenis** for smooth scrolling, **cmdk** for the ⌘K palette
- **Resend** + **Zod** for the contact form
- **Vercel Analytics** & **Speed Insights**

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Content

The site is available in English, Bulgarian and Ukrainian (`/en`, `/bg`, `/uk`). Visiting `/` redirects by the saved language cookie or the browser language.

Texts live in `src/i18n/dictionaries` — `en.ts` defines the shape, `bg.ts` and `uk.ts` must match it (TypeScript enforces this). Language-independent data lives in `src/content`:

| File | What it holds |
| --- | --- |
| `profile.ts` | Email, socials, CV path, timezone, stat values |
| `projects.ts` | Slugs, links, stack, year, status, metric values (`cover` accepts an image path from `public/`) |
| `experience.ts` | Periods and tags |
| `stack.ts` | Tech items and marquee |

Put your CV at `public/cv.pdf` and project screenshots in `public/projects/`.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO, sitemap and OG images |
| `RESEND_API_KEY` | Resend API key for the contact form |
| `CONTACT_TO_EMAIL` | Inbox that receives messages |
| `CONTACT_FROM_EMAIL` | Sender address on a verified Resend domain |

## Deploy

Import the repository in Vercel, add the environment variables and deploy.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
