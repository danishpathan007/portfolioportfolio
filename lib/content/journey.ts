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
