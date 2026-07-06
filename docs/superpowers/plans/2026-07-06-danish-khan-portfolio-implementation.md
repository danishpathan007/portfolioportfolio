# Danish Khan Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Claude-Design HTML/CSS/JS portfolio prototype as a production-quality Next.js 15 site — same sections, content, and visual identity, elevated polish.

**Architecture:** Next.js 15 App Router + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide React + `next/image`. Server Components by default; Client Components isolated to interactive/animated islands (Navbar, Hero, Journey, ProjectCard, Experience accordion, ContactForm, and the shared `Reveal` motion primitives).

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, npm.

## Global Constraints

- Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide React, `next/image` — no other framework substitutions.
- Server Components by default; a component is only a Client Component if it uses state, effects, or Framer Motion hooks.
- Contact form stays `mailto:`-only — no backend, no API routes, no API keys.
- Content lives in typed TypeScript arrays under `lib/content/` — no MDX, no CMS.
- Dark theme only — no light mode / theme toggle.
- Preserve the prototype's color palette, font pairing (Space Grotesk + JetBrains Mono), section order, and copy **exactly**, except for three approved deviations:
  1. A "Resume" link is added to the nav and hero CTAs (stakeholder-approved addition), pointing at `/resume.pdf`.
  2. The Projects section subheading ("Drag your real app screenshots onto any phone — they'll stay in place.") is prototype authoring-tool instruction text, not production copy — Task 17 replaces it with a production-appropriate description while keeping the kicker and title unchanged.
  3. The 4 project screenshots with no uploaded image (Market Ember, Inspire Me Wellness, SpendScope, C Template) render a styled placeholder tile instead of a real screenshot.
- No automated test suite (explicit spec decision) — every task's verification step uses `npx tsc --noEmit`, `npm run lint`, `npm run build`, and targeted `curl | grep` checks against the dev server instead of unit tests. The final task is a full manual browser walkthrough.
- Package manager: npm.
- Target Lighthouse 95+, visible focus states on all interactive elements, keyboard-operable accordion/menu, `aria-expanded` on toggle buttons.
- Source reference bundle: `~/Downloads/Portfolio-handoff.zip` (contains the original HTML/CSS/JS prototype, embedded base64 screenshots, and the resume PDF).

---

### Task 1: Scaffold the Next.js project

**Files:**
- Create: entire Next.js scaffold in `~/Projects/danish-portfolio` (already git-initialized with one commit — the design spec).

**Interfaces:**
- Produces: a runnable Next.js 15 App Router project with TypeScript + Tailwind CSS v4 + ESLint configured, plus `framer-motion` and `lucide-react` installed, ready for later tasks to add files under `app/`, `components/`, `lib/`, `public/`.

- [ ] **Step 1: Run create-next-app non-interactively**

```bash
cd ~/Projects/danish-portfolio
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias "@/*" \
  --use-npm
```

This directory already contains `.git` and `docs/`, which create-next-app allows (both are on its safe-to-scaffold-into allowlist).

- [ ] **Step 2: Install Framer Motion and Lucide React**

```bash
npm install framer-motion lucide-react
```

- [ ] **Step 3: Verify the scaffold builds and runs**

```bash
npx tsc --noEmit
npm run build
```

Expected: both commands exit 0 with no errors.

- [ ] **Step 4: Verify the dev server serves the default page**

```bash
npm run dev &
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
kill %1
```

Expected: prints `200`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js 15 project with TypeScript, Tailwind, Framer Motion, Lucide"
```

---

### Task 2: Theme tokens, fonts, and base global styles

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: Tailwind color tokens `bg-bg`, `bg-bg-elev`, `bg-bg-card`, `border-stroke`, `border-stroke-soft`, `text-text`, `text-text-2`, `text-text-3`, `bg-accent`/`text-accent`/`border-accent`, `bg-accent-2`, `bg-accent-soft`, and font utilities `font-display`, `font-mono`, available to every later component. Also produces a global `@keyframes blink` used by the Hero cursor.

- [ ] **Step 1: Replace `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-bg: #08090d;
  --color-bg-elev: #0d0f15;
  --color-bg-card: rgba(255, 255, 255, 0.025);
  --color-stroke: rgba(255, 255, 255, 0.08);
  --color-stroke-soft: rgba(255, 255, 255, 0.05);
  --color-text: #eef1f6;
  --color-text-2: #9aa3b2;
  --color-text-3: #5d6675;
  --color-accent: #22d3ee;
  --color-accent-2: #818cf8;
  --color-accent-soft: rgba(34, 211, 238, 0.12);
  --font-display: var(--font-space-grotesk), "Space Grotesk", ui-sans-serif, sans-serif;
  --font-mono: var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace;
}

@layer base {
  * {
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    background: var(--color-bg);
    color: var(--color-text);
  }
  ::selection {
    background: var(--color-accent);
    color: #06070a;
  }
  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
```

- [ ] **Step 2: Wire fonts and base body classes in `app/layout.tsx`**

Replace the file with:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Danish Khan — Mobile App Developer",
  description: "Danish Khan builds mobile apps people love.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg font-display text-text antialiased">{children}</body>
    </html>
  );
}
```

(Metadata is fleshed out fully with OG/Twitter tags in Task 22 — this is a working placeholder value, not a TBD.)

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npm run build
```

Expected: both succeed. Then:

```bash
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o "bg-bg"
kill %1
```

Expected: prints `bg-bg` (confirms the class is present in rendered HTML output).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "Add theme tokens, fonts, and base global styles"
```

---

### Task 3: Extract image and resume assets from the handoff bundle

**Files:**
- Create: `scripts/extract-assets.mjs`
- Create (generated, binary): `public/images/portrait.webp`, `public/images/roots-recipes.webp`, `public/images/redverse.webp`, `public/images/blacklisted.webp`, `public/resume.pdf`

**Interfaces:**
- Produces: real image/resume files under `public/` that later tasks (`lib/content/projects.ts`, Hero, Navbar) reference by path (`/images/portrait.webp`, `/images/roots-recipes.webp`, `/images/redverse.webp`, `/images/blacklisted.webp`, `/resume.pdf`).

- [ ] **Step 1: Unzip the handoff bundle to a temp location**

```bash
mkdir -p /tmp/portfolio-handoff-src
unzip -o -q ~/Downloads/Portfolio-handoff.zip -d /tmp/portfolio-handoff-src
ls /tmp/portfolio-handoff-src/portfolio/project
```

Expected: lists `Danish Khan Portfolio.html`, `portfolio.css`, `portfolio.js`, `.image-slots.state.json`, `uploads/`, etc.

- [ ] **Step 2: Create the extraction script**

```js
#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
import path from "node:path";

const srcDir = process.argv[2];
if (!srcDir) {
  console.error("Usage: node scripts/extract-assets.mjs <path-to-portfolio/project>");
  process.exit(1);
}

const outDir = path.join(process.cwd(), "public", "images");
mkdirSync(outDir, { recursive: true });

const slots = JSON.parse(readFileSync(path.join(srcDir, ".image-slots.state.json"), "utf8"));

const SLOT_TO_FILE = {
  portrait: "portrait.webp",
  "shot-roots-recipes": "roots-recipes.webp",
  "shot-redverse": "redverse.webp",
  "shot-blacklisted": "blacklisted.webp",
};

for (const [slotId, fileName] of Object.entries(SLOT_TO_FILE)) {
  const slot = slots[slotId];
  if (!slot?.u) {
    console.warn(`Skipping ${slotId}: no image data found`);
    continue;
  }
  const base64 = slot.u.replace(/^data:image\/webp;base64,/, "");
  writeFileSync(path.join(outDir, fileName), Buffer.from(base64, "base64"));
  console.log(`Wrote public/images/${fileName}`);
}

const uploadsDir = path.join(srcDir, "uploads");
const resumeFile = readdirSync(uploadsDir).find((f) => f.startsWith("resume_file"));
if (resumeFile) {
  copyFileSync(path.join(uploadsDir, resumeFile), path.join(process.cwd(), "public", "resume.pdf"));
  console.log("Wrote public/resume.pdf");
} else {
  console.warn("No resume file found in uploads/");
}
```

- [ ] **Step 3: Run it**

```bash
node scripts/extract-assets.mjs /tmp/portfolio-handoff-src/portfolio/project
```

Expected output: four `Wrote public/images/*.webp` lines and `Wrote public/resume.pdf`.

- [ ] **Step 4: Verify the files exist and are non-empty**

```bash
ls -la public/images public/resume.pdf
file public/images/portrait.webp public/resume.pdf
```

Expected: all files present with non-zero size; `file` reports `Web/P image` and `PDF document` respectively.

- [ ] **Step 5: Commit**

```bash
git add scripts/extract-assets.mjs public/images public/resume.pdf
git commit -m "Extract portrait, project screenshots, and resume from handoff bundle"
```

---

### Task 4: Site constants

**Files:**
- Create: `lib/site.ts`

**Interfaces:**
- Produces: `site` object with typed fields `name`, `role`, `email`, `phone`, `phoneHref`, `linkedin`, `linkedinHandle`, `github`, `githubHandle`, `location`, `resumePath`, `url` — consumed by Navbar, Hero, ContactLinks, ContactForm, Footer, and `app/layout.tsx` metadata (Task 22).

- [ ] **Step 1: Create `lib/site.ts`**

```ts
export const site = {
  name: "Danish Khan",
  role: "Mobile App Developer",
  email: "danish11706493@gmail.com",
  phone: "+91 96907 39077",
  phoneHref: "tel:+919690739077",
  linkedin: "https://www.linkedin.com/in/danishpathan",
  linkedinHandle: "/in/danishpathan",
  github: "https://github.com/danishpathan007",
  githubHandle: "/danishpathan007",
  location: "Mohali, Punjab, India",
  resumePath: "/resume.pdf",
  url: "https://danishkhan.dev",
} as const;
```

(`url` is a working default for OG tags and `sitemap.ts`/`robots.ts` — update it once a real domain is registered.)

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/site.ts
git commit -m "Add site constants"
```

---

### Task 5: Content data — skills and achievements

**Files:**
- Create: `lib/content/skills.ts`
- Create: `lib/content/achievements.ts`

**Interfaces:**
- Produces: `SkillItem` type (`{ icon: LucideIcon; title: string; description: string; tags: string[] }`) and `skills: SkillItem[]` (6 entries); `AchievementGroup` type (`{ icon: LucideIcon; title: string; items: string[] }`) and `achievements: AchievementGroup[]` (3 entries). Consumed by Task 16 (Skills section) and Task 19 (Achievements section).

- [ ] **Step 1: Create `lib/content/skills.ts`**

```ts
import { Smartphone, Globe, Database, Cloud, Activity, LayoutGrid, type LucideIcon } from "lucide-react";

export type SkillItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
};

export const skills: SkillItem[] = [
  {
    icon: Smartphone,
    title: "Flutter & Dart",
    description:
      "Cross-platform apps from a single codebase — scalable architecture, reusable components, and buttery-smooth performance.",
    tags: ["Dart", "State mgmt", "Modular UI"],
  },
  {
    icon: Globe,
    title: "SwiftUI / iOS Development",
    description:
      "7+ years of native iOS — Swift, SwiftUI, UIKit, Core Data, and the discipline of clean architecture on Apple platforms.",
    tags: ["Swift", "SwiftUI", "Core Data", "SwiftData"],
  },
  {
    icon: Database,
    title: "Supabase",
    description:
      "Auth, realtime databases, and secure data management — modern backends wired directly into mobile clients.",
    tags: ["Auth", "Realtime DB", "Postgres"],
  },
  {
    icon: Cloud,
    title: "Firebase",
    description:
      "Cloud storage, push notifications, and analytics — the glue for content-driven apps and template systems.",
    tags: ["Storage", "FCM", "Analytics"],
  },
  {
    icon: Activity,
    title: "REST APIs & Realtime",
    description:
      "Robust API integration across dozens of client projects, plus Socket.io for live messaging and realtime experiences.",
    tags: ["REST", "Socket.io", "JSON"],
  },
  {
    icon: LayoutGrid,
    title: "Architecture & UI/UX",
    description:
      "Clean, modular app architecture and pixel-faithful UI implementation — plus In-App Purchases and monetization flows.",
    tags: ["Clean arch", "IAPs", "UI/UX"],
  },
];
```

- [ ] **Step 2: Create `lib/content/achievements.ts`**

```ts
import { Award, GraduationCap, Target, type LucideIcon } from "lucide-react";

export type AchievementGroup = {
  icon: LucideIcon;
  title: string;
  items: string[];
};

export const achievements: AchievementGroup[] = [
  {
    icon: Award,
    title: "Honors & Awards",
    items: [
      "Academic Excellence Award",
      "Top Performer — BCA",
      "Indian Science Congress participation",
    ],
  },
  {
    icon: GraduationCap,
    title: "Certifications",
    items: [
      "Flutter & Dart — The Complete Guide",
      "iOS 13 & Swift 5 — Complete iOS App Development Bootcamp",
      "Mobile Development Workshop",
      "iOS App Developer Training",
    ],
  },
  {
    icon: Target,
    title: "Shipped & Delivered",
    items: [
      "7 apps built in the last two years alone",
      "Client projects across 4 companies",
      "Native iOS + cross-platform Flutter delivery",
      "In-App Purchases & monetization experience",
    ],
  },
];
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/content/skills.ts lib/content/achievements.ts
git commit -m "Add skills and achievements content data"
```

---

### Task 6: Content data — projects, experience, journey

**Files:**
- Create: `lib/content/projects.ts`
- Create: `lib/content/experience.ts`
- Create: `lib/content/journey.ts`

**Interfaces:**
- Produces: `ProjectItem` type (`{ slug, name, date, description, tags: string[], outcome, image: string | null }`) and `projects: ProjectItem[]` (7 entries, `image` set for the 3 with real screenshots extracted in Task 3, `null` for the other 4). `ExperienceRole` type (`{ id, title, org, dates, bullets: string[] }`) and `experience: ExperienceRole[]` (6 entries). `JourneyItem` type (`{ id, dateRange, title, org?, description, badge?, current? }`) and `journey: JourneyItem[]` (8 entries). Consumed by Task 17 (Projects), Task 18 (Experience), Task 15 (Journey).

- [ ] **Step 1: Create `lib/content/projects.ts`**

```ts
export type ProjectItem = {
  slug: string;
  name: string;
  date: string;
  description: string;
  tags: string[];
  outcome: string;
  image: string | null;
};

export const projects: ProjectItem[] = [
  {
    slug: "market-ember",
    name: "Market Ember",
    date: "2026",
    description:
      "Cross-platform market app built with Flutter, backed by Supabase Auth and a realtime database, on a scalable component architecture.",
    tags: ["Flutter", "Supabase", "Realtime"],
    outcome: "Optimized for a smooth, responsive experience across platforms",
    image: null,
  },
  {
    slug: "inspire-me-wellness",
    name: "Inspire Me Wellness",
    date: "2025–26",
    description:
      "Wellness tracker with AI-based notes for personalized insights — covering mood, sleep, hydration, habits, and cycle data.",
    tags: ["Flutter", "Supabase", "AI notes"],
    outcome: "Secure data management with AI-personalized wellness insights",
    image: null,
  },
  {
    slug: "blacklisted",
    name: "BlackListed",
    date: "2024",
    description:
      "Social networking platform for professional networking — realtime messaging, profiles, and an integrated marketplace with order tracking and inventory.",
    tags: ["iOS", "Socket.io", "Marketplace"],
    outcome: "Full social + commerce stack: auth, chat, listings, orders",
    image: "/images/blacklisted.webp",
  },
  {
    slug: "spendscope",
    name: "SpendScope",
    date: "2024–25",
    description:
      "Expense tracking app in SwiftUI with SwiftData persistence — budgeting, expense capture, and financial insights at a glance.",
    tags: ["SwiftUI", "SwiftData", "Charts"],
    outcome: "Snappy, native budgeting with clear financial insights",
    image: null,
  },
  {
    slug: "redverse",
    name: "Redverse",
    date: "2025",
    description:
      "Voter-awareness app in Flutter with Supabase auth and realtime data, built on a modular architecture with responsive UI/UX.",
    tags: ["Flutter", "Supabase", "Civic tech"],
    outcome: "Modular, reusable components with optimized performance",
    image: "/images/redverse.webp",
  },
  {
    slug: "roots-recipes",
    name: "Roots & Recipes",
    date: "2024–25",
    description:
      "SwiftUI recipe manager with voice input for hands-free capture and a clean, intuitive interface for browsing family recipes.",
    tags: ["SwiftUI", "Voice input"],
    outcome: "Hands-free recipe capture with a clean, usable UI",
    image: "/images/roots-recipes.webp",
  },
  {
    slug: "c-template",
    name: "C Template",
    date: "2025",
    description:
      "Flutter app serving ready-to-use social media content templates from Firebase Storage — generate once, share anywhere.",
    tags: ["Flutter", "Firebase", "Content"],
    outcome: "Lightweight cloud-asset pipeline for external sharing",
    image: null,
  },
];
```

- [ ] **Step 2: Create `lib/content/experience.ts`**

```ts
export type ExperienceRole = {
  id: string;
  title: string;
  org: string;
  dates: string;
  bullets: string[];
};

export const experience: ExperienceRole[] = [
  {
    id: "sunfocus-mobile",
    title: "Mobile Application Developer (iOS & Flutter)",
    org: "Sunfocus Solutions Pvt. Ltd. · Mohali",
    dates: "03/2025 — Present",
    bullets: [
      "Developed and maintained mobile applications using Flutter and iOS (Swift)",
      "Integrated Supabase backend with authentication and real-time data handling",
      "Worked on scalable architecture and reusable components",
      "Collaborated with cross-functional teams to deliver high-quality applications",
      "Enhanced UI/UX for better user engagement",
    ],
  },
  {
    id: "sunfocus-senior-ios",
    title: "Senior iOS Developer (Swift, SwiftUI)",
    org: "Sunfocus Solutions Pvt. Ltd. · Mohali",
    dates: "09/2022 — 03/2025",
    bullets: [
      "Developed and maintained iOS applications using Swift and SwiftUI",
      "Implemented complex features and integrated REST APIs",
      "Improved app performance and reduced crashes through optimization",
      "Collaborated with backend and design teams to deliver high-quality applications",
      "Followed clean architecture and best coding practices",
    ],
  },
  {
    id: "whizcamp-ios",
    title: "iOS App Developer",
    org: "Whizcamp · Mohali",
    dates: "12/2021 — 09/2022",
    bullets: [
      "Developed iOS applications from scratch using Swift",
      "Implemented core app features and API integrations",
      "Worked on multiple client projects with different business requirements",
      "Improved app stability and performance through debugging and optimization",
    ],
  },
  {
    id: "xicom-ios",
    title: "iOS Developer (Swift)",
    org: "Xicom Technologies Ltd · Chandigarh",
    dates: "04/2021 — 12/2021",
    bullets: [
      "Developed and maintained iOS applications using Swift",
      "Implemented core features and integrated REST APIs for client projects",
      "Improved app performance and resolved bugs to enhance user experience",
      "Collaborated with cross-functional teams to deliver scalable applications",
    ],
  },
  {
    id: "zapbuild-ios",
    title: "iOS Developer (Swift)",
    org: "Zapbuild · Mohali",
    dates: "06/2019 — 03/2021",
    bullets: [
      "Started professional career as an iOS developer working on real-world applications",
      "Developed core features using Swift and integrated REST APIs",
      "Worked on multiple client-based projects with different business requirements",
      "Gained strong understanding of mobile app architecture and debugging",
      "Collaborated with team members to deliver stable and scalable applications",
    ],
  },
  {
    id: "zapbuild-intern",
    title: "iOS Developer Intern (Swift)",
    org: "Zapbuild · Mohali",
    dates: "01/2019 — 05/2019",
    bullets: [
      "Assisted in iOS application development using Swift",
      "Worked on basic UI components and debugging tasks",
      "Learned mobile development fundamentals and team collaboration",
    ],
  },
];
```

- [ ] **Step 3: Create `lib/content/journey.ts`**

```ts
export type JourneyItem = {
  id: string;
  dateRange: string;
  title: string;
  org?: string;
  description: string;
  badge?: string;
  current?: boolean;
};

export const journey: JourneyItem[] = [
  {
    id: "bca",
    dateRange: "2014 — 2017",
    title: "BCA, Bachelor of Computer Applications",
    org: "Chaudhary Charan Singh University",
    description:
      "Where it all started — fundamentals of programming, data structures, and a growing fascination with how software gets built.",
    badge: "Top Performer — Academic Excellence Award",
  },
  {
    id: "mca",
    dateRange: "2017 — 2019",
    title: "Master of Computer Applications",
    org: "Lovely Professional University",
    description:
      "Deepened computer science foundations and discovered mobile development — the platform that would define the career ahead.",
  },
  {
    id: "zapbuild-intern",
    dateRange: "Jan 2019 — May 2019",
    title: "iOS Developer Intern",
    org: "Zapbuild · Mohali",
    description:
      "First steps into professional development — Swift fundamentals, UI components, debugging, and learning how real teams ship software.",
    badge: "First internship",
  },
  {
    id: "zapbuild-full",
    dateRange: "Jun 2019 — Mar 2021",
    title: "iOS Developer (Swift)",
    org: "Zapbuild · Mohali",
    description:
      "Converted the internship into a full-time role. Built core features for real-world client apps, integrated REST APIs, and developed a strong grasp of mobile architecture.",
    badge: "First full-time role",
  },
  {
    id: "xicom",
    dateRange: "Apr 2021 — Dec 2021",
    title: "iOS Developer (Swift)",
    org: "Xicom Technologies · Chandigarh",
    description:
      "Delivered scalable client applications with cross-functional teams — sharpening performance optimization and production debugging skills.",
  },
  {
    id: "whizcamp",
    dateRange: "Dec 2021 — Sep 2022",
    title: "iOS App Developer",
    org: "Whizcamp · Mohali",
    description:
      "Built iOS apps from scratch across multiple client projects with very different business requirements — end-to-end ownership from architecture to App Store.",
  },
  {
    id: "sunfocus-senior",
    dateRange: "Sep 2022 — Mar 2025",
    title: "Senior iOS Developer (Swift, SwiftUI)",
    org: "Sunfocus Solutions · Mohali",
    description:
      "Stepped into seniority — complex SwiftUI features, clean architecture, crash reduction through systematic optimization, and mentoring through code quality.",
    badge: "Promoted to Senior",
  },
  {
    id: "sunfocus-mobile",
    dateRange: "Mar 2025 — Present",
    title: "Mobile Application Developer (iOS & Flutter)",
    org: "Sunfocus Solutions · Mohali",
    description:
      "Now building cross-platform — shipping Flutter and native iOS apps with Supabase-powered backends, real-time data, and scalable, reusable architecture.",
    badge: "Current role — going cross-platform",
    current: true,
  },
];
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add lib/content/projects.ts lib/content/experience.ts lib/content/journey.ts
git commit -m "Add projects, experience, and journey content data"
```

---

### Task 7: Brand icon components

**Files:**
- Create: `components/ui/brand-icons.tsx`

**Interfaces:**
- Produces: `FlutterIcon({ className? })`, `SwiftIcon({ className? })`, `SupabaseIcon({ className? })` (default `h-4 w-4`, used in Hero's floating chips, Task 14), and `GithubIcon({ size? })`, `LinkedinIcon({ size? })` (default `size=19`, used in ContactLinks, Task 21). These preserve the exact brand mark paths from the prototype — not swapped for generic Lucide icons.

- [ ] **Step 1: Create `components/ui/brand-icons.tsx`**

```tsx
export function FlutterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "h-4 w-4"} aria-hidden>
      <path
        d="M13.9 2 4 11.9l3.05 3.05L21 1.95h-6.1L13.9 2zm.05 9.1-5 5L13.9 21H20l-6.05-6.05 4.1-4.1h-6.1l2 .25z"
        fill="#54C5F8"
      />
    </svg>
  );
}

export function SwiftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "h-4 w-4"} aria-hidden>
      <path
        d="M17.6 14.7c1.8-3.1 1.3-7-1.5-10.4 1.5 1.3 2.6 2.9 3.2 4.5 1.4 3.8.3 7.8-2.4 9.9-1.9 1.5-4.5 1.9-6.9 1.1-1.6-.5-3-1.5-4-2.8 1.5 1 3.3 1.3 4.9.8-2.4-1.5-4.5-3.6-6-6 .8.7 1.7 1.4 2.6 1.9-1.3-1.5-2.4-3.2-3.2-4.9 2.3 2.3 5 4.2 7.4 5.3-1.7-1.9-3.2-4.2-4.3-6.4 2.8 2.8 6 5.2 8.1 6.2 1.1.5 2 .8 2.1.8z"
        fill="#FA7343"
      />
    </svg>
  );
}

export function SupabaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className ?? "h-4 w-4"} aria-hidden>
      <path
        d="M13.3 21.4c-.5.7-1.7.3-1.7-.6v-7.6H4.4c-1 0-1.5-1.1-.9-1.9L10.7 2.6c.5-.7 1.7-.3 1.7.6v7.6h7.2c1 0 1.5 1.1.9 1.9l-7.2 8.7z"
        fill="#3ECF8E"
      />
    </svg>
  );
}

export function GithubIcon({ size = 19 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden>
      <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 4-2.4 4.8-4.6 5.1.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5a10.2 10.2 0 0 0 6.8-9.7C22 6.6 17.5 2 12 2z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 19 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden>
      <path d="M6.5 8.8v10.7H3.1V8.8h3.4zM4.8 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM20.9 13.4v6.1h-3.4v-5.7c0-1.4-.5-2.4-1.8-2.4-1 0-1.6.7-1.8 1.3-.1.2-.1.6-.1.9v5.9H10.4V8.8h3.4v1.5c.5-.7 1.3-1.7 3.1-1.7 2.3 0 4 1.5 4 4.8z" />
    </svg>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/brand-icons.tsx
git commit -m "Add brand icon components for Flutter, Swift, Supabase, GitHub, LinkedIn"
```

---

### Task 8: UI primitives — Kicker, SectionHead, GlowOrb

**Files:**
- Create: `components/ui/kicker.tsx`
- Create: `components/ui/section-head.tsx`
- Create: `components/ui/glow-orb.tsx`

**Interfaces:**
- Produces: `<Kicker>{children}</Kicker>`; `<SectionHead kicker title description? className? />`; `<GlowOrb size color? className? />`. All Server Components (no interactivity). Consumed by every section task (15–21).

- [ ] **Step 1: Create `components/ui/kicker.tsx`**

```tsx
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[12.5px] uppercase tracking-[0.18em] text-accent">
      <span className="h-px w-7 bg-accent/70" />
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/ui/section-head.tsx`**

```tsx
import { Kicker } from "./kicker";

export function SectionHead({
  kicker,
  title,
  description,
  className,
}: {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`grid max-w-[640px] gap-4 ${className ?? ""}`}>
      <Kicker>{kicker}</Kicker>
      <h2 className="text-balance text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[48px]">
        {title}
      </h2>
      {description && <p className="text-pretty text-[17px] text-text-2">{description}</p>}
    </div>
  );
}
```

- [ ] **Step 3: Create `components/ui/glow-orb.tsx`**

```tsx
export function GlowOrb({
  size,
  color = "accent",
  className,
}: {
  size: number;
  color?: "accent" | "accent-2";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 rounded-full blur-[110px] ${
        color === "accent-2" ? "bg-accent-2" : "bg-accent"
      } ${className ?? ""}`}
      style={{ width: size, height: size }}
    />
  );
}
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/ui/kicker.tsx components/ui/section-head.tsx components/ui/glow-orb.tsx
git commit -m "Add Kicker, SectionHead, GlowOrb primitives"
```

---

### Task 9: UI primitive — Button

**Files:**
- Create: `components/ui/button.tsx`

**Interfaces:**
- Produces: `<Button href variant="primary"|"ghost" external? className? >{children}</Button>`, a Server Component. Consumed by Hero (Task 14) and ContactForm submit styling reference (Task 21 reuses the same visual language inline since it's a `<button type="submit">`, not a link).

- [ ] **Step 1: Create `components/ui/button.tsx`**

```tsx
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

const base =
  "inline-flex items-center gap-2.5 rounded-full text-[15.5px] font-semibold transition-all hover:-translate-y-0.5";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 text-bg shadow-[0_4px_28px_rgba(34,211,238,0.35)] hover:shadow-[0_8px_36px_rgba(34,211,238,0.5)]",
  ghost:
    "border border-stroke bg-white/4 px-7 py-3.5 text-text backdrop-blur-sm hover:bg-white/8",
};

export function Button({ href, children, variant = "primary", external, className }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className ?? ""}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/button.tsx
git commit -m "Add Button primitive"
```

---

### Task 10: UI primitives — Reveal, RevealGroup, RevealItem

**Files:**
- Create: `components/ui/reveal.tsx`

**Interfaces:**
- Produces three Client Components: `<Reveal delay? className? >{children}</Reveal>` (standalone fade/slide-up on scroll into view), `<RevealGroup stagger? className? >{children}</RevealGroup>` (stagger container), `<RevealItem className? >{children}</RevealItem>` (stagger child, must be a direct child of `RevealGroup`). All respect `prefers-reduced-motion`. Consumed by Skills (16), Achievements (19), Testimonials (20), ContactLinks (21).

- [ ] **Step 1: Create `components/ui/reveal.tsx`**

```tsx
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.06,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/reveal.tsx
git commit -m "Add Reveal, RevealGroup, RevealItem scroll-animation primitives"
```

---

### Task 11: UI primitives — PhoneFrame, ProjectPlaceholderArt

**Files:**
- Create: `components/ui/phone-frame.tsx`
- Create: `components/ui/project-placeholder-art.tsx`

**Interfaces:**
- Produces: `<PhoneFrame>{children}</PhoneFrame>` (device bezel wrapper, `position: relative`, fixed 200×410 box so a `next/image fill` child works) and `<ProjectPlaceholderArt name />` (styled "coming soon" tile keyed off a project's initials). Both Server Components. Consumed by ProjectCard (Task 17).

- [ ] **Step 1: Create `components/ui/phone-frame.tsx`**

```tsx
export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[410px] w-[200px] overflow-hidden rounded-t-[32px] border-x-[6px] border-t-[6px] border-[#1c2029] bg-[#11141b] shadow-[0_-18px_60px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.05)]">
      <div className="absolute left-1/2 top-2 z-2 h-4 w-16 -translate-x-1/2 rounded-full bg-[#1c2029]" />
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/ui/project-placeholder-art.tsx`**

```tsx
export function ProjectPlaceholderArt({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-accent-soft to-white/[0.02]">
      <div className="grid place-items-center gap-3">
        <div className="grid h-16 w-16 place-items-center rounded-2xl border border-accent/25 bg-accent-soft font-mono text-xl text-accent">
          {initials}
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">
          Screenshot coming soon
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/phone-frame.tsx components/ui/project-placeholder-art.tsx
git commit -m "Add PhoneFrame and ProjectPlaceholderArt primitives"
```

---

### Task 12: Footer, and minimal page/layout wiring

**Files:**
- Create: `components/footer.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `<Footer />` (Server Component), and wires it into `app/layout.tsx` below `{children}` so every later section (added to `app/page.tsx` in Tasks 14–21) renders above a real footer from this point forward. `app/page.tsx` becomes an empty-but-valid shell ready for sections.

- [ ] **Step 1: Create `components/footer.tsx`**

```tsx
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-stroke-soft bg-bg py-9">
      <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-5 px-7 font-mono text-[12.5px] text-text-3">
        <div>© 2026 {site.name} — designed &amp; built with care</div>
        <div>
          {site.location} ·{" "}
          <a href={`mailto:${site.email}`} className="text-text-2 hover:text-accent">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Wire `Footer` into `app/layout.tsx`**

Update the body of `RootLayout` (from Task 2) to:

```tsx
import { Footer } from "@/components/footer";
// ...(existing imports stay)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg font-display text-text antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Replace `app/page.tsx` with an empty shell**

```tsx
export default function Home() {
  return null;
}
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
npm run build
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o "designed &amp; built with care"
kill %1
```

Expected: `tsc`/`build` succeed; curl prints the footer text (HTML-entity-encoded ampersand), confirming the footer renders on every page.

- [ ] **Step 5: Commit**

```bash
git add components/footer.tsx app/layout.tsx app/page.tsx
git commit -m "Add Footer and wire base layout/page shell"
```

---

### Task 13: Navbar (scroll blur, mobile menu, active-section spy)

**Files:**
- Create: `lib/use-active-section.ts`
- Create: `components/navbar.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `useActiveSection(): string` hook (tracks which section id is currently in view) and `<Navbar />` Client Component, wired into `app/layout.tsx` above `{children}`.

- [ ] **Step 1: Create `lib/use-active-section.ts`**

```ts
"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["top", "journey", "skills", "projects", "experience", "achievements", "contact"];

export function useActiveSection(): string {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}
```

- [ ] **Step 2: Create `components/navbar.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/lib/use-active-section";

const NAV_LINKS = [
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-100 border-b transition-colors duration-300 ${
        scrolled ? "border-stroke-soft bg-bg/72 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1140px] items-center justify-between gap-6 px-7">
        <Link href="#top" className="font-mono text-[15px] font-bold tracking-wide text-text">
          danish<span className="text-accent">.dev</span>
        </Link>
        <ul className="hidden gap-1.5 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-[14.5px] transition-colors ${
                  active === link.href.slice(1)
                    ? "bg-white/6 text-text"
                    : "text-text-2 hover:bg-white/6 hover:text-text"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="hidden rounded-full border border-stroke px-4 py-2 text-[13.5px] font-semibold text-text-2 transition-colors hover:text-text sm:block"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="rounded-full bg-text px-4.5 py-2 text-[14px] font-semibold text-bg transition-transform hover:-translate-y-px"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-[42px] w-[42px] place-items-center rounded-[10px] border border-stroke text-text md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <ul className="flex flex-col gap-0.5 border-b border-stroke bg-bg/96 px-6 pb-6 pt-4 backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3.5 py-3 text-[16px] text-text-2 hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3.5 py-3 text-[16px] text-text-2 hover:text-text"
            >
              Resume
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
```

- [ ] **Step 3: Wire `Navbar` into `app/layout.tsx`**

```tsx
import { Navbar } from "@/components/navbar";
// ...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg font-display text-text antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
npm run build
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o "Let&#x27;s talk"
kill %1
```

Expected: both commands succeed; curl finds the nav CTA text in the rendered HTML (apostrophe HTML-escaped by React).

- [ ] **Step 5: Manual check**

Open `http://localhost:3000` in a browser at a narrow width (< 768px) and confirm the burger button opens/closes the mobile menu, and that scrolling down adds the blurred nav background.

- [ ] **Step 6: Commit**

```bash
git add lib/use-active-section.ts components/navbar.tsx app/layout.tsx
git commit -m "Add Navbar with scroll blur, mobile menu, and active-section spy"
```

---

### Task 14: Hero section

**Files:**
- Create: `components/hero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `<Hero />` Client Component (headline, tagline, CTAs incl. Resume, animated stat counters, floating brand chips, portrait). Wired as the first section in `app/page.tsx`. Consumes `site` (Task 4), `Button` (Task 9), `GlowOrb` (Task 8), `FlutterIcon`/`SwiftIcon`/`SupabaseIcon` (Task 7), and `/images/portrait.webp` (Task 3).

- [ ] **Step 1: Create `components/hero.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "@/components/ui/glow-orb";
import { FlutterIcon, SwiftIcon, SupabaseIcon } from "@/components/ui/brand-icons";
import { site } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

const STATS = [
  { value: 7, suffix: "+", label: "Years experience" },
  { value: 7, suffix: "", label: "Apps shipped recently" },
  { value: 5, suffix: "", label: "Certifications" },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = String(to);
      return;
    }
    const controls = animate(count, to, {
      duration: 1.2,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (value) => {
        if (ref.current) ref.current.textContent = String(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [inView, to, reduce, count]);

  return <span ref={ref}>0</span>;
}

function FloatingChip({
  icon,
  label,
  className,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  className: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -9, 0] }}
      transition={{ duration: 5.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute z-3 flex items-center gap-2 whitespace-nowrap rounded-xl border border-stroke bg-[rgba(13,15,21,0.85)] px-4 py-2.5 font-mono text-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-md ${className}`}
    >
      {icon}
      {label}
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <header id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-[140px]">
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[length:56px_56px] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black_30%,transparent_75%)]"
      />
      <GlowOrb size={560} color="accent" className="-right-[120px] -top-[180px] opacity-[0.11]" />
      <GlowOrb size={480} color="accent-2" className="-bottom-[200px] -left-[140px] opacity-[0.09]" />

      <div className="relative z-2 mx-auto grid w-full max-w-[1140px] grid-cols-1 items-center gap-16 px-7 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <motion.div
            initial={reduce ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-stroke bg-white/3 px-4 py-1.5 font-mono text-[12.5px] text-text-2"
          >
            <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-emerald-400" />
            Available for new projects
          </motion.div>

          <motion.h1
            initial={reduce ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-[46px] font-bold leading-[1.02] tracking-[-0.03em] sm:text-[62px] lg:text-[84px]"
          >
            Danish Khan
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              builds mobile apps
            </span>
            <br />
            people love.
          </motion.h1>

          <motion.div
            initial={reduce ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 mt-4 font-mono text-[15px] text-text-2 sm:text-[19px]"
          >
            Mobile App Developer — iOS · Swift · SwiftUI · Flutter
            <span className="ml-1 inline-block h-[1.1em] w-[9px] animate-[blink_1.1s_step-end_infinite] bg-accent align-text-bottom" />
          </motion.div>

          <motion.p
            initial={reduce ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-[540px] text-[18px] text-text-2"
          >
            7+ years crafting scalable, performance-driven iOS and cross-platform applications
            — from first internship commit to shipping production apps powered by Swift,
            Flutter, and Supabase.
          </motion.p>

          <motion.div
            initial={reduce ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-9 flex flex-wrap gap-3.5"
          >
            <Button href="#projects" variant="primary">
              View Projects <span>→</span>
            </Button>
            <Button href="#contact" variant="ghost">
              Contact Me
            </Button>
            <Button href={site.resumePath} variant="ghost" external>
              Resume
            </Button>
          </motion.div>

          <motion.div
            initial={reduce ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-14 flex flex-wrap gap-9"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="grid gap-0.5">
                <b className="text-[30px] font-bold tabular-nums tracking-[-0.02em]">
                  <Counter to={stat.value} />
                  <em className="not-italic text-accent">{stat.suffix}</em>
                </b>
                <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-text-3">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? "show" : "hidden"}
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative grid justify-items-center pl-[24px] lg:justify-items-stretch lg:pl-[52px]"
        >
          <div className="relative rounded-[28px] border border-stroke bg-gradient-to-br from-white/7 to-white/[0.015] p-3.5 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-md">
            <Image
              src="/images/portrait.webp"
              alt="Portrait of Danish Khan"
              width={280}
              height={340}
              priority
              className="rounded-[18px] object-cover"
            />
            <FloatingChip icon={<FlutterIcon />} label="Flutter" className="left-[-52px] top-[26px]" delay={0} />
            <FloatingChip icon={<SwiftIcon />} label="SwiftUI" className="bottom-[70px] right-[-44px]" delay={0.8} />
            <FloatingChip icon={<SupabaseIcon />} label="Supabase" className="bottom-[-16px] left-[-20px]" delay={1.6} />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Wire `Hero` into `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npm run build
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o "builds mobile apps"
kill %1
```

Expected: succeeds; curl finds the hero headline text.

- [ ] **Step 4: Manual check**

In the browser, confirm: stat counters animate up from 0 on load, the cursor blinks next to the role line, the three brand chips float gently, and the "Resume" button opens the PDF in a new tab.

- [ ] **Step 5: Commit**

```bash
git add components/hero.tsx app/page.tsx
git commit -m "Add Hero section with animated counters and floating brand chips"
```

---

### Task 15: Journey (timeline) section

**Files:**
- Create: `components/journey.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `<Journey />` Client Component (scroll-driven fill bar + timeline cards). Wired into `app/page.tsx` after `Hero`. Consumes `journey` (Task 6), `SectionHead` (Task 8), `GlowOrb` (Task 8).

- [ ] **Step 1: Create `components/journey.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SectionHead } from "@/components/ui/section-head";
import { GlowOrb } from "@/components/ui/glow-orb";
import { journey } from "@/lib/content/journey";

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative overflow-hidden border-y border-stroke-soft bg-bg-elev py-[110px]">
      <GlowOrb size={500} color="accent-2" className="right-[-200px] top-[10%] opacity-[0.06]" />
      <div className="relative mx-auto max-w-[1140px] px-7">
        <SectionHead
          kicker="My Journey"
          title="From college labs to production apps."
          description="Every milestone built on the last — a steady climb from BCA classrooms to architecting iOS and Flutter applications used in the real world."
          className="mb-14"
        />

        <div ref={containerRef} className="relative z-1">
          <div className="absolute bottom-1.5 left-[19px] top-1.5 w-0.5 bg-gradient-to-b from-transparent via-stroke to-transparent" />
          <motion.div
            style={{ height: reduce ? "100%" : fillHeight }}
            className="absolute left-[19px] top-1.5 w-0.5 bg-gradient-to-b from-accent to-accent-2 shadow-[0_0_14px_rgba(34,211,238,0.5)]"
          />
          <div className="grid gap-0">
            {journey.map((item) => (
              <div key={item.id} className="relative pb-[52px] pl-[72px] last:pb-0">
                <div className="absolute left-2 top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-stroke bg-bg-elev">
                  <span className="h-2 w-2 rounded-full bg-text-3" />
                </div>
                <div className="font-mono text-[12.5px] uppercase tracking-[0.12em] text-accent">
                  {item.dateRange}
                </div>
                <div
                  className={`mt-2.5 max-w-[720px] rounded-[18px] border border-stroke-soft p-[26px_30px] transition-all hover:translate-x-1 hover:border-stroke hover:bg-white/[0.045] ${
                    item.current
                      ? "border-accent/35 bg-gradient-to-br from-accent-soft to-white/[0.02]"
                      : "bg-bg-card"
                  }`}
                >
                  <h3 className="text-[20px] font-semibold tracking-[-0.01em]">{item.title}</h3>
                  {item.org && <div className="mt-0.5 font-mono text-[14.5px] text-text-2">{item.org}</div>}
                  <p className="mt-3 text-pretty text-[15.5px] text-text-2">{item.description}</p>
                  {item.badge && (
                    <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 font-mono text-[11.5px] uppercase tracking-[0.1em] text-accent">
                      ★ {item.badge}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire `Journey` into `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";

export default function Home() {
  return (
    <>
      <Hero />
      <Journey />
    </>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npm run build
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o "From college labs to production apps"
kill %1
```

Expected: succeeds; curl finds the Journey heading.

- [ ] **Step 4: Manual check**

Scroll through the Journey section and confirm the vertical accent fill bar grows in sync with scroll position and reaches the bottom by the last timeline item.

- [ ] **Step 5: Commit**

```bash
git add components/journey.tsx app/page.tsx
git commit -m "Add Journey timeline section with scroll-driven fill"
```

---

### Task 16: Skills section

**Files:**
- Create: `components/skills.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `<Skills />` Server Component. Wired after `Journey`. Consumes `skills` (Task 5), `SectionHead` (Task 8), `RevealGroup`/`RevealItem` (Task 10).

- [ ] **Step 1: Create `components/skills.tsx`**

```tsx
import { SectionHead } from "@/components/ui/section-head";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { skills } from "@/lib/content/skills";

export function Skills() {
  return (
    <section id="skills" className="py-[110px]">
      <div className="mx-auto max-w-[1140px] px-7">
        <SectionHead
          kicker="Skills & Expertise"
          title="A full mobile toolkit, native and cross-platform."
          className="mb-14"
        />
        <RevealGroup className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <RevealItem
                key={skill.title}
                className="group relative grid gap-3 overflow-hidden rounded-[18px] border border-stroke-soft bg-bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/30 hover:bg-white/4"
              >
                <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="grid h-[46px] w-[46px] place-items-center rounded-[13px] border border-accent/22 bg-accent-soft text-accent">
                  <Icon size={22} />
                </div>
                <h3 className="text-[18.5px] font-semibold">{skill.title}</h3>
                <p className="text-pretty text-[14.5px] text-text-2">{skill.description}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stroke px-2.5 py-1 font-mono text-[11.5px] text-text-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire `Skills` into `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Journey />
      <Skills />
    </>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npm run build
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o "A full mobile toolkit"
kill %1
```

Expected: succeeds; curl finds the Skills heading fragment.

- [ ] **Step 4: Commit**

```bash
git add components/skills.tsx app/page.tsx
git commit -m "Add Skills section"
```

---

### Task 17: ProjectCard and Projects section

**Files:**
- Create: `components/project-card.tsx`
- Create: `components/projects.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `<ProjectCard project={ProjectItem} />` Client Component (hover lift + phone-frame rise) and `<Projects />` Server Component (grid, wired after `Skills`). Consumes `projects` (Task 6), `PhoneFrame`/`ProjectPlaceholderArt` (Task 11), `SectionHead`/`GlowOrb` (Task 8).

- [ ] **Step 1: Create `components/project-card.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { ProjectPlaceholderArt } from "@/components/ui/project-placeholder-art";
import type { ProjectItem } from "@/lib/content/projects";

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="grid overflow-hidden rounded-[22px] border border-stroke-soft bg-bg-card transition-colors hover:border-accent/32 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="relative flex h-[300px] items-end justify-center overflow-hidden border-b border-stroke-soft bg-[radial-gradient(120%_100%_at_50%_0%,rgba(34,211,238,0.14),transparent_60%),#0a0c12] px-[34px] pt-[34px]">
        <motion.div whileHover={{ y: -12 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}>
          <PhoneFrame>
            {project.image ? (
              <Image src={project.image} alt={`${project.name} screenshot`} fill className="object-cover" />
            ) : (
              <ProjectPlaceholderArt name={project.name} />
            )}
          </PhoneFrame>
        </motion.div>
      </div>
      <div className="grid gap-3 p-[26px_30px_30px]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[21px] font-semibold tracking-[-0.01em]">{project.name}</h3>
          <span className="whitespace-nowrap font-mono text-[11.5px] text-text-3">{project.date}</span>
        </div>
        <p className="text-pretty text-[15px] text-text-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[11.5px] text-accent">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex items-baseline gap-2 text-[14px] text-text-2">
          <span className="font-mono text-accent">→</span>
          {project.outcome}
        </div>
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 2: Create `components/projects.tsx`**

```tsx
import { SectionHead } from "@/components/ui/section-head";
import { GlowOrb } from "@/components/ui/glow-orb";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/content/projects";

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden border-y border-stroke-soft bg-bg-elev py-[110px]">
      <GlowOrb size={600} color="accent" className="left-[-250px] top-0 opacity-[0.05]" />
      <div className="relative mx-auto max-w-[1140px] px-7">
        <SectionHead
          kicker="Featured Projects"
          title="Recent work, shipped and in the wild."
          description="A selection of production apps shipped across native iOS and cross-platform Flutter."
          className="mb-14"
        />
        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire `Projects` into `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Journey />
      <Skills />
      <Projects />
    </>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
npm run build
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o "Market Ember"
curl -s http://localhost:3000 | grep -o "Screenshot coming soon"
kill %1
```

Expected: both greps find matches (confirms real project data renders and the placeholder art shows for the 4 projects without screenshots).

- [ ] **Step 5: Manual check**

Hover a project card in the browser and confirm the whole card lifts and the phone-frame inside rises further, and that the 3 projects with real screenshots (BlackListed, Redverse, Roots & Recipes) show their actual images.

- [ ] **Step 6: Commit**

```bash
git add components/project-card.tsx components/projects.tsx app/page.tsx
git commit -m "Add ProjectCard and Projects section"
```

---

### Task 18: Experience accordion

**Files:**
- Create: `components/experience.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `<Experience />` Client Component (accordion, one role open at a time, first role open by default). Wired after `Projects`. Consumes `experience` (Task 6), `SectionHead` (Task 8).

- [ ] **Step 1: Create `components/experience.tsx`**

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { experience } from "@/lib/content/experience";

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <section id="experience" className="py-[110px]">
      <div className="mx-auto max-w-[1140px] px-7">
        <SectionHead kicker="Experience" title="Professional history, in detail." className="mb-14" />
        <div className="grid gap-3.5">
          {experience.map((role) => {
            const open = openId === role.id;
            return (
              <div
                key={role.id}
                className={`overflow-hidden rounded-[18px] border bg-bg-card transition-colors ${
                  open ? "border-stroke" : "border-stroke-soft"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : role.id)}
                  className="grid w-full grid-cols-[1fr_auto_auto] items-center gap-5 p-[24px_28px] text-left"
                >
                  <span>
                    <span className="block text-[18px] font-semibold tracking-[-0.01em]">{role.title}</span>
                    <span className="mt-0.5 block font-mono text-[13px] text-text-2">{role.org}</span>
                  </span>
                  <span className="whitespace-nowrap font-mono text-[12.5px] text-text-3">{role.dates}</span>
                  <span
                    className={`grid h-[34px] w-[34px] flex-shrink-0 place-items-center rounded-full border transition-transform ${
                      open ? "rotate-180 border-accent text-accent" : "border-stroke text-text-2"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="grid gap-2.5 p-[0_28px_26px]">
                        {role.bullets.map((bullet) => (
                          <li key={bullet} className="relative pl-[22px] text-[15px] text-text-2">
                            <span className="absolute left-0 text-accent">▹</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire `Experience` into `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";

export default function Home() {
  return (
    <>
      <Hero />
      <Journey />
      <Skills />
      <Projects />
      <Experience />
    </>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npm run build
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o "Professional history, in detail"
kill %1
```

Expected: succeeds; curl finds the Experience heading.

- [ ] **Step 4: Manual check**

Click each role header in the browser and confirm it expands/collapses smoothly with the chevron rotating, and that keyboard `Tab` + `Enter` also toggles it.

- [ ] **Step 5: Commit**

```bash
git add components/experience.tsx app/page.tsx
git commit -m "Add Experience accordion section"
```

---

### Task 19: Achievements section

**Files:**
- Create: `components/achievements.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `<Achievements />` Server Component. Wired after `Experience`. Consumes `achievements` (Task 5), `SectionHead` (Task 8), `RevealGroup`/`RevealItem` (Task 10).

- [ ] **Step 1: Create `components/achievements.tsx`**

```tsx
import { SectionHead } from "@/components/ui/section-head";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { achievements } from "@/lib/content/achievements";

export function Achievements() {
  return (
    <section id="achievements" className="py-[110px]">
      <div className="mx-auto max-w-[1140px] px-7">
        <SectionHead kicker="Achievements" title="Recognition along the way." className="mb-14" />
        <RevealGroup className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((group) => {
            const Icon = group.icon;
            return (
              <RevealItem
                key={group.title}
                className="grid gap-3.5 rounded-[18px] border border-stroke-soft bg-bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/28"
              >
                <h3 className="flex items-center gap-3 text-[17px] font-semibold">
                  <span className="grid h-[38px] w-[38px] flex-shrink-0 place-items-center rounded-[11px] bg-accent-soft text-accent">
                    <Icon size={18} />
                  </span>
                  {group.title}
                </h3>
                <ul className="grid gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="relative pl-5 text-[14.5px] text-text-2">
                      <span className="absolute left-0 font-mono text-xs text-accent">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire `Achievements` into `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Achievements } from "@/components/achievements";

export default function Home() {
  return (
    <>
      <Hero />
      <Journey />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
    </>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npm run build
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o "Recognition along the way"
kill %1
```

Expected: succeeds; curl finds the Achievements heading.

- [ ] **Step 4: Commit**

```bash
git add components/achievements.tsx app/page.tsx
git commit -m "Add Achievements section"
```

---

### Task 20: Testimonials section (styled placeholder)

**Files:**
- Create: `components/testimonials.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `<Testimonials />` Server Component showing two "recommendations coming soon" cards with a dashed border (visually distinct from real content cards). Wired after `Achievements`. Consumes `SectionHead` (Task 8), `RevealGroup`/`RevealItem` (Task 10).

- [ ] **Step 1: Create `components/testimonials.tsx`**

```tsx
import { SectionHead } from "@/components/ui/section-head";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const SLOTS = [1, 2];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-[110px]">
      <div className="mx-auto max-w-[1140px] px-7">
        <SectionHead
          kicker="Recommendations"
          title="What colleagues say."
          description="Recommendations are on their way — check back soon."
          className="mb-14"
        />
        <RevealGroup className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
          {SLOTS.map((slot) => (
            <RevealItem
              key={slot}
              className="grid gap-[18px] rounded-[18px] border border-dashed border-stroke bg-bg-card p-[30px]"
            >
              <span className="font-serif text-[44px] leading-[0.6] text-accent/80">&ldquo;</span>
              <p className="text-pretty text-[15.5px] italic text-text-3">
                A recommendation is on its way — this slot will hold a quote from a manager,
                client, or teammate.
              </p>
              <div className="flex items-center gap-3">
                <div className="grid h-[42px] w-[42px] place-items-center rounded-full border border-stroke bg-white/6 font-mono text-[13px] text-text-3">
                  ?
                </div>
                <div>
                  <b className="block text-[14.5px] text-text-2">Coming soon</b>
                  <span className="font-mono text-[12px] text-text-3">Role · Company</span>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire `Testimonials` into `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Achievements } from "@/components/achievements";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Journey />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Testimonials />
    </>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npm run build
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o "What colleagues say"
kill %1
```

Expected: succeeds; curl finds the Testimonials heading.

- [ ] **Step 4: Commit**

```bash
git add components/testimonials.tsx app/page.tsx
git commit -m "Add Testimonials section with styled placeholder state"
```

---

### Task 21: Contact section (links + form)

**Files:**
- Create: `components/contact-links.tsx`
- Create: `components/contact-form.tsx`
- Create: `components/contact.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `<ContactLinks />` (Server Component, Reveal-wrapped list of Email/LinkedIn/GitHub/Phone links), `<ContactForm />` (Client Component, builds a `mailto:` link from form fields on submit), and `<Contact />` (Server Component composing both plus `SectionHead` and `GlowOrb`). Wired after `Testimonials` as the final section before the Footer. Consumes `site` (Task 4), `GithubIcon`/`LinkedinIcon` (Task 7), `Reveal` (Task 10).

- [ ] **Step 1: Create `components/contact-links.tsx`**

```tsx
import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

const LINKS = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  { icon: LinkedinIcon, label: "LinkedIn", value: site.linkedinHandle, href: site.linkedin, external: true },
  { icon: GithubIcon, label: "GitHub", value: site.githubHandle, href: site.github, external: true },
  { icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref, external: false },
];

export function ContactLinks() {
  return (
    <div className="mt-8 grid gap-3">
      {LINKS.map((link, i) => {
        const Icon = link.icon;
        return (
          <Reveal key={link.label} delay={i * 0.06}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener" : undefined}
              className="flex items-center gap-4 rounded-2xl border border-stroke-soft bg-bg-card p-[18px_22px] transition-all hover:translate-x-1.5 hover:border-accent/32 hover:bg-white/[0.045]"
            >
              <span className="grid h-[42px] w-[42px] flex-shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon size={19} />
              </span>
              <span>
                <b className="block text-[15px]">{link.label}</b>
                <span className="font-mono text-[12.5px] text-text-3">{link.value}</span>
              </span>
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/contact-form.tsx`**

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-[22px] border border-stroke bg-gradient-to-br from-white/[0.05] to-white/[0.015] p-[34px] backdrop-blur-md"
    >
      <h3 className="text-[21px] font-semibold">Send a message</h3>
      <div className="grid gap-1.5">
        <label htmlFor="cf-name" className="font-mono text-xs uppercase tracking-[0.1em] text-text-3">
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="rounded-xl border border-stroke bg-black/30 p-[13px_16px] text-[15px] text-text outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]"
        />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="cf-email" className="font-mono text-xs uppercase tracking-[0.1em] text-text-3">
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="rounded-xl border border-stroke bg-black/30 p-[13px_16px] text-[15px] text-text outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]"
        />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="cf-msg" className="font-mono text-xs uppercase tracking-[0.1em] text-text-3">
          Message
        </label>
        <textarea
          id="cf-msg"
          name="message"
          rows={5}
          required
          placeholder="Tell me about your project…"
          className="resize-y rounded-xl border border-stroke bg-black/30 p-[13px_16px] text-[15px] text-text outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 text-[15.5px] font-semibold text-bg transition-transform hover:-translate-y-0.5"
      >
        Send message →
      </button>
      <div className="font-mono text-xs text-text-3">Opens your email app with the message pre-filled.</div>
      {sent && (
        <div className="text-[14.5px] text-emerald-400">
          ✓ Draft opened in your email app — just hit send.
        </div>
      )}
    </form>
  );
}
```

- [ ] **Step 3: Create `components/contact.tsx`**

```tsx
import { SectionHead } from "@/components/ui/section-head";
import { GlowOrb } from "@/components/ui/glow-orb";
import { ContactLinks } from "@/components/contact-links";
import { ContactForm } from "@/components/contact-form";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-stroke-soft bg-bg-elev py-[110px]">
      <GlowOrb size={540} color="accent" className="bottom-[-220px] right-[-160px] opacity-[0.07]" />
      <div className="relative mx-auto grid max-w-[1140px] grid-cols-1 gap-11 px-7 lg:grid-cols-2 lg:gap-[60px]">
        <div>
          <SectionHead
            kicker="Contact"
            title="Let's build something together."
            description="Open to new projects, full-time roles, and interesting collaborations in mobile."
          />
          <ContactLinks />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Wire `Contact` into `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Achievements } from "@/components/achievements";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Journey />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Testimonials />
      <Contact />
    </>
  );
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
npm run build
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o "Let's build something together"
curl -s http://localhost:3000 | grep -o "danish11706493@gmail.com"
kill %1
```

Expected: both greps find matches.

- [ ] **Step 6: Manual check**

Fill out the contact form in the browser and submit; confirm it attempts to open a `mailto:` link with the name/email/message pre-filled, and the "Draft opened" confirmation line appears.

- [ ] **Step 7: Commit**

```bash
git add components/contact-links.tsx components/contact-form.tsx components/contact.tsx app/page.tsx
git commit -m "Add Contact section with links and mailto form"
```

---

### Task 22: SEO metadata, robots.ts, sitemap.ts

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`

**Interfaces:**
- Produces: full `Metadata` export in `app/layout.tsx` (title, description, Open Graph, Twitter Card, `metadataBase`), plus `app/robots.ts` and `app/sitemap.ts` default exports required by Next.js's file-based SEO conventions.

- [ ] **Step 1: Replace the `metadata` export in `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { site } from "@/lib/site";

const title = "Danish Khan — Mobile App Developer";
const description =
  "Danish Khan builds mobile apps people love — 7+ years crafting scalable, performance-driven iOS and cross-platform applications with Swift, SwiftUI, Flutter, and Supabase.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: site.url,
    images: ["/images/portrait.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/portrait.webp"],
  },
};
```

Keep the rest of `app/layout.tsx` (font setup, `RootLayout`) unchanged.

- [ ] **Step 2: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
npm run build
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -o 'property="og:title"'
curl -s http://localhost:3000/robots.txt
curl -s http://localhost:3000/sitemap.xml | head -5
kill %1
```

Expected: the OG meta tag is present in the HTML head; `robots.txt` prints `Allow: /` and a `Sitemap:` line; `sitemap.xml` prints valid XML with the site URL.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/robots.ts app/sitemap.ts
git commit -m "Add SEO metadata, robots.txt, and sitemap.xml"
```

---

### Task 23: Accessibility pass and final verification

**Files:**
- Modify: `components/navbar.tsx` (aria-label already present from Task 13 — verify, no functional change expected)
- Modify: `app/globals.css` (confirm focus-visible ring from Task 2 covers all interactive elements)

**Interfaces:**
- No new interfaces — this task verifies and, where needed, patches accessibility gaps across every component built in Tasks 12–21.

- [ ] **Step 1: Add explicit `aria-label`s to landmark sections lacking a visible heading association**

The Hero's `<header id="top">` has no `aria-label` (its `h1` already provides an accessible name via document structure, so none is needed). Confirm each `<section>` has exactly one `<h2>` (Journey, Skills, Projects, Experience, Achievements, Testimonials, Contact) by running:

```bash
grep -c "<h2" components/journey.tsx components/skills.tsx components/projects.tsx components/experience.tsx components/achievements.tsx components/testimonials.tsx components/contact.tsx
```

Expected: each file prints `1` (via `SectionHead`, which renders exactly one `<h2>`).

- [ ] **Step 2: Verify keyboard operability**

Run the dev server and manually Tab through the entire page:

```bash
npm run dev &
sleep 3
```

In the browser: Tab from the top of the page through the nav links, CTA buttons, skip to each project card, into the Experience accordion buttons (confirm `Enter`/`Space` toggles them and focus rings are visible per the `:focus-visible` rule from Task 2), through contact links, and into the contact form fields and submit button. Then:

```bash
kill %1
```

- [ ] **Step 3: Verify reduced-motion behavior**

In Chrome DevTools, enable "Emulate CSS prefers-reduced-motion: reduce" (Rendering tab), reload, and confirm: Hero content is visible immediately (no stuck-at-opacity-0 elements), the Journey fill bar is fully drawn without animating, floating chips don't move, and stat counters show final values immediately.

- [ ] **Step 4: Full responsive walkthrough**

```bash
npm run dev &
sleep 3
```

In the browser, test at three widths — 375px (mobile), 834px (tablet), 1440px (desktop) — and confirm for each: the nav collapses to a burger menu below 768px and expands above it, the Skills/Achievements grids reflow from 3 → 2 → 1 columns, the Projects grid reflows from 2 → 1 column, the Hero's portrait card doesn't overlap the headline text, and the Contact section stacks the form under the links on narrow widths. Then:

```bash
kill %1
```

- [ ] **Step 5: Final build and lint check**

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Expected: all three exit 0 with no errors or warnings.

- [ ] **Step 6: Commit (only if Step 1 required code changes; otherwise skip)**

```bash
git add -A
git commit -m "Accessibility verification pass"
```

If no files changed in this task, there is nothing to commit — the site already satisfies the accessibility checklist from prior tasks' focus-visible styles and semantic markup.

---

## Self-Review Notes

- **Spec coverage**: every spec section maps to a task — Architecture → Tasks 1–2, 12–13; Visual polish → embedded in every component's Tailwind classes (exact px values ported from the prototype CSS); Animation plan → Tasks 10, 13–15, 17–18; Images → Task 3, 6, 17; SEO/Performance/Accessibility → Tasks 22–23; Testing/Verification → every task's Step N "Verify" block plus Task 23.
- **Placeholder scan**: no "TBD"/"TODO" strings; the one forward-looking value (`site.url = "https://danishkhan.dev"`) is a real, working default flagged with a one-line note to update once a domain is registered — not an unfinished stub.
- **Type consistency**: `ProjectItem`, `ExperienceRole`, `JourneyItem`, `SkillItem`, `AchievementGroup` are each defined once (Tasks 5–6) and imported by exact name everywhere they're consumed (Tasks 15–21); `site` fields (`email`, `phone`, `phoneHref`, `linkedin`, `linkedinHandle`, `github`, `githubHandle`, `resumePath`, `url`) are defined once in Task 4 and referenced by the same names in Tasks 13, 14, 21, 22.
