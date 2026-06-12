// Navigation structure — plain data, no client/server boundary

import type { NavGroup, NavProgram, NavStatusKey, Status } from "@/types";

// ── Mega menu groups (Our Programs) ─────────────────────────────────────────
export const NAV_GROUPS: { key: NavGroup; label: string }[] = [
  { key: "funding", label: "Funding Opportunities" },
  { key: "conferences", label: "Conferences & Networking" },
  { key: "capacity", label: "Capacity Building" },
];

// Status dot colours for the mega menu
export const statusDot: Record<NavStatusKey, string> = {
  open:    "bg-emerald-500",
  review:  "bg-amber-400",
  soon:    "bg-slate-400",
  results: "bg-brand-600",
};

// Map Sanity status → mega-menu status-dot key
export function deriveNavStatus(p: { navStatus?: NavStatusKey; status?: Status }): NavStatusKey {
  if (p.navStatus) return p.navStatus;
  switch (p.status) {
    case "active":   return "open";
    case "upcoming": return "soon";
    case "closed":   return "results";
    case "archived": return "soon";
    default:         return "soon";
  }
}

export function groupNavPrograms(navPrograms: NavProgram[]) {
  return NAV_GROUPS.map((group) => ({
    ...group,
    items: navPrograms.filter((p) => (p.navGroup ?? "funding") === group.key),
  })).filter((group) => group.items.length > 0);
}

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
