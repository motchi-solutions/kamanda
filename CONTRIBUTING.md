# Contributing

## Workflow and review

Use `develop` as the integration branch. Create a focused branch from its current state: `feat/short-description`, `fix/short-description`, `polish/short-description`, or `docs/short-description`. Preserve unrelated local changes. Open a pull request targeting `develop`; coordinate release/promotion with the repository maintainers rather than assuming a production branch.

Describe the problem, resulting behavior, affected routes, validation performed, and remaining limitations. Include screenshots for visible changes when browser validation is in scope. Document dependency/configuration changes and update the relevant handoff notes. Use concise imperative commits, optionally prefixed with `feat:`, `fix:`, `style:`, `docs:`, or `chore:`. Avoid unrelated changes in the same commit.

Run `npm run lint` and fix all errors before handing off. This development stage explicitly defers build, browser, and responsive validation to a separate final pass; do not claim those checks ran for a lint-only change. CODEOWNERS assigns repository-wide review ownership to `@motchi-solutions/websites-admin`.

## Implementation conventions

- Read `AGENTS.md` and relevant installed Next.js guides before editing framework code.
- Use strict TypeScript, existing `@/` aliases, and the repository's formatting style. Avoid `any`, lint suppression, and unnecessary abstractions.
- Keep route files thin. Shared layout belongs in `components/layout`; page sections belong in `components/pages/home`, `about`, or `services`. Use `components/ui` for small, genuinely shared components.
- Default to Server Components. Use Client Components only for browser APIs, state, effects, or event handling: pathname-aware links, mobile disclosure behavior, viewport reveals, and counters are current examples. Pass server-rendered children to client wrappers rather than making whole pages client-side.
- Do not add dependencies without a clear need. This pass adds only `react-icons`; prefer named imports from `react-icons/lu` for consistent outline icons. Do not replace logos or brand artwork with interface icons.
- Keep `package.json` and `package-lock.json` synchronized using npm. Do not remove existing required packages or introduce another lockfile.

## Styling and accessibility

Use Tailwind v4's CSS-first configuration in `src/app/globals.css`; do not add a Tailwind config file. Reuse brand tokens, fonts, existing containers, spacing, and modest radii. Prefer opacity/transform and short CSS transitions; do not introduce animation libraries, scroll hijacking, or excessive motion.

Maintain one H1, semantic landmarks, sensible heading order, visible keyboard focus, accessible form labels, and useful link names. Decorative icons use `aria-hidden="true"`; icon-only controls need accessible labels. Hover effects must have keyboard equivalents where meaningful. Respect `prefers-reduced-motion`, preserve readable server-rendered content, and keep the mobile menu usable with keyboard and Escape. Active navigation uses `aria-current="page"` and a persistent accent.

## Regional content and SEO

Keep content identical across UAE and Saudi routes. Only imagery, route metadata, navigation context, and the existing geo behavior vary. Keep About and Services on shared URLs; do not create regional copies. Preserve Kamanda's advisory/coordination/oversight positioning and the verified metrics, including the 5+ partner-facilitated technology adoption metric. Do not invent achievements or present Kamanda as a direct software-development company.

Metadata must remain deterministic by route. Never derive it from the region cookie, IP headers, or client state. Preserve canonicals, regional OG assets, sitemap, robots, and region-cookie behavior unless a requested change requires otherwise.

## Images and content integration

Use local, licensed images through `next/image` with appropriate dimensions or `fill` plus `sizes`. Keep only the hero eager/high-priority; below-fold images stay lazy. Do not reuse hero sources for lazy images lower on the same page. Provide meaningful alt text for informative images and `alt=""` for decorative images. Do not hotlink production photography. See [hero imagery](docs/hero-imagery.md) for asset paths and replacement/cache guidance. All four homepage services already have local photography.

The enquiry form must remain explicitly unavailable until a real submission handler exists. Do not add a false success state. Never commit environment secrets or manufacture a footer-credit URL or GitHub reviewer identity.
