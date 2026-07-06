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
