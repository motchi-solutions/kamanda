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

### Contact environment variables

Only the two `NEXT_PUBLIC_*` site keys are public. All other contact variables stay server-side. Set them in `.env.local` and the appropriate Vercel environments; never commit real secrets.

```dotenv
# Server only — Brevo transactional API, verified sender and internal inbox
BREVO_API_KEY=
BREVO_SENDER_EMAIL=no-reply@kamandagroup.com
BREVO_RECIPIENT_EMAIL=info@kamandagroup.com

# Server only — existing Upstash database and independent random salt (32+ characters)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
CONTACT_HASH_SALT=

# Public site keys — embedded at build time; redeploy after changing
NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY=
NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY=

# Server only — Google Cloud project and API key
GCP_PROJECT_ID=
GOOGLE_RECAPTCHA_API_KEY=
RECAPTCHA_V3_MIN_SCORE=0.5

# Server only — exact allowed hostnames, comma-separated
RECAPTCHA_ALLOWED_HOSTNAMES=localhost
```

Keep the **reCAPTCHA Enterprise API enabled** and restrict `GOOGLE_RECAPTCHA_API_KEY` to **reCAPTCHA Enterprise API**. Use Enterprise score-based (v3) and checkbox (v2) site keys from the configured project. Local `.env.local` uses Dev site keys with `RECAPTCHA_ALLOWED_HOSTNAMES=localhost`; Vercel Production uses Prod site keys with `RECAPTCHA_ALLOWED_HOSTNAMES=kamandagroup.com,www.kamandagroup.com`. An explicit hostname list replaces the default `SITE_URL` hostname. Redeploy after changing public site keys.

`SITE_URL` must match the intended origin; use `http://localhost:3000` for local work. Vercel supplies `VERCEL=1`; do not set it on an untrusted non-Vercel host. Outside Vercel, production IP trust must be adapted explicitly. Full provider setup, no-JavaScript behavior, and failure/retry policies are in [docs/contact.md](docs/contact.md).

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

- **Home:** shared photo hero with gold highlights, an aligned 2×2 service-card grid on desktop, vertically aligned service introduction, synchronized metrics, and the secure enquiry form. Service cards use a two-column tablet layout and a single-column mobile layout.
- **About:** alternating text/photo sections, broader consultancy positioning, “How We Manage Our Projects” process cards, specialist partner information, and regional/global support.
- **Services:** sticky section navigation beneath the main navbar, directional arrows for sections above/below the current position, a dash for the active section, and alternating desktop content columns.
- **Shared navigation:** regional home links, active-page states, animated mobile disclosure, keyboard dismissal, and vector brand icons.

## UI, motion, and imagery

Use existing CSS-first Tailwind v4 tokens, modest corner radii, and navy/gold accents on neutral surfaces. Default to Server Components; isolate browser behavior in small Client Components.

The root layout renders a 950 ms CSS logo intro once per document load. Section reveals use IntersectionObserver and the Web Animations API. Off-screen items are prepared before paint and animate once on entry with subtle 700 ms entrances and delays capped at 280 ms. Content already visible during hydration remains steady, avoiding a visible-to-hidden flash. Keyboard focus and printing reveal content immediately. Metrics use a one-time requestAnimationFrame count-up with a shared 1.8-second quadratic ease-out progression (construction hours start at 200,000; the smaller totals start at zero and all finish together), with final values rendered on the server. All motion respects reduced-motion preferences. Hover/focus styles use CSS: service links turn dark gold with a navy underline drawn left to right, and diagonal/hero arrows repeat a gentle nudge while active. The footer uses the brighter hero gold. There is no animation dependency.

Use `next/image`: the skyline is eager with high fetch priority, and below-fold images remain lazy. Never reuse the hero source for lazy content on the same page. All four service cards use supplied local photos; photos display in full color with a subtle scale on hover or focus. No external image hotlinks are used.

## Contact and deployment

The contact form uses server-verified reCAPTCHA Enterprise score assessments with checkbox fallback, Upstash Redis rate limits/duplicate protection, and Brevo internal notification plus visitor confirmation. It preserves input on errors and provides accessible loading, inline recovery, and a success panel with reference feedback. Provider configuration is required before sending; unavailable services fail gracefully. See [contact setup, security, error codes, and verified quotas](docs/contact.md).

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
- Configure and manually verify Google reCAPTCHA, Upstash, and Brevo before accepting live enquiries.
- Perform the separate final production/browser/responsive validation pass.

See [contributing](CONTRIBUTING.md), [architecture](docs/architecture.md), and [dependencies](docs/dependencies.md).

Hero source paths, current dimensions, replacement instructions, and localhost cache troubleshooting are documented in [Hero imagery](docs/hero-imagery.md). Heroes reference root-relative public image URLs through `next/image`.

### Social sharing images

Open Graph and Twitter large-image cards use `src/lib/social-metadata.ts`:

| Routes | Image | Dimensions |
| --- | --- | --- |
| `/`, `/about`, `/services` | `/seo/og-default.png` | 1733 × 908 |
| `/ae` | `/seo/og-dubai.png` | 1733 × 908 |
| `/sa` | `/seo/og-riyadh.png` | 1733 × 907 |

Each route has its own social title, description, and Open Graph URL. `SITE_URL` supplies the absolute origin. Image dimensions match the actual PNG files. Social platforms may need to refresh cached page previews after deployment.

Desktop sections (1024 px and above) use `clamp(2rem, 4vw, 3.5rem)` vertical padding, half the smaller-screen spacing formula. Tablet/mobile spacing is unchanged. The footer includes the registered address beneath the gold catchphrase.

Legal placeholders are available at `/terms-of-service` and `/privacy-policy`, linked from the footer. Both are marked noindex and omitted from the sitemap until final content is supplied; update metadata and the sitemap when publishing the completed policies.
