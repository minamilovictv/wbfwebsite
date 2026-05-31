"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/types";

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About WBF", href: "/about", description: "Our mandate, vision and history" },
      { label: "Governance", href: "/about/governance", description: "Board, Council and bodies" },
      { label: "Team", href: "/about/team", description: "Secretariat and leadership" },
      { label: "Member States", href: "/about/member-states", description: "Six Western Balkans economies" },
      { label: "Strategic Plan", href: "/about/strategic-plan", description: "2024–2028 strategy" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "All Programs", href: "/programs", description: "Full program portfolio" },
      { label: "Regional Cooperation", href: "/programs?pillar=regional-cooperation" },
      { label: "Youth Mobility", href: "/programs?pillar=youth-mobility" },
      { label: "Civil Society", href: "/programs?pillar=civil-society" },
      { label: "Environment", href: "/programs?pillar=environment" },
    ],
  },
  {
    label: "Grants",
    href: "/grants",
    badge: "Open",
    children: [
      { label: "Open Calls", href: "/grants/open-calls", description: "Currently accepting applications" },
      { label: "How to Apply", href: "/grants/how-to-apply", description: "Step-by-step guidance" },
      { label: "Eligibility", href: "/grants/eligibility", description: "Who can apply" },
      { label: "Grant Database", href: "/grants/database", description: "Search all past grants" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "All Projects", href: "/projects" },
      { label: "Success Stories", href: "/projects?featured=true" },
    ],
  },
  {
    label: "News & Events",
    href: "/news",
    children: [
      { label: "News", href: "/news", description: "Latest announcements" },
      { label: "Press Releases", href: "/news/press", description: "Official communications" },
      { label: "Publications", href: "/news/publications", description: "Reports and research" },
      { label: "Events", href: "/events", description: "Upcoming events" },
    ],
  },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

function DropdownMenu({
  items,
  isOpen,
}: {
  items: NavItem[];
  isOpen: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-lg shadow-institutional-lg border border-slate-100 overflow-hidden transition-all duration-200 origin-top",
        isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
      )}
    >
      <div className="py-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col px-4 py-2.5 hover:bg-slate-50 transition-colors group"
          >
            <span className="text-sm font-medium text-slate-800 group-hover:text-brand-600">
              {item.label}
            </span>
            {item.description && (
              <span className="text-xs text-slate-500 mt-0.5">{item.description}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function isActive(item: NavItem): boolean {
    if (item.href === "/" ) return pathname === "/";
    return pathname.startsWith(item.href);
  }

  return (
    <nav ref={navRef} className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => {
        const active = isActive(item);
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openMenu === item.label;

        return (
          <div key={item.label} className="relative">
            {hasChildren ? (
              <button
                onClick={() => setOpenMenu(isOpen ? null : item.label)}
                onMouseEnter={() => setOpenMenu(item.label)}
                className={cn(
                  "nav-link flex items-center gap-1 px-3 py-2 rounded-sm",
                  active && "nav-link-active"
                )}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                {item.label}
                {item.badge && (
                  <span className="ml-1 badge badge-teal text-2xs">{item.badge}</span>
                )}
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "nav-link flex items-center gap-1 px-3 py-2 rounded-sm",
                  active && "nav-link-active"
                )}
              >
                {item.label}
              </Link>
            )}

            {hasChildren && item.children && (
              <div onMouseLeave={() => setOpenMenu(null)}>
                <DropdownMenu items={item.children} isOpen={isOpen} />
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export { NAV_ITEMS };
