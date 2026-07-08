# Cedar Lux — Next.js SEO Migration Plan

> **For agentic workers:** Use superpowers:subagent-driven-development or superpowers:executing-plans to implement task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Rebuild cedarluxproperties.com as a Next.js App Router site so every page (home, about, collection, contact, Emerald Bay, Cedar Creek Lake, and each property) is a real, server-rendered, individually indexable URL with correct per-page metadata and JSON-LD.

**Architecture:** Next.js 15 App Router. Marketing/community pages are statically generated (SSG). Property detail pages are generated per-property from Supabase via `generateStaticParams` with ISR revalidation so admin edits propagate. Existing React components are ported nearly as-is (mark interactive ones `'use client'`); state-based `view` switching is replaced by file-based routes. The 5 existing Vercel serverless handlers are ported to Next route handlers under `app/api/`. Verification is build success + initial-HTML content assertions (the SEO proof) + visual parity screenshots — this codebase has no unit tests and the migration's whole point is server-rendered HTML.

**Tech Stack:** Next.js 15, React 18, TypeScript, Tailwind (real build, replacing the CDN), `next/font` (Cinzel, Playfair Display, Plus Jakarta Sans), `next/image`, `@supabase/supabase-js`, `@google/genai` (AI consultant), `lucide-react`.

---

## Why (SEO rationale)

Current site is a Vite SPA where every "page" is React `view` state at one URL (`/`). Crawlers receive ~0.1KB of HTML — no content, and nothing to rank beyond the homepage. The per-view titles/descriptions/JSON-LD the app already computes run client-side in `useEffect`, so crawlers never see them. This migration exposes that already-written content as real HTML at real URLs. The largest untapped lever is **one indexable page per property/home** — the highest-intent real-estate search surface.

## Route map

| Route | Source (current) | Rendering | Key metadata |
|---|---|---|---|
| `/` | `App.tsx` `view==='home'` | SSG (ISR) | Home title/desc + `HomeAndConstructionBusiness` JSON-LD |
| `/about` | `view==='about'` | SSG | About title/desc |
| `/collection` | `view==='listings'` | SSG (ISR) | Collection title/desc + `ItemList` of properties |
| `/contact` | `view==='contact'` | SSG | Contact title/desc |
| `/emerald-bay` | `EmeraldBayPage` | SSG | Emerald Bay title/desc + `WebPage`+breadcrumb |
| `/cedar-creek-lake` | `CedarCreekLakePage` | SSG | Cedar Creek title/desc + `WebPage`+breadcrumb |
| `/properties/[slug]` | `PropertyDetailsModal` content | SSG per property (ISR) | Per-property title/desc + `Product`/`RealEstateListing` JSON-LD |
| `/admin` | `view==='admin'` (#admin hash) | client-only, `noindex` | — |
| `/api/*` | `api/*.ts` (@vercel/node) | route handlers | — |

Slug strategy: no `slug` column exists. Add `lib/slug.ts` → `slugify(title)`; `generateStaticParams` maps each property to its slug; on collision append last 4 chars of `id`. Property pages remain reachable from `/collection` cards (link) and keep the existing modal as a fast preview, but the canonical indexable surface is `/properties/[slug]`.

## File structure

- `app/layout.tsx` — root layout, fonts, global Tailwind, default metadata, nav + footer (server), analytics injection.
- `app/(marketing)/{page,about,collection,contact,emerald-bay,cedar-creek-lake}` — route pages.
- `app/properties/[slug]/page.tsx` — property detail + `generateStaticParams` + `generateMetadata`.
- `app/admin/page.tsx` — `'use client'`, `noindex`, ported CMS.
- `app/api/{submit-contact,admin/verify,admin/settings,admin/properties,admin/upload-url}/route.ts` — ported handlers.
- `components/*` — ported PropertyCard, PropertyDetailsModal, ContactForm, EmeraldBayPage, CedarCreekLakePage, PropertyAdmin, AIConsultant, Nav, Footer.
- `lib/{supabase-server,supabase-client,slug,site-data,metadata}.ts` — data + helpers.
- `lib/site-data.ts` — `getSettings()` / `getProperties()` server-side fetchers (cached, `revalidate`).
- `tailwind.config.ts` — port custom tokens: `lake #0c1c2c`, `luxury-gold #c5a059`, serif/sans families, animations from `index.html <style>`.
- `next.config.ts` — image `remotePatterns` for Supabase storage + vrbo/media hosts; `revalidate` defaults.
- `app/sitemap.ts` + `app/robots.ts` — generated from routes + Supabase properties (replaces static files).

---

## Task 1: Scaffold Next.js alongside the Vite app

**Files:** `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx` (placeholder).

- [ ] Add deps: `next@15`, `tailwindcss`, `postcss`, `autoprefixer`, `@tailwindcss/postcss` (or v3 setup), `sharp`. Keep react 18.
- [ ] Add scripts: `"dev": "next dev"`, `"build": "next build"`, `"start": "next start"`. Preserve Vite scripts as `vite:dev`/`vite:build` until cutover.
- [ ] `tailwind.config.ts`: port `lake`, `luxury-gold` colors, `serif`/`sans` font vars, and keyframes (`pageFadeIn`, `heroFadeUp`, `menuSlideIn`, modal anims) from `index.html`.
- [ ] `app/globals.css`: `@tailwind` directives + the reduced-motion + `#root:empty` loader equivalents. Register fonts via `next/font` in layout (CSS vars `--font-serif`, `--font-sans`, `--font-cinzel`).
- [ ] Placeholder `app/page.tsx` returns `<h1>Cedar Lux</h1>`.
- [ ] **Verify:** `npm run build` succeeds; `npm run dev` serves `/`; `curl -s localhost:3000 | grep -c "Cedar Lux"` ≥ 1.
- [ ] **Commit:** `chore: scaffold next.js app alongside vite`

## Task 2: Server data layer

**Files:** `lib/supabase-server.ts`, `lib/supabase-client.ts`, `lib/site-data.ts`, `lib/slug.ts`.

- [ ] `supabase-server.ts`: server client from `SUPABASE_URL` + `SUPABASE_ANON_KEY` (mirror existing `services/supabaseClient.ts` envs; confirm names in Vercel).
- [ ] `site-data.ts`: `getSettings()` (settings row id=1, merge over `DEFAULT_SETTINGS` from `constants`) and `getProperties()` (order by `created_at` desc). Wrap in `unstable_cache`/`fetch` with `revalidate: 300`. Fall back to `INITIAL_PROPERTIES`/`DEFAULT_SETTINGS` on error (so prerender always has content — matches current behavior).
- [ ] `slug.ts`: `slugify(title)` (lowercase, strip non-alnum → dashes); `propertySlug(p)` appends `id.slice(-4)` on demand; `findBySlug(props, slug)`.
- [ ] **Verify:** temporary script/route logs `getProperties()` length > 0 against live Supabase.
- [ ] **Commit:** `feat: server-side supabase data layer + slug helpers`

## Task 3: Root layout — nav, footer, fonts, metadata base

**Files:** `app/layout.tsx`, `components/Nav.tsx`, `components/Footer.tsx`.

- [ ] Port nav (logo + Home/About/Collection/Contact) and footer (adds Emerald Bay + Cedar Creek Lake links) from `App.tsx:269-303,875-900`. Replace `onClick={()=>setView(x)}` with `<Link href="/...">`. Mobile menu stays `'use client'` in a small `NavClient` island; the rest is server.
- [ ] Root `metadata`: default title template `%s | Cedar Lux Properties`, description, `metadataBase`, canonical, OG/Twitter. Nav pulls `logoImage`/`companyName` from `getSettings()`.
- [ ] Inject `settings.externalScripts` (analytics) via `next/script` in layout.
- [ ] **Verify:** `curl` any route shows nav + footer links as real `<a href>`; `<title>` present in raw HTML.
- [ ] **Commit:** `feat: root layout with nav, footer, fonts, base metadata`

## Task 4: Home route

**Files:** `app/page.tsx`, `components/PropertyCard.tsx`.

- [ ] Move home JSX (`App.tsx:305-409`) into `app/page.tsx` (server). Fetch `settings` + `properties`; compute `homeFeatured` (starred ≤3, fallback newest 3) server-side.
- [ ] Port `PropertyCard`; swap "View Details" from modal-open to `<Link href={/properties/${slug}}>` (keep an onClick preview modal as progressive enhancement in a client wrapper later). Use `next/image` for card images.
- [ ] `generateMetadata`: home title/description from `App.tsx:113-116`. Add `HomeAndConstructionBusiness` JSON-LD via a `<script type="application/ld+json">` in the page.
- [ ] `export const revalidate = 300`.
- [ ] **Verify:** `curl -s <url>/ | grep "Featured Properties"` and property titles present in raw HTML; JSON-LD block present. Screenshot vs current home for parity.
- [ ] **Commit:** `feat: home route (SSG) with real content + JSON-LD`

## Task 5: About, Contact routes

**Files:** `app/about/page.tsx`, `app/contact/page.tsx`, `components/ContactForm.tsx`.

- [ ] About: port `App.tsx:412-507` (mostly static prose — great SEO text). Server component. `generateMetadata`.
- [ ] Contact: port `App.tsx:753-807`. `ContactForm` becomes `'use client'` (it posts to `/api/submit-contact` + GHL). Pass settings props from server page.
- [ ] **Verify:** About prose and Gary Payne quotes present in raw HTML; contact form renders; `generateMetadata` sets distinct titles.
- [ ] **Commit:** `feat: about + contact routes`

## Task 6: Collection route

**Files:** `app/collection/page.tsx`.

- [ ] Port listings (`App.tsx:629-751`): featured banner + grouped sections (Homes/Lots/Floor Plans). Server-render all cards as links. The status `<select>` filter becomes a small client island (or a `?status=` searchParam server filter — prefer searchParam so filtered views are crawlable/shareable).
- [ ] `generateMetadata` + `ItemList` JSON-LD enumerating property URLs.
- [ ] `export const revalidate = 300`.
- [ ] **Verify:** all property titles + links present in raw HTML; each links to `/properties/<slug>`.
- [ ] **Commit:** `feat: collection route with itemlist schema`

## Task 7: Emerald Bay + Cedar Creek Lake routes

**Files:** `app/emerald-bay/page.tsx`, `app/cedar-creek-lake/page.tsx`, `components/EmeraldBayPage.tsx`, `components/CedarCreekLakePage.tsx`.

- [ ] Port both components. Replace `onContact`/`onEmeraldBay` callbacks with `<Link>`. Keep as server components if no state; otherwise isolate interactive bits.
- [ ] `generateMetadata` from `App.tsx:118-158` (titles/descriptions) + the `WebPage`+`BreadcrumbList` JSON-LD.
- [ ] **Verify:** community-page body copy present in raw HTML; breadcrumb JSON-LD present.
- [ ] **Commit:** `feat: emerald-bay + cedar-creek-lake community routes`

## Task 8: Property detail pages (the SEO payload)

**Files:** `app/properties/[slug]/page.tsx`, `components/PropertyDetails.tsx`.

- [ ] Extract the detail layout from `PropertyDetailsModal` into a full-page `PropertyDetails` (hero image/gallery, beds/baths/sqft or acres/waterfront, price, description, features, "Inquire" → `/contact`, external `listingUrl`).
- [ ] `generateStaticParams`: `getProperties()` → `{ slug }[]`. `generateMetadata({params})`: per-property title (`{title} | {neighborhood} | Cedar Creek Lake`), description from `property.description`, OG image = `property.image`.
- [ ] JSON-LD: `Product`/`RealEstateListing` with name, image, description, offers (price/availability from status), `areaServed`.
- [ ] `export const revalidate = 300`; `notFound()` when slug unmatched.
- [ ] Use `next/image` for hero + gallery.
- [ ] **Verify:** build emits one HTML file per property; `curl` a property URL shows its description + price in raw HTML + `Product` JSON-LD.
- [ ] **Commit:** `feat: per-property indexable pages with product schema`

## Task 9: Admin route + AI consultant

**Files:** `app/admin/page.tsx`, `components/PropertyAdmin.tsx`, `components/AIConsultant.tsx`.

- [ ] `app/admin/page.tsx`: `'use client'`, `export const metadata = { robots: { index:false } }`. Port login + `PropertyAdmin`. Preserve `x-admin-password` header flow to `/api/admin/*`.
- [ ] Port `AIConsultant` (uses `@google/genai` via `services/geminiService`) as client island where currently used.
- [ ] Drop the `#admin` hash mechanism (route replaces it); keep `/admin` unlinked in nav.
- [ ] **Verify:** `/admin` login works against ported API; `curl /admin` includes `noindex`.
- [ ] **Commit:** `feat: /admin route (noindex) + ai consultant`

## Task 10: Port API route handlers

**Files:** `app/api/submit-contact/route.ts`, `app/api/admin/{verify,settings,properties,upload-url}/route.ts`.

- [ ] Convert each `@vercel/node` `(req,res)` handler to Web `Request`→`Response` route handlers. Preserve: password check (`x-admin-password` / `ADMIN_PASSWORD`), Supabase writes, GHL contact submission, signed upload URL logic. Reuse `server/admin.ts` logic.
- [ ] Keep method semantics (properties: GET/POST/PUT/DELETE; settings: POST; verify: POST).
- [ ] **Verify:** admin CRUD + contact submit succeed end-to-end on preview deploy.
- [ ] **Commit:** `feat: port api handlers to next route handlers`

## Task 11: sitemap, robots, image domains

**Files:** `app/sitemap.ts`, `app/robots.ts`, `next.config.ts`. Delete `public/sitemap.xml`, `public/robots.txt` (interim static versions).

- [ ] `app/sitemap.ts`: static routes + `getProperties()` → `/properties/<slug>` entries with `lastModified`.
- [ ] `app/robots.ts`: allow all, disallow `/admin`, point to sitemap.
- [ ] `next.config.ts`: `images.remotePatterns` for Supabase storage host + `media.vrbo.com` + any settings image hosts.
- [ ] **Verify:** `/sitemap.xml` lists every property URL; `/robots.txt` disallows `/admin`.
- [ ] **Commit:** `feat: dynamic sitemap + robots + image domains`

## Task 12: Parity, preview, cutover

- [ ] Full `next build`; fix type/lint errors. Confirm all routes prerender (check build output for ○/● per route).
- [ ] Screenshot every route desktop+mobile vs current production; fix visual regressions (impeccable skill for any polish).
- [ ] Deploy preview on Vercel; run Search Console URL Inspection / view-source on preview to confirm server-rendered content per route.
- [ ] Point Vercel project framework preset to Next.js; remove Vite `vercel.json` catch-all rewrite; merge branch → main; verify production.
- [ ] Submit sitemap in Google Search Console; set up Google Business Profile (separate, no code).
- [ ] **Commit/PR:** `feat: cut over to next.js`

---

## Self-review notes
- Spec coverage: every current `view` + API handler has a task; property pages (the main SEO gain) are Task 8.
- Env vars to confirm in Vercel before cutover: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `ADMIN_PASSWORD`, GHL token(s), `GEMINI_API_KEY`.
- Risk: Supabase image hosts must be whitelisted in `next.config.ts` or `next/image` 400s — handled Task 11, but verify per-route as images appear.
- Interim (already shipped this branch): static `<meta name=description>`, canonical, JSON-LD, `robots.txt`, `sitemap.xml` on the Vite `index.html` so the live site ranks better until cutover.
