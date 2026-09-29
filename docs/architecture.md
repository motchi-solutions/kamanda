# Architecture

## App Router and routes

The Next.js App Router lives in `src/app`. The root `layout.tsx` loads Manrope and Cormorant Garamond using `next/font/google`, imports global CSS, defines base metadata, and renders the skip link, CSS-only site intro, and route content. Pages compose their own shared navbar and footer so region context remains explicit.

| Route       | Content and navigation context                         | SEO                                                  |
| ----------- | ------------------------------------------------------ | ---------------------------------------------------- |
| `/`         | Default UAE homepage; eligible Saudi requests redirect | Default UAE metadata, canonical `/`                  |
| `/ae`       | UAE skyline and UAE navigation                         | UAE metadata, canonical `/ae`, Dubai social image    |
| `/sa`       | Riyadh skyline and Saudi navigation                    | Saudi metadata, canonical `/sa`, Riyadh social image |
| `/about`    | Shared About content; cookie-derived navigation        | Shared canonical `/about`                            |
| `/services` | Shared service details; cookie-derived navigation      | Shared canonical `/services`                         |
| `/privacy-policy` | Current privacy policy and PDF download | Indexed canonical `/privacy-policy` |
| `/terms-of-service` | Current terms of service and PDF download | Indexed canonical `/terms-of-service` |

Regional routes delegate to the same `HomePage`. Its hero title and description are shared; routes supply region, skyline source, and image alt text. The homepage Project Management card and service detail share the region-neutral `/services/project-management.png` image and alt text from the service content configuration. There are no regional About/Services component trees or copy variants. About and Services await the shared server cookie reader and are dynamically rendered; their metadata remains static and route-specific.

## Region cookie and proxy

`src/lib/region.ts` defines `ae`/`sa`, the cookie name `kamanda-region`, and a one-year max age. Invalid or missing cookie values resolve to `ae`. `region-server.ts` uses asynchronous `cookies()` for shared-page navigation context only.

`src/proxy.ts` matches only `/`, `/ae`, and `/sa`:

1. `/ae` sets the cookie to `ae`; `/sa` sets it to `sa`.
2. At `/`, a non-crawler request with `x-vercel-ip-country: SA` redirects to `/sa` and sets `sa`.
3. Other root requests render the UAE experience and set `ae`, regardless of an earlier cookie value.

The cookie uses path `/`, SameSite Lax, one-year expiry, `httpOnly: false`, and Secure in production. The country header is hosting-provided; do not treat an untrusted client header as verified geography. The crawler pattern is explicit in the proxy. Shared routes do not change the cookie.

Navbar Home points to `/ae` or `/sa`. Services links directly to `/services` in desktop/mobile navigation and the footer. The hero Services CTA still scrolls to the homepage preview. Navbar Contact uses a local anchor on landing pages and a regional homepage anchor on shared pages. Service cards point to shared `/services#...` URLs. `NavLink` is the small Client Component reading `usePathname`; desktop/mobile links share it. Home is active on all three home routes, About on `/about`, and Services on `/services`. Contact has no scroll-spy. Active links have navy text and a full-width gold underline; hover/focus uses a shorter underline.

## SEO and configuration

Privacy Policy archive maintenance: whenever the Privacy Policy changes materially, preserve the previous version and publish it at `/privacy-policy/archive/YYYY-MM-DD`. Keep the archived page publicly accessible but out of primary navigation; it may use `noindex`. The current `/privacy-policy` remains canonical. Do not overwrite a prior policy without preserving its archived page.

`src/lib/site.ts` resolves the public origin from `SITE_URL`, then development localhost or the production fallback `https://kamandagroup.com`. Root metadata supplies global defaults; route files provide deterministic titles, descriptions, canonicals, and regional social overrides. Cookie/IP data never enters metadata. `sitemap.ts`, `robots.ts`, `manifest.ts`, app icons, and assets in `public/seo` retain their existing roles.

`next.config.ts` enables React Compiler. `tsconfig.json` enables strict checking and the `@/*` alias. `postcss.config.mjs` enables Tailwind v4; `eslint.config.mjs` composes Next.js Core Web Vitals and TypeScript rules.

## Component boundaries and service data

- `components/layout`: server-rendered navbar/footer/site intro; small client nav links and a native modal mobile navigation dialog. `showModal()` places the menu in the browser's top layer, outside sticky-header stacking and clipping. Native dialog behavior contains focus and restores it on dismissal. Close, backdrop taps, Escape, link selection, desktop resizing, and unmounting release the menu/scroll lock. Reduced motion removes dialog transitions, and a noscript navigation fallback remains available.
- `components/pages/home`: homepage composition, concise local-image service cards, metrics section/counters, and contact form.
- `components/pages/about`: shared About page and working-approach section.
- `components/pages/services`: `service-content.ts` owns each service overview, Kamanda role, grouped capability titles/descriptions, and supporting note; `ServiceDetail` renders each entry; `ServicesPage` assembles the overview, anchor links, details, and shared CTA.
- `components/ui`: server `Hero`, `ContactCta`, and reusable `DirectionalArrow`, plus the client `Reveal` wrapper.

Service anchors are `technology-ai`, `construction-support`, `project-management`, and `business-solutions`. The landing preview maintains a separate small list of titles/categories; keep its IDs and names aligned with detailed service content. Technology copy frames Kamanda as advisor, manager, and coordinator, with specialist implementation available through partners including Motchi Solutions.

## Design and development conventions

Typography: Manrope for body/UI; Cormorant Garamond for display headings. Brand tokens in `globals.css`: Carbon `#1E1E1E`, Navy `#1B3A66`, Gold `#C9A45D`, Snow `#FAFAFA`. Use neutral surfaces, navy/gold accents, modest corner radii, and restrained consultancy-oriented styling. Tailwind v4 is CSS-first; Server Components remain the default.

Interface icons use named imports from `react-icons/lu`, generally 16 px with `aria-hidden="true"`. Navbar, loading intro, and service-image logo fallbacks use `/icon.svg`, served from `src/app/icon.svg`, as the shared vector brand source. App PNG icons and decorative artwork remain separate assets. The footer reads “Website by Motchi Solutions" in muted small text; “Motchi Solutions links to the maintainer-provided destination `https://github.com/motchi-solutions`.

Home, About, and Services share the server-rendered `components/ui/hero.tsx`. It accepts eyebrow, heading, supporting copy, image/crop/sizes, panel width, primary CTA, and an optional secondary CTA. `.hero-frame` and `.hero-heading` define common responsive sizing and vertical centering; heading size scales to the panel’s inner width using container units, with a viewport-based fallback; `.hero-panel` provides navy glass, a thin gold border, restrained shadow, and rounded corners. The panel is opaque when backdrop blur is unsupported. From 1024 px, standard panels occupy at least 40% of the full hero width, and the wider home panel at least 45%; the hero container is not constrained by the body-content width cap. Below 640 px the copy is unboxed, left aligned, and vertically centered above Explore; there is no panel blur. Glass blur is 16 px from 640 px; buttons stack below 480 px. `.btn-gold` provides the shared warm gradient and focus treatment, using the same feedback timing as other buttons. All text and UI remain HTML/CSS. The Services anchor navigation sits below its hero and sticks beneath the main navbar. `ServicesNavigation` is a small client component that compares section positions against the shared anchor offset, updates up/down arrows for other sections and a static dash with the current-section accent, and leaves native anchor links functional without JavaScript. Scroll updates are scheduled through requestAnimationFrame; resize observation keeps positions current. On narrow screens the links scroll horizontally, and active-link changes reveal the selected item without moving the page vertically. `--site-header-height` and `--services-nav-height` coordinate sticky positions and anchor spacing.

Home keeps its route-selected UAE/Saudi skyline. Existing assets are used at their actual paths: About at `/about/about-hero.png` and Services at `/services/services-hero.png`; the `/images/about/` and `/images/services/` JPG paths in the design brief are not present. Services uses a compact left panel to leave city details visible to the right. Every hero image is eager/high-priority; photo sources are not reused in lazy content.

## Motion primitives

- Site intro: root-layout CSS overlay, 950 ms, independent of assets/network. It persists across client navigation and animates on full document loads. CSS clears it even without JavaScript.
- Reveal: IntersectionObserver starts a one-time 650 ms opacity/translation (24 px horizontally, 18 px vertically, or 10 px when stacked) using the Web Animations API. Content is visible by default; observers and active animations are cleaned up.
- Metrics: final numeric values are server-rendered. The counter client component uses IntersectionObserver and requestAnimationFrame for a one-time count-up with a shared 1.8-second clock and quadratic ease-out progression: construction hours start at 200,000, smaller totals start at zero, and all reach their final values on the same frame. Stable width and separate screen-reader values avoid layout changes and repeated announcements.
- Interactions: short CSS color/background/border/underline transitions. Service photos display in full color without opacity or saturation filters, with scale 1.025 over 400 ms when the whole card is hovered or focused within.

Reduced motion is mandatory: the intro/reveals/count-up are skipped, final metric values display immediately, hover transforms are suppressed, and CSS transition/animation durations are minimized. No animation library is installed.

## Images and contact status

Use `next/image` with responsive `sizes`. The hero skyline is eager and high-priority; below-fold images stay lazy and never reuse the same hero source. Informative images need meaningful alt text; decorative images use `alt=""`. All four services use local photos in `public/services/`. The shared Project Management image is 800 × 450; a higher-resolution original would improve large, high-density card rendering.

The contact form remains UI only. A single-column layout groups Your Details and Your Enquiry with fieldsets/legends, persistent labels, optional phone marking, associated help text, native Client Type radio choices, and 48 px minimum-height controls. The unavailable status appears before the fields; an outer disabled fieldset prevents entry and submission until a handler is integrated. Required-field instructions are visible above the form. There is no backend or success confirmation. Enable it only when a real handler is integrated.

## Headings and supporting copy

Use descriptive headings that make sense when scanned on their own, following [W3C guidance on headings and labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html). Keep one H1 naming the page's purpose, H2s identifying sections, and H3s for their subsections. Do not choose heading levels solely for visual size.

Use title case without a trailing full stop for headings, subheadings, navigation, buttons, and form labels. Capitalize the first and last words and major words; keep articles, coordinating conjunctions, and prepositions lowercase internally. Preserve proper nouns and acronyms. Body paragraphs, field help, and status explanations remain in sentence case. Write the case in source content rather than applying CSS capitalization. Established service names remain consistent across navigation, cards, forms, and detailed sections. Process steps use parallel action phrases. Eyebrows provide brief context; supporting text adds scope, an explanation, or a next step rather than repeating the heading. Repeated structural labels such as “Our role” and “Areas of support” are intentional within service sections. Prefer familiar business terms over slogans or unverified outcome claims. Allow headings to wrap naturally instead of inserting line breaks for a single screen size.

Form grouping and instructions follow [W3C grouping guidance](https://www.w3.org/WAI/tutorials/forms/grouping/) and [form instruction guidance](https://www.w3.org/WAI/tutorials/forms/instructions/). Before enabling submission, add accessible validation and truthful success/error feedback alongside the backend.

Shared arrow interactions repeat a 1000 ms ease-in-out directional nudge and return while hovered or keyboard-focused, with a 3 px travel distance on each active axis. The same pattern applies to hero buttons, service cards, section links, and contact/About CTAs on hover and keyboard focus. Reduced motion removes the nudge and direction-change transition while preserving the arrow orientation. About and Services information panels share `.content-panel` spacing and radii; process steps are an ordered list.

Service detail columns align vertically at their centers from the desktop breakpoint (1024 px), balancing the introduction against the support panel. Mobile/tablet layouts remain naturally stacked. The current navigation item shows a static Lucide minus in the same 16 px space as the directional arrows, retaining the gold/navy accent and `aria-current="location"`.

Hero photographs use root-relative public URLs, passed as strings to the shared hero and rendered with `next/image`. Replacing a file at the same URL may require clearing the optimized-image cache. See [Hero imagery](hero-imagery.md) for the current asset inventory and local server troubleshooting.

Scroll entrances use the shared `Reveal` component with native IntersectionObserver and Web Animations APIs. Homepage service cards and Services detail columns enter from alternating sides on desktop; smaller screens use a shorter vertical movement. Entrances play once, card stagger delays use the shared 140 ms interval and are capped at 420 ms, and keyboard focus finishes the local animation immediately. Reduced motion shows content without entrance effects, including when the preference changes. Content remains visible without JavaScript, and native scrolling is retained.

Reveal animations prepare only off-screen elements before paint using a paused animation, then play it when the element reaches 80 px inside the viewport. Content already visible at hydration stays visible and does not replay an entrance. Completion and keyboard focus remove animation effects, returning to the visible underlying HTML. This avoids a visible-to-hidden flash at the observer threshold.

The About page progresses from company introduction to delivery experience, a four-step engagement process, and specialist/regional support. Introduction and delivery sections alternate text and existing high-resolution photography on desktop; mobile keeps text before each photo. Photos use root-relative public URLs, responsive `next/image` sizing, lazy loading, and the later reveal threshold. Process steps use numbered cards in an ordered list. All About content remains shared across regions.

## Mobile navigation and reusable dismissal

Mobile navigation uses a native `<dialog>` opened with `showModal()`, following [WAI guidance for HTML dialogs](https://www.w3.org/WAI/WCAG22/Techniques/html/H102). The dialog contains a labeled navigation region of ordinary links and a visible Close button. Its header reuses `BrandLink` from the navbar; selecting the company logo closes the dialog and navigates to the current region’s homepage. A screen-reader-only heading names the dialog. The entrance uses a 420ms fade and 560ms eased 8px slide, with a coordinated backdrop fade; dismissal stays quicker at 240–280ms, and reduced motion skips the transitions. The browser handles top-layer rendering, inert background content, focus containment, and return focus. Initial focus goes to Close. Native cancel handling and the shared dismissal hook close on Escape or completed backdrop clicks. The dialog closes synchronously before link navigation; local links retain repeat scrolling, while Contact links use the shared transition described below. Contact Us retains the centered desktop-style CTA. The sheet scrolls independently on short screens. Selecting a link, resizing to desktop, or unmounting closes the dialog and releases the scroll lock. No additional dependency is needed.

The previous lock set both root and body overflow to hidden. That changes the scroll container of sticky descendants and can move a sticky navbar out of view when opening at a scrolled position. Lock only the root; do not turn body into another scroll container. Dialog top-layer positioning also removes dependence on header/backdrop stacking.

- `src/hooks/use-dismiss.ts`: call `useDismiss({ open, boundaryRef, onDismiss })` with a ref around the interactive content, excluding the backdrop. For disclosures include their trigger; for a native modal use its inner sheet so backdrop events are outside the boundary. It listens for completed outside clicks (mouse/touch) and Escape, reports `"outside"` or `"escape"`, and removes listeners on close/unmount. Only the most recently opened registered layer dismisses. The callback stays current through React's `useEffectEvent`. Completed clicks avoid dismissal on pointer-down during drags. This hook is not a focus trap; the native dialog supplies that behavior.
- `src/hooks/use-scroll-lock.ts`: call `useScrollLock(open)` to lock root overflow without changing body overflow or fixing/repositioning the page. Original inline overflow values and priorities are restored on cleanup. Locks are reference counted so overlapping consumers do not unlock one another.

Below 640px, shared hero photos align their right edge with the viewport, cropping from the left. Copy and actions remain left aligned, with the copy vertically centered in the available space above the bottom Explore control. Desktop image positioning remains route-specific. Explore uses the same repeating 1000ms arrow animation as other arrow links on hover or keyboard focus; it remains still when idle. Reduced motion removes the animation.

## Hero photo sizing and link feedback

On phones, the photograph occupies the upper 70% of the hero, capped at 32rem, and fades into the navy surface. This shows more of the landscape photograph instead of enlarging it to fill the whole portrait hero. Right-edge alignment is retained. The `sizes` hint estimates the width of the full covered photo using its source aspect ratio, rather than requesting only a viewport-width image and magnifying a narrow crop. UAE's source is 2172 × 724 (3:1); the other hero sources are 1672 × 941. Update `imageAspectRatio` alongside replacement assets. Original source pixels still limit sharpness on high-density screens; no artificial sharpening or replacement imagery is used. Desktop photo framing is unchanged.

Explore and non-contact same-page hero CTAs use native `<a href="#…">` navigation, including repeat activation when the fragment is already in the URL. Contact links use the shared transition described below; other cross-page CTAs retain Next.js Link. Existing smooth scrolling, reduced-motion behavior, and section scroll margins still apply; Hero remains server-rendered. See [MDN's anchor reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a).

Button feedback shares `--duration-feedback` (200ms) and `--ease-feedback` for color, background, border, and gradient position changes. Buttons remain stationary while their arrows provide directional feedback. Keyboard focus receives matching visual feedback and retains a visible outline; disabled buttons do not gain hover colors. The same rule covers CTA buttons, Explore, the menu toggle, service navigation controls, and text actions. Reduced motion disables arrow loops and minimizes transitions. This follows the principle of short, consistent feedback described in [Material's duration and easing guidance](https://m1.material.io/motion/duration-easing.html).

## Section entrance and card feedback conventions

Use a separate `Reveal` per card, with `index * REVEAL_STAGGER_MS` from `src/lib/motion.ts`; do not animate an entire card grid as one block. Service previews, process steps, and metric entries follow this rule. Two-column sections wrap each column separately, using `direction="left"` for the visual left column and `direction="right"` for the visual right column. This includes service/metrics introductions, About sections, service details, Contact, the contact CTA, and the footer. `sideBySideFrom` must match the layout breakpoint (`sm`, `md`, or default `lg`); stacked columns enter vertically. No nested reveal wrappers are needed around whole sections. Already-visible content stays visible, keyboard focus cancels its entrance immediately, and reduced motion skips entrances.

Service cards, process cards, contact panels, and shared content panels use the same 200ms border/shadow feedback on hover and focus-within. Only the individual hovered card responds. Static informational cards keep the normal cursor and do not acquire link semantics or extra tab stops. Service-card photo zoom remains limited to the interactive card. Hover styles do not translate the card, so they cannot conflict with its entrance transform.

## Contact navigation transition

`components/ui/contact-navigation.tsx` provides a persistent `ContactNavigationProvider` in the root layout and a shared `ContactLink` for navbar, mobile menu, hero, footer, and contact CTA links. On an ordinary click, the link first runs its existing close-menu handler. Navigation waits for the dialog's actual closing animations to finish instead of guessing a timeout. From another page, it opens the regional homepage without a fragment, waits for the destination commit and paint, then smoothly scrolls to Contact. If a homepage is already displayed, it stays on that homepage and scrolls directly. Section scroll margins retain header clearance.

Contact is focusable with `tabIndex={-1}`; focus moves without jumping the viewport. The final `#contact` URL is updated through native history without another automatic scroll: cross-page requests replace the newly created homepage entry, while same-page requests add a hash entry only if it differs. Repeated clicks work even when the hash already matches. New requests, unrelated route changes, Back/Forward, and unmounting supersede pending requests. Modified clicks and links opened in a new tab retain normal navigation, and the original href remains functional without JavaScript. Reduced motion uses immediate scrolling. Hero remains server-rendered; only its Contact link is interactive.
