import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/sanity/client";
import type { Partner } from "@/types";

interface PartnersStripProps {
  partners?: Partner[];
  title?: string;
}

export function PartnersStrip({
  partners = [],
  title = "Supported by our Partners & Donors",
}: PartnersStripProps) {
  if (partners.length === 0) return null;

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-100">
      <div className="container-institutional">
        <p className="text-center text-overline text-slate-400 mb-8">{title}</p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {partners.map((partner) => {
            const logoUrl = getImageUrl(partner.logo, { width: 160, height: 80 });
            const inner = logoUrl ? (
              <Image
                src={logoUrl}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain max-h-12 opacity-60 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0"
              />
            ) : (
              <span className="text-sm font-semibold text-slate-500">{partner.name}</span>
            );

            return partner.website ? (
              <a
                key={partner._id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.name}
                className="block"
              >
                {inner}
              </a>
            ) : (
              <div key={partner._id}>{inner}</div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/partners" className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors">
            View all partners →
          </Link>
        </div>
      </div>
    </section>
  );
}
