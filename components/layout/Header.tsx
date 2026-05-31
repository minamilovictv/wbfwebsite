"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-institutional border-b border-slate-100"
          : "bg-white border-b border-slate-100"
      )}
    >
      <div className="container-institutional flex items-center justify-between h-[4.5rem]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
          aria-label="Western Balkans Fund — Home"
        >
          {/* Logo mark */}
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-brand rounded-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg leading-none">
                  WBF
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-brand-900 font-display font-bold text-base leading-tight">
                Western Balkans
              </div>
              <div className="text-teal-600 font-sans text-xs font-semibold tracking-widest uppercase leading-tight">
                Fund
              </div>
            </div>
          </div>
        </Link>

        {/* Center — Desktop Navigation */}
        <Navigation />

        {/* Right — Actions */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-slate-500 hover:text-brand-600 hover:bg-slate-50 rounded-sm transition-colors hidden lg:flex"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            href="/apply"
            className="btn-primary btn-sm hidden lg:inline-flex"
          >
            Apply for Grants
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-sm transition-colors lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
