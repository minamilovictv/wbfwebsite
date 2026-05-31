"use client";

import { useState } from "react";
import Link from "next/link";

const announcements = [
  {
    dot: "amber",
    text: "GGI Grants Call No. 8 — Evaluation underway · Results expected June 2026",
    href: "/programs/ggi",
  },
  {
    dot: "green",
    text: "Visegrad Fellowship 3rd Edition — Open until 30 June 2026",
    href: "/programs/visegrad-fellowship",
  },
  {
    dot: "green",
    text: "ERC Grants — Opening Autumn 2026 · Register for notification",
    href: "/programs/erc-grants",
  },
];

export function TopBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-brand-950 text-white/85 text-[13px] border-b border-white/6">
      <div className="container-institutional py-[9px]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8 overflow-hidden">
            {announcements.map(({ dot, text, href }) => (
              <Link
                key={text}
                href={href}
                className="flex items-center gap-2 whitespace-nowrap hover:text-white transition-colors shrink-0"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    dot === "green"
                      ? "bg-emerald-400 animate-pulse"
                      : "bg-amber-400"
                  }`}
                />
                {text}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-white/35 hover:text-white transition-colors text-xl leading-none shrink-0"
            aria-label="Dismiss announcements"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
