# Danish Khan Portfolio — Production Rebuild Design

**Date**: 2026-07-06
**Status**: Approved, ready for implementation planning

## Summary

Rebuild the existing Claude-Design HTML/CSS/JS portfolio prototype (handoff bundle at
`~/Downloads/Portfolio-handoff.zip`) as a production-quality Next.js site. This is a
**refinement task, not a redesign**: same sections, same content, same visual identity
(dark, glass-accent, cyan/indigo gradient, Space Grotesk + JetBrains Mono). The goal is
to elevate polish (typography, spacing, elevation, animation quality) to the level of
Apple/Vercel/Linear/Stripe/Raycast, while keeping the design instantly recognizable as
the same portfolio.

## Reference material

The prototype (`portfolio/project/Danish Khan Portfolio.html` + `portfolio.css` +
`portfolio.js` in the handoff bundle) is the source of truth for:
- Section order and content: Hero, Journey (timeline), Skills, Projects, Experience
  (accordion), Achievements, Testimonials, Contact, Footer.
- Color system: `--bg:#08090d`, `--bg-elev:#0d0f15`, `--accent:#22d3ee`,
  `--accent-2:#818cf8`, text tiers `--text/--text-2/--text-3`, `--radius:18px`.
- Typography: Space Grotesk (display), JetBrains Mono (labels/kickers/mono accents).
- Interaction behaviors implemented in vanilla JS: scroll-based nav blur, scroll
  progress bar, reveal-on-scroll, animated stat counters, scroll-driven timeline fill
  with "lit" node states, experience accordion, active-section nav spy, mailto contact
  form.
- Assets already present in `.image-slots.state.json` (base64 WebP): portrait photo,
  and screenshots for Roots & Recipes, Redverse, and BlackListed. Four project slots
  (Market Ember, Inspire Me Wellness, SpendScope, C Template) have no image yet.
- `portfolio/project/uploads/resume_file-*.pdf` — a resume PDF not currently linked
  anywhere in the prototype.

The `tweaks-panel.jsx` / `tweaks.jsx` files are a design-tool authoring aid (in-browser
image-slot drag/drop editor loaded via Babel-in-browser). They are **not** part of the
production build.

## Decisions from stakeholder review

- **Project location**: new repo at `~/Projects/danish-portfolio`.
- **Missing project screenshots** (Market Ember, Inspire Me Wellness, SpendScope, C
  Template): render an elegant styled placeholder tile inside the phone-frame (not a
  broken-image look), swappable later by dropping a real screenshot into
  `public/images/`.
- **Testimonials section**: keep the section, but with an intentionally-styled
  "recommendations coming soon" placeholder state rather than fake-looking quote cards.
- **Resume**: add a subtle "Resume" link (nav + secondary hero CTA, `btn-ghost` style)
  pointing at `public/resume.pdf`. This is the one deliberate addition beyond the
  original design, requested by the stakeholder.
- **Contact form**: keep the existing `mailto:` draft-prefill behavior — no backend,
  no API keys, ships as-is.
- **Content structure**: typed TypeScript data files per section (skills, projects,
  experience, achievements, journey), consumed by presentational components. No MDX,
  no CMS — content changes are single-array edits.

## Architecture

Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion + Lucide React +
`next/image`. Server Components by default; Client Components only where interaction
or animation state is required.

```
app/
  layout.tsx          — next/font (Space Grotesk, JetBrains Mono), metadata, OG/Twitter
  page.tsx            — composes sections (Server Component)
  robots.ts
  sitemap.ts
components/
  navbar.tsx          — client: scroll state, mobile menu, active-section spy
  hero.tsx            — client: reveal/stagger entrance, floating chips
  journey.tsx         — client: scroll-driven timeline fill + lit nodes
  skills.tsx          — server
  projects.tsx        — server; project-card.tsx is client for hover/tilt motion
  experience.tsx       — client: accordion state (AnimatePresence)
  achievements.tsx     — server
  testimonials.tsx     — server: styled "coming soon" placeholder
  contact.tsx          — client: form state + mailto submit
  footer.tsx           — server
  ui/                  — Button, SectionHead, Kicker, Chip, GlowOrb, PhoneFrame,
                          ProjectPlaceholderArt
lib/
  content/
    skills.ts
    projects.ts
    experience.ts
    achievements.ts
    journey.ts
  metadata.ts
public/
  images/               — portrait.webp, roots-recipes.webp, redverse.webp,
                          blacklisted.webp (extracted from base64 in the handoff bundle)
  resume.pdf
```

Tailwind theme config maps the CSS custom properties from the prototype 1:1
(`colors.accent`, `colors.accent2`, `colors.bg`, `colors.bgElev`, `borderRadius.DEFAULT:
18px`, `fontFamily.display`, `fontFamily.mono`) so the palette carries over exactly.

## Visual polish (refinement, not redesign)

**Preserved exactly**: color palette, font pairing, section order/content, card-based
layout language, glassmorphism nav, timeline/accordion/phone-frame concepts.

**Refined**:
- Typography: single shared `clamp()`-based type scale for all headings (currently
  ad-hoc per section) for consistent proportions across breakpoints.
- Spacing: standardize on Tailwind's 4px-based scale instead of the prototype's mixed
  one-off pixel values (14/18/22/26/28/30px).
- Card elevation: two-layer shadow system (soft ambient + tight contact shadow) on
  hover for skill/project/achievement cards, replacing the single flat `box-shadow`.
- Borders: standardize the accent-tinted hover border (`color-mix` pattern) into one
  reusable Tailwind utility instead of per-component repetition.
- Project phone-frame: refine bezel proportions, add a subtle inner screen
  reflection/gradient overlay on hover.
- Grid alignment: single 12-col content grid via Tailwind container so hero/section/card
  grids share one baseline instead of independent max-widths.

## Animation plan (Framer Motion)

Direct port of the existing vanilla-JS behaviors in `portfolio.js`:

| Prototype behavior | Framer Motion implementation |
|---|---|
| `.reveal` fade/slide-up on IntersectionObserver | `whileInView` + `variants`, `viewport={{ once: true, margin: "-40px" }}` |
| Staggered reveal delays | `staggerChildren` on parent `motion` containers (hero stats, skill/project/achievement grids) |
| Animated stat counters | `useMotionValue` + `animate()` on `whileInView`, matching the original cubic ease-out |
| Timeline fill + lit nodes on scroll | `useScroll` + `useTransform` mapped to fill height/opacity |
| Nav scroll blur/background swap | `useScroll`, same `y > 24` threshold |
| Active-section nav indicator | Small client hook using `IntersectionObserver` directly (no need for a library) |
| Experience accordion | `AnimatePresence` + `motion.div` height animation |
| Hero floating chips | `animate()` with repeating `y` keyframes and staggered delays |
| Project card hover (lift + phone rise) | `whileHover` on card and nested phone-frame, same easing curve |
| Cursor blink, status pulse dot | Left as plain CSS `@keyframes` — no benefit to JS-driving these |

All motion respects `prefers-reduced-motion` via Framer Motion's `useReducedMotion`;
opacity-only fades still occur when reduced motion is requested so content is never
invisible.

## Images

- Extract the 4 embedded base64 WebP images from
  `portfolio/project/.image-slots.state.json` (`portrait`, `shot-roots-recipes`,
  `shot-redverse`, `shot-blacklisted`) into real files under `public/images/`, served
  through `next/image` with explicit dimensions.
- The 4 empty project slots (Market Ember, Inspire Me Wellness, SpendScope, C Template)
  render a styled placeholder (monogram/glyph on an accent-tinted gradient) inside the
  phone-frame — intentional-looking, not a broken-image state. `ProjectCard` checks for
  an image path and falls back to `ProjectPlaceholderArt` when absent.
- Resume PDF copied to `public/resume.pdf`, linked from nav + secondary hero CTA.

## SEO / Performance / Accessibility

- **SEO**: metadata (title/description) in `app/layout.tsx`, Open Graph + Twitter Card
  tags (portrait as OG image), `app/sitemap.ts`, `app/robots.ts`.
- **Performance**: Server Components by default; client islands scoped to
  navbar/hero/journey/experience/contact/project-card. `next/image` lazy-loading
  everywhere except the hero portrait (`priority`). Target Lighthouse 95+.
- **Accessibility**: semantic landmarks, single `h1`, ordered `h2`/`h3` hierarchy,
  visible focus rings on all interactive elements (not present in the prototype),
  keyboard-operable accordion and mobile menu, `aria-expanded` on accordion/burger
  buttons.

## Testing / Verification

No automated test suite for this marketing site. Verification is manual: run the dev
server, walk every section at desktop/tablet/mobile widths, exercise the mobile menu,
accordion, contact form mailto flow, and reduced-motion mode in the browser before
calling the work complete.

## Out of scope

- Real backend for the contact form (kept as `mailto:`).
- CMS or MDX content layer.
- Light theme / theme toggle (prototype is dark-only by design).
- Replacing the 4 missing project screenshots with real images (placeholder art ships
  instead; swappable later).
