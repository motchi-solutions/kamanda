# Kamanda Management LLC

A professional management and business consultancy website supporting organizations across the UAE, KSA, the wider Gulf region, and globally. The site presents project management, construction support, technology adoption advisory, and business coordination. Specialist technology implementation can be coordinated through delivery partners including Motchi Solutions.

## Stack

Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS v4, and React Compiler. Manrope and Cormorant Garamond are loaded with `next/font`. Interface icons use Lucide through `react-icons/lu`. See [direct dependencies](docs/dependencies.md).

## Local development

Use Node.js 20.9 or newer (the installed Next.js minimum) and npm. Use a supported Node LTS release for deployment.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. Before changing Next.js code, read `AGENTS.md` and the relevant version-matched guide under `node_modules/next/dist/docs/`.

### Environment variables

No custom environment variable is required to start development. Optional `.env.local`:

```dotenv
SITE_URL=http://localhost:3000
```

`SITE_URL` is an absolute public origin used for canonical, social, sitemap, and robots URLs. Set it to the intended HTTPS production origin before deployment. If omitted, `src/lib/site.ts` uses `http://localhost:3000` in development and `https://kamandagroup.com` otherwise. Do not carry a localhost value into production. Environment files are ignored by Git; do not commit secrets. `NODE_ENV` is managed by Next.js scripts.

### Scripts

| Command         | Purpose                                                 |
| --------------- | ------------------------------------------------------- |
| `npm run dev`   | Local Next.js development server                        |
| `npm run lint`  | ESLint with Next.js and TypeScript rules                |
| `npm run build` | Production compilation, type checking, and prerendering |
| `npm run start` | Serve an existing production build                      |

Validation completed during the latest source review: ESLint passes, local image references resolve, and relative documentation links resolve. A final production build and browser/responsive review have not been verified in this workspace. A Vercel deployment has been reported, but the live URL is showing older content; its deployed commit and production-domain assignment still need verification.

## Project map

```text
src/
  app/                     Routes, root layout, global CSS, metadata endpoints
    ae/ sa/                Thin regional homepage routes
    about/ services/       Shared routes
  components/
    layout/                Navbar, nav links, mobile menu, footer, site intro
    pages/home/            Home composition, services preview, metrics, contact
    pages/about/           About page and working approach
    pages/services/        Service content and detailed sections
    ui/                    Shared hero, reveal, and contact CTA
  lib/                     Region definitions, cookie reader, site URL/config
  proxy.ts                 Region cookie and root-entry geo redirect
public/                    Brand, skyline, app icon, and social assets
docs/                      Architecture, dependencies, handoff notes
.github/CODEOWNERS         Ownership assigned to websites-admin
```

## Regional routing and SEO

- `/`: default UAE content and skyline; eligible Saudi visitors may redirect to `/sa`.
- `/ae`: explicit UAE homepage.
- `/sa`: Saudi skyline with the same page text and sections.
- `/about` and `/services`: shared URLs; navigation uses the region cookie.

The proxy records `kamanda-region` on homepage requests and uses `x-vercel-ip-country` for Saudi redirects at `/`, with crawler exclusions. Metadata is determined only by the route, never cookies, IP, or client state. Regional routes have their own canonical/social metadata; shared pages retain shared canonicals. See [architecture](docs/architecture.md) for exact behavior.

## Page experience

- **Home:** shared photo hero with gold highlights, a diagonal service-card layout from 1024 px, vertically aligned service introduction, synchronized metrics, and the currently disabled enquiry form. Service cards use a two-column tablet layout and a single-column mobile layout.
- **About:** alternating text/photo sections, broader consultancy positioning, “How We Manage Our Projects” process cards, specialist partner information, and regional/global support.
- **Services:** sticky section navigation beneath the main navbar, directional arrows for sections above/below the current position, a dash for the active section, and alternating desktop content columns.
- **Shared navigation:** regional home links, active-page states, animated mobile disclosure, keyboard dismissal, and vector brand icons.

## UI, motion, and imagery

Use existing CSS-first Tailwind v4 tokens, modest corner radii, and navy/gold accents on neutral surfaces. Default to Server Components; isolate browser behavior in small Client Components.

The root layout renders a 950 ms CSS logo intro once per document load. Section reveals use IntersectionObserver and the Web Animations API. Off-screen items are prepared before paint and animate once after reaching 80 px inside the viewport; already-visible content stays visible. Desktop entrances last 750 ms, mobile entrances 550 ms, and About process cards have 160 ms desktop stagger intervals. Keyboard focus and printing reveal content immediately. Metrics use a one-time requestAnimationFrame count-up with a shared 1.8-second quadratic ease-out progression (construction hours start at 200,000; the smaller totals start at zero and all finish together), with final values rendered on the server. All motion respects reduced-motion preferences. Hover/focus styles use CSS: service links turn dark gold with a navy underline drawn left to right, and diagonal/hero arrows repeat a gentle nudge while active. The footer uses the brighter hero gold. There is no animation dependency.

Use `next/image`: the skyline is eager with high fetch priority, and below-fold images remain lazy. Never reuse the hero source for lazy content on the same page. All four service cards use supplied local photos; photos display in full color with a subtle scale on hover or focus. No external image hotlinks are used.

## Contact and deployment

The contact form is UI only. Its availability notice precedes grouped, labeled fields; all inputs and submission are disabled until a handler is connected. Required/optional guidance, native client-type choices, and associated help text are included. No submission backend, email service, or success state is implemented.

Deploy to a Next.js-capable platform that supports the Node server and proxy, such as Vercel. A static-only export cannot preserve the cookie-reading shared routes and proxy behavior. Install with `npm ci`, make development dependencies available during the build, configure `SITE_URL`, then build and serve using the scripts above. Google font loading through `next/font/google` needs network access at build time. Production region cookies are secure and require HTTPS. Outside Vercel, geo behavior needs an equivalent trusted country header supplied by the hosting layer; without it, root entry defaults to UAE.

### If the live site shows older content

First distinguish an old deployment from an old image: outdated headings or layouts point to a deployment/source mismatch, while unchanged photos alone may be an optimized-image cache issue.

- Confirm the latest source changes and replacement assets are committed and pushed.
- Compare the commit deployed to production with the commit containing those changes. Repository integration uses `develop`; do not assume that it is the configured production branch.
- Confirm the deployment completed successfully and that the live domain points to that deployment, rather than an earlier deployment or a different project.
- Compare the deployment-specific URL with the live domain before attributing the issue to browser caching.
- For image-only staleness, see [hero imagery and cache troubleshooting](docs/hero-imagery.md). Images use public URLs, so replacing a file at the same path can leave an older optimized copy cached. Renaming the asset and updating its URL gives the replacement a distinct cache key.

The cause of the reported live-site issue has not yet been confirmed.

## Remaining work

- Replace lower-resolution hero and Project Management photos with larger originals when available.
- Connect an approved enquiry backend before enabling submission.
- Perform the separate final production/browser/responsive validation pass.

See [contributing](CONTRIBUTING.md), [architecture](docs/architecture.md), and [dependencies](docs/dependencies.md).

Hero source paths, current dimensions, replacement instructions, and localhost cache troubleshooting are documented in [Hero imagery](docs/hero-imagery.md). Heroes reference root-relative public image URLs through `next/image`.

### Social sharing images

Open Graph and Twitter large-image cards use the shared helper in `src/lib/social-metadata.ts`. `/`, `/ae`, `/about`, and `/services` use the 1200 × 630 UAE preview at `public/seo/og-uae-20260928.jpg`, prepared from the supplied homepage screenshot. `/sa` keeps `public/seo/og-riyadh.png` until the Saudi replacement is supplied. Each route sets its own social title, description, and Open Graph URL; `SITE_URL` supplies the absolute origin. The versioned UAE filename avoids reusing the previous image URL in social caches, although platforms may still need to refresh cached page previews.
