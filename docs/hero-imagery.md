# Hero imagery

Hero photographs live in `public/` and are referenced by root-relative URLs through the shared `Hero` component using `next/image`. For example, `public/images/hero-global.png` is passed as `/images/hero-global.png`. No image imports or public-directory alias are needed.

| Page | Source file | Current dimensions |
| --- | --- | --- |
| Home `/` and UAE `/ae` | `public/images/hero-global.png` | 2172 × 724 |
| Saudi Arabia `/sa` | `public/images/hero-ksa.png` | 1073 × 353 |
| About `/about` | `public/about/about-hero.png` | 1663 × 312 |
| Services `/services` | `public/services/services-hero.png` | 2172 × 724 |

All heroes retain shared sizing, eager loading, high fetch priority, and responsive cover crops. Regional home copy stays shared. The Saudi and About sources have limited vertical resolution; cover cropping on tall heroes and high-density screens can magnify softness. Use larger originals with enough height for the intended crop; upscaling cannot recover detail.

## Replacing a photograph

Replace the corresponding file, preserving its name, or update the image URL when changing its name or format. Check the subject placement at desktop and mobile widths and update alt text if the subject changes. Update the dimensions above when replacing an asset.

## Localhost troubleshooting

During the September 28, 2026 investigation, the development server on port 3000 served the current raw files, but the optimized home hero URLs returned cached images that differed substantially from those files. A separate production server on port 3001 was serving an older build and returned 404 for the new About and Services public paths.

Next.js defaults to a four-hour minimum optimized-image cache lifetime. Replacing a file at an unchanged public URL does not invalidate that optimized image.

Use the address printed by `npm run dev` (port 3000 during this investigation). Reload after the development compiler updates; restart the development server if a replacement was not detected. `npm run start` serves a production build and requires a new `npm run build` before it can reflect source changes. A browser hard refresh alone cannot refresh an old production build or invalidate the server's optimized-image cache.

For these public image paths, Next.js documents changing the source URL or removing the generated image cache as invalidation options. The development image cache is under `.next/dev/cache/images`; production uses `.next/cache/images`. Stop the server before clearing its generated cache, then restart it.
