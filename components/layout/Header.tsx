"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ExternalLink } from "lucide-react";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-30 w-full bg-white border-b border-slate-200 shadow-[0_2px_12px_rgba(26,54,104,0.08)]">
      <div className="container-institutional">
        <div className="flex items-center h-[68px] gap-0">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 mr-8 focus-visible:outline-none"
            aria-label="Western Balkans Fund — Home"
          >
            <div className="w-9 h-9 bg-brand-800 rounded-sm flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M5 20L12 4L19 20" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="4" r="2" fill="rgba(255,255,255,0.5)"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="text-[14px] font-semibold text-brand-800 leading-tight">
                Western Balkans Fund
              </div>
              <div className="text-[11px] text-slate-500 leading-tight">
                Building Regional Cooperation
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <Navigation />

          {/* Actions */}
          <div className="flex items-center gap-2.5 ml-auto shrink-0">
            <a
              href="https://wbfpartnership.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-[7px] text-[13px] font-semibold border border-slate-200 rounded-sm text-slate-600 hover:border-brand-800 hover:text-brand-800 transition-all"
            >
              Find Partners
            </a>
            <a
              href="https://wbfportal.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold bg-brand-800 text-white rounded-sm hover:bg-brand-700 transition-colors"
            >
              Apply Now
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-slate-600 hover:text-brand-700 hover:bg-slate-50 rounded-sm transition-colors lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
