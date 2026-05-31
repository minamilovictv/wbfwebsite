"use client";

import Link from "next/link";
import { Phone, Mail, Globe } from "lucide-react";

const languages = [
  { code: "en", label: "EN" },
  { code: "sr", label: "SR" },
  { code: "mk", label: "MK" },
  { code: "al", label: "AL" },
  { code: "bs", label: "BS" },
];

export function TopBar() {
  return (
    <div className="bg-brand-900 text-slate-300 text-xs h-9 hidden md:flex items-center">
      <div className="container-institutional flex items-center justify-between w-full">
        {/* Left — contact info */}
        <div className="flex items-center gap-5">
          <a
            href="mailto:info@westernbalkansfund.org"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3 h-3" />
            info@westernbalkansfund.org
          </a>
          <a
            href="tel:+381112222333"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3" />
            +381 11 222 2333
          </a>
        </div>

        {/* Right — language + quick links */}
        <div className="flex items-center gap-4">
          <Link
            href="/grants/open-calls"
            className="text-gold-400 hover:text-gold-300 font-semibold transition-colors"
          >
            Open Calls
          </Link>
          <span className="text-slate-600">|</span>
          <Link href="/apply" className="hover:text-white transition-colors">
            Apply Now
          </Link>
          <span className="text-slate-600">|</span>

          {/* Language selector */}
          <div className="flex items-center gap-0.5">
            <Globe className="w-3 h-3 mr-1" />
            {languages.map((lang, i) => (
              <span key={lang.code} className="flex items-center">
                <button className="hover:text-white transition-colors px-1 font-medium">
                  {lang.label}
                </button>
                {i < languages.length - 1 && (
                  <span className="text-slate-600 text-xs">/</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
