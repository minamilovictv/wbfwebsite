// Navigation structure — plain data, no client/server boundary

export interface DropdownItem {
  label: string;
  href: string;
  sub?: string;
  external?: boolean;
  status?: "open" | "review" | "soon" | "results";
}

export interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
  mega?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About WBF",
    href: "/about",
    dropdown: [
      { label: "Who We Are",             href: "/about",                  sub: "Mission, mandate and history" },
      { label: "Structure & Governance", href: "/about/governance",       sub: "Board, secretariat, statutes" },
      { label: "Our Team",               href: "/about/team",             sub: "Secretariat and contacts" },
      { label: "Donors & Partners",      href: "/about/donors-partners",  sub: "EU, Switzerland, Japan, Germany…" },
      { label: "Accountability",         href: "/about/accountability",   sub: "Reports and financial statements" },
    ],
  },
  {
    label: "Our Programs",
    href: "/programs",
    mega: true,
    dropdown: [],
  },
  {
    label: "Our Impact",
    href: "/impact",
    dropdown: [
      { label: "Impact Overview",      href: "/impact",          sub: "Numbers, geography, reach" },
      { label: "Grantee Stories",      href: "/impact/stories",  sub: "In-depth project highlights" },
      { label: "WBF Champion Awards",  href: "/impact/awards",   sub: "Annual recognition program" },
    ],
  },
  { label: "Our Grantees", href: "/grantees" },
  {
    label: "News & Events",
    href: "/news",
    dropdown: [
      { label: "News",   href: "/news",   sub: "Stories, announcements, updates" },
      { label: "Events", href: "/events", sub: "Info sessions, ceremonies, networking" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
