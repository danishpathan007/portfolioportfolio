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
