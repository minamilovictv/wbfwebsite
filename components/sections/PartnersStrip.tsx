import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/sanity/client";
import type { Partner } from "@/types";

const FALLBACK_DONORS = [
  { name: "🇪🇺 European Union", slug: "european-union" },
  { name: "🇨🇭 Switzerland", slug: "switzerland" },
  { name: "🇯🇵 Japan", slug: "japan" },
  { name: "🇩🇪 Germany", slug: "germany" },
  { name: "🔷 Visegrad Fund", slug: "visegrad-fund" },
  { name: "◆ Open Society Foundations", slug: "open-society-foundations" },
];

function donorSlug(partner: Partner): string {
  return (
    partner.slug?.current ??
    partner.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

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
              const logoUrl = getImageUrl(partner.logo, { width: 320, height: 160 });
              const inner = logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={partner.name}
                  width={160}
                  height={80}
                  className="object-contain max-h-12 w-auto hover:scale-105 transition-transform"
                />
              ) : (
                <span className="text-sm font-semibold text-slate-600 hover:text-brand-700 transition-colors">
                  {partner.name}
                </span>
              );
              return (
                <Link
                  key={partner._id}
                  href={`/donors/${donorSlug(partner)}`}
                  aria-label={`Learn more about ${partner.name}`}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center divide-x divide-slate-200">
            {FALLBACK_DONORS.map(({ name, slug }) => (
              <div key={name} className="px-7 py-3">
                <Link
                  href={`/donors/${slug}`}
                  className="text-sm font-semibold text-slate-600 hover:text-brand-700 transition-colors"
                >
                  {name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
