"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { NAV_ITEMS, statusDot, deriveNavStatus, groupNavPrograms } from "@/lib/nav-items";
import type { NavItem, DropdownItem } from "@/lib/nav-items";
import type { NavProgram, NavStatusKey } from "@/types";

// Programs are loaded from Sanity and passed via props.

// ── Simple dropdown ────────────────────────────────────────────────────────
function SimpleDropdown({ items }: { items: DropdownItem[] }) {
  return (
    <div className="absolute top-full left-0 pt-2 z-50">
      <div className="w-60 bg-white border border-slate-200 rounded-lg shadow-lg py-2">
        {items.map((item) => {
          const showSep = item.href === "/about/donors-partners";
          return (
            <div key={item.href}>
              {showSep && <div className="my-1.5 mx-1 border-t border-slate-100" />}
              <Link
                href={item.href}
                className="flex items-start gap-2.5 px-3 py-2 hover:bg-slate-50 hover:text-brand-800 transition-colors"
              >
                <div className="w-7 h-7 bg-slate-100 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-3 h-3 text-brand-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </span>
                </div>
                <div>
                  <span className="block text-[13px] font-semibold text-slate-800">{item.label}</span>
                  {item.sub && <span className="block text-[11px] text-slate-500 mt-0.5">{item.sub}</span>}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Mega dropdown ──────────────────────────────────────────────────────────
function MegaDropdown({ navPrograms }: { navPrograms: NavProgram[] }) {
  const groups = groupNavPrograms(navPrograms);

  return (
    <div className="absolute top-full left-0 pt-2 z-50">
      <div className="w-[560px] bg-white border border-slate-200 rounded-lg shadow-lg grid grid-cols-2 p-3.5">
        <div className="pr-4">
          {groups.map((group, i) => (
            <div key={group.key} className={i > 0 ? "mt-3" : undefined}>
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 pb-2 mb-1.5 border-b border-slate-100">
                {group.label}
              </div>
              {group.items.map((p) => (
                <Link
                  key={p._id}
                  href={`/programs/${p.slug}`}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-sm text-[13px] text-slate-600 hover:bg-slate-50 hover:text-brand-700 transition-colors"
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot[deriveNavStatus(p)]}`} />
                  {p.title}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="border-l border-slate-100 pl-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 pb-2 mb-2 border-b border-slate-100">
            Quick Access
          </div>
          <a
            href="https://wbfportal.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-0.5 p-2.5 bg-slate-50 rounded-lg mb-2 hover:bg-slate-100 transition-colors"
          >
            <span className="text-[13px] font-semibold text-brand-800">Apply Now via OGMS →</span>
            <span className="text-[11px] text-slate-500">Online Grant Management System</span>
          </a>
          <a
            href="https://wbfpartnership.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-0.5 p-2.5 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <span className="text-[13px] font-semibold text-brand-800">Find Partners →</span>
            <span className="text-[11px] text-slate-500">WBF Partnership Platform</span>
          </a>

          <div className="mt-3.5 pt-3.5 border-t border-slate-100">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-2">
              Status Guide
            </div>
            <div className="flex flex-col gap-1.5 text-[12px] text-slate-500">
              {[
                ["open",    "Open — accepting applications"],
                ["review",  "Under Review"],
                ["results", "Results Announced"],
                ["soon",    "Coming Soon"],
              ].map(([s, label]) => (
                <span key={s} className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full inline-block shrink-0 ${statusDot[s as NavStatusKey]}`} />
                  {label}
                </span>
              ))}
            </div>

            <Link
              href="/knowledge-hub"
              className="mt-3 flex items-center justify-center gap-1.5 px-3 py-2 bg-brand-800 text-white text-[12.5px] font-semibold rounded-sm hover:bg-brand-700 active:bg-brand-900 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Knowledge Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Nav item with hover delay ──────────────────────────────────────────────
function NavItemWithDropdown({
  item,
  active,
  navPrograms,
}: {
  item: NavItem;
  active: boolean;
  navPrograms: NavProgram[];
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, [cancelClose]);

  return (
    <div
      className="relative"
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-1 px-3.5 py-2 text-[14px] font-medium rounded-sm transition-colors whitespace-nowrap",
          active ? "text-brand-800 bg-slate-100" : "text-slate-600 hover:text-brand-800 hover:bg-slate-50"
        )}
      >
        {item.label}
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-150", open && "rotate-180")} />
      </Link>

      {open && !item.mega && item.dropdown && item.dropdown.length > 0 && (
        <SimpleDropdown items={item.dropdown} />
      )}
      {open && item.mega && <MegaDropdown navPrograms={navPrograms} />}
    </div>
  );
}

// ── Main Navigation ────────────────────────────────────────────────────────
export function Navigation({ navPrograms = [] }: { navPrograms?: NavProgram[] }) {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <nav className="hidden lg:flex items-center flex-1" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => {
        const hasDropdown = (item.dropdown && item.dropdown.length > 0) || item.mega;
        const active = isActive(item.href);

        if (hasDropdown) {
          return (
            <NavItemWithDropdown
              key={item.label}
              item={item}
              active={active}
              navPrograms={navPrograms}
            />
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-1 px-3.5 py-2 text-[14px] font-medium rounded-sm transition-colors whitespace-nowrap",
              active ? "text-brand-800 bg-slate-100" : "text-slate-600 hover:text-brand-800 hover:bg-slate-50"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
