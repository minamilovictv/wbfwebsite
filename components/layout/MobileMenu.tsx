"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronDown, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { NAV_ITEMS, statusDot, deriveNavStatus, groupNavPrograms } from "@/lib/nav-items";
import type { NavProgram } from "@/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navPrograms?: NavProgram[];
}

export function MobileMenu({ isOpen, onClose, navPrograms = [] }: MobileMenuProps) {
  const programGroups = groupNavPrograms(navPrograms);
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    onClose();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl transition-transform duration-300 overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <span className="font-display font-bold text-brand-900 text-lg">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-sm hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CTA */}
        <div className="px-5 py-4 bg-brand-50 border-b border-brand-100">
          <Link
            href="/grants/open-calls"
            className="flex items-center justify-between text-brand-700 font-semibold text-sm"
          >
            <span>View Open Calls</span>
            <span className="badge badge-teal">Open Now</span>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="px-3 py-4 space-y-0.5" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => {
            const hasChildren = (item.dropdown && item.dropdown.length > 0) || item.mega;
            const isExpanded = expandedItem === item.label;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <div key={item.label}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => setExpandedItem(isExpanded ? null : item.label)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                        isActive
                          ? "bg-brand-50 text-brand-700"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                    {isExpanded && item.mega && (
                      <div className="ml-3 mt-0.5 space-y-3 border-l-2 border-slate-100 pl-3 py-1">
                        {programGroups.map((group) => (
                          <div key={group.key}>
                            <div className="px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 pb-1.5 mb-0.5 border-b border-slate-100">
                              {group.label}
                            </div>
                            {group.items.map((p) => (
                              <Link
                                key={p._id}
                                href={`/programs/${p.slug}`}
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                              >
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot[deriveNavStatus(p)]}`} />
                                {p.title}
                              </Link>
                            ))}
                          </div>
                        ))}
                        <Link
                          href="/knowledge-hub"
                          className="flex items-center justify-center gap-1.5 mx-3 px-3 py-2 bg-brand-800 text-white text-sm font-semibold rounded-sm hover:bg-brand-700 active:bg-brand-900 transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          Knowledge Hub
                        </Link>
                      </div>
                    )}
                    {isExpanded && !item.mega && item.dropdown && (
                      <div className="ml-3 mt-0.5 space-y-0.5 border-l-2 border-slate-100 pl-3">
                        {item.dropdown.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex flex-col px-3 py-2 rounded-md text-sm transition-colors hover:bg-slate-50"
                          >
                            <span className="font-medium text-slate-700">{child.label}</span>
                            {child.sub && (
                              <span className="text-xs text-slate-500 mt-0.5">
                                {child.sub}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-brand-50 text-brand-700"
                        : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-6 border-t border-slate-100 mt-4">
          <div className="space-y-2 text-sm text-slate-500">
            <a href="mailto:info@westernbalkansfund.org" className="block hover:text-brand-600">
              info@westernbalkansfund.org
            </a>
            <a href="tel:+35542400420" className="block hover:text-brand-600">
              +355 42 400420
            </a>
          </div>
          <div className="flex gap-2 mt-4 text-xs text-slate-400">
            {["EN", "SR", "MK", "AL", "BS"].map((lang) => (
              <button key={lang} className="hover:text-brand-600 transition-colors">
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
