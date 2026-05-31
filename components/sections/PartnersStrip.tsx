import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/sanity/client";
import type { Partner } from "@/types";

const FALLBACK_DONORS = [
  { name: "🇪🇺 European Union — IPA III" },
  { name: "🇨🇭 Switzerland" },
  { name: "🇯🇵 Japan" },
  { name: "🇩🇪 Germany" },
  { name: "🔷 Visegrad Fund" },
  { name: "◆ Open Society Foundations" },
];

interface PartnersStripProps {
  partners?: Partner[];
  title?: string;
}

export function PartnersStrip({ partners = [], title = "Supported By" }: PartnersStripProps) {
  return (
    <section className="py-14 bg-white border-t border-slate-100">
      <div className="container-institutional">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-8">
          {title}
        </p>

        {partners.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner) => {
              const logoUrl = getImageUrl(partner.logo, { width: 160, height: 80 });
              const inner = logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="object-contain max-h-10 opacity-55 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              ) : (
                <span className="text-sm font-semibold text-slate-400 hover:text-slate-700 transition-colors">
                  {partner.name}
                </span>
              );
              return partner.website ? (
                <a key={partner._id} href={partner.website} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={partner._id}>{inner}</div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center divide-x divide-slate-200">
            {FALLBACK_DONORS.map(({ name }) => (
              <div key={name} className="px-7 py-3">
                <span className="text-sm font-semibold text-slate-400 hover:text-slate-700 transition-colors cursor-default">
                  {name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
