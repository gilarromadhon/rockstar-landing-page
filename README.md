# Rockstar Academy — Landing Page

React + Vite landing page rebuild with scroll-driven animation, built with
**GSAP / ScrollTrigger** (pinning, scrubbed timelines) and **Lenis**
(smooth-scroll, synced to GSAP's ticker).

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Design tokens

- Font: Plus Jakarta Sans (Google Fonts)
- Colors: `#F8972A` orange · `#F06225` orange-deep · `#57C9BD` teal-light · `#00AA9D` teal-deep
- All tokens live as CSS variables at the top of `src/index.css`.

## Where each scroll behaviour lives

| # | Behaviour | File |
|---|---|---|
| 1 | Hero image rises and covers the heading; heading fades out | `src/components/Hero.jsx` |
| 2 | Description paragraphs fade from 0→100% opacity as they scroll in | `src/components/Description.jsx` |
| 3 | Programs section pins and scrolls its cards horizontally until the track ends, then releases to normal vertical scroll | `src/components/Programs.jsx` |
| 4 | Program card description reveals on hover | `src/components/Programs.jsx` (CSS in `index.css`) |
| 5 | Events: left panel is sticky, right column scrolls through 10 items, left progress bar + numbered dots track position | `src/components/Events.jsx` |
| 6 | Statistics reveal (fade/slide-up + count-up) on scroll into view | `src/components/Stats.jsx` |
| 7 | Find Us pins and focuses one city at a time as you scroll | `src/components/FindUs.jsx` |
| 8 | Instructor photos start grayscale, turn to color on scroll | `src/components/Instructors.jsx` |

All imagery uses placeholder photos from `picsum.photos` / Unsplash — swap
the `src` URLs for the real brand photography before shipping.

## Notes

- `src/lib/smoothScroll.js` sets up Lenis and feeds it through GSAP's
  ticker so `ScrollTrigger` stays perfectly in sync with the smoothed
  scroll position — this is what makes the pinned/scrubbed sections feel
  fluid instead of stepped.
- Every scroll-driven effect is built with `gsap.context()` + `ctx.revert()`
  cleanup so it's safe under React's StrictMode double-invoked effects and
  on hot-reload.
- Respects `prefers-reduced-motion` by shortening/disabling the Lenis easing.
