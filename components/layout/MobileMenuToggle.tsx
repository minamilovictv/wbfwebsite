"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

export function MobileMenuToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-slate-600 hover:text-brand-700 hover:bg-slate-50 rounded-sm transition-colors lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="w-6 h-6" />
      </button>
      <MobileMenu isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
