import Image from "next/image";
import Link from "next/link";
import { getLogoUrl } from "@/lib/sanity/client";
import { dedupePartners, donorSlug } from "@/lib/utils/partners";
import type { Partner } from "@/types";

const FALLBACK_DONORS = [
  { name: "🇪🇺 European Union", slug: "europeanunion" },
  { name: "🇨🇭 Swiss Agency for Development and Cooperation", slug: "switzerland-seco-sdc" },
  { name: "🇯🇵 Government of Japan", slug: "japan" },
  { name: "🇩🇪 Federal Foreign Office of Germany", slug: "germany" },
  { name: "🔷 International Visegrad Fund", slug: "visegrad-fund" },
  { name: "◆ Open Society Foundations", slug: "open-society-foundations" },
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
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {dedupePartners(partners).map((partner) => {
              const logoUrl = getLogoUrl(partner.logo, 320);
              return (
                <Link
                  key={partner._id}
                  href={`/donors/${donorSlug(partner)}`}
                  aria-label={`Learn more about ${partner.name}`}
                  className="group flex items-center justify-center h-14 min-w-24 max-w-44"
                >
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={partner.name}
                      width={176}
                      height={56}
                      className="max-h-12 max-w-full w-auto h-auto object-contain group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-brand-700 transition-colors text-center leading-snug">
                      {partner.shortName ?? partner.name}
                    </span>
                  )}
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
