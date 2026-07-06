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
