import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowUpRight, ArrowRight, Handshake, CalendarDays } from "lucide-react";
import { sanityFetch, getLogoUrl } from "@/lib/sanity/client";
import { partnersQuery } from "@/lib/sanity/queries";
import { donorSlug } from "@/lib/utils/partners";
import { FALLBACK_PARTNER_NAMES } from "@/lib/about-content";
import type { Partner } from "@/types";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Donors & Partners",
  description:
    "The Western Balkans Fund works with international donors and regional organizations — the European Union, Switzerland, Japan, Germany, AICS, the International Visegrad Fund, and partners across the region.",
};

const CATEGORY_LABELS: Record<string, string> = {
  donor: "Donors",
  "strategic-partner": "Strategic Partners",
  "institutional-partner": "Institutional Partners",
  "programme-partner": "Programme Partners",
  "regional-partner": "Regional Partners",
  "implementing-partner": "Implementing Partners",
  "network-member": "Network Members",
  observer: "Observers",
};

const CATEGORY_ORDER = [
  "donor",
  "strategic-partner",
  "institutional-partner",
  "programme-partner",
  "regional-partner",
  "implementing-partner",
  "network-member",
  "observer",
];

const STATUS_LABELS: Record<string, string> = {
  active: "Active partnership",
  concluded: "Concluded",
  paused: "Paused",
};

function PartnerCard({ partner }: { partner: Partner }) {
  const logoUrl = getLogoUrl(partner.logo, 400);
  const roles = [
    partner.isFundingPartner && "Funding",
    partner.isImplementingPartner && "Implementing",
    partner.isStrategicPartner && "Strategic",
  ].filter(Boolean) as string[];

  return (
    <div className="card p-6 flex flex-col">
      {/* Logo — never cropped, consistent height, centered */}
      <div className="flex items-center justify-center h-20 mb-5 bg-slate-50 rounded-md px-6">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={partner.name}
            width={220}
            height={80}
            className="max-h-14 max-w-full w-auto h-auto object-contain"
          />
        ) : (
          <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
            <Handshake className="w-6 h-6 text-brand-600" />
          </div>
        )}
      </div>

      <h3 className="font-semibold text-slate-900 leading-snug">
        {partner.name}
        {partner.shortName && (
          <span className="text-slate-400 font-normal"> · {partner.shortName}</span>
        )}
      </h3>

      {/* Partnership information */}
      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {partner.startYear && (
          <span className="badge badge-neutral">
            <CalendarDays className="w-3 h-3" /> Since {partner.startYear}
          </span>
        )}
        {partner.status && (
          <span className={partner.status === "active" ? "badge badge-success" : "badge badge-neutral"}>
            {STATUS_LABELS[partner.status] ?? partner.status}
          </span>
        )}
        {roles.map((role) => (
          <span key={role} className="badge badge-primary">
            {role}
          </span>
        ))}
      </div>

      {partner.description && (
        <p className="text-sm text-slate-500 leading-relaxed mt-3 flex-1">{partner.description}</p>
      )}

      {/* Optional impact metrics */}
      {(partner.impactMetrics?.length ?? 0) > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {partner.impactMetrics!.slice(0, 4).map((m) => (
            <div key={m._key ?? m.label} className="bg-slate-50 rounded-md px-3 py-2">
              <div className="text-sm font-bold text-brand-700">{m.value}</div>
              <div className="text-[11px] text-slate-500">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Optional supported programmes */}
      {(partner.supportedProgrammes?.length ?? 0) > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {partner.supportedProgrammes!
            .filter((p) => p.slug?.current)
            .slice(0, 4)
            .map((p) => (
              <Link
                key={p._id}
                href={`/programs/${p.slug!.current}`}
                className="badge badge-teal hover:bg-teal-100 transition-colors"
              >
                {p.title}
              </Link>
            ))}
        </div>
      )}

      {/* Links — always from the central partner record */}
      <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-100">
        <Link
          href={`/donors/${donorSlug(partner)}`}
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600 hover:text-brand-800 transition-colors"
        >
          Partnership profile <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        {partner.website && (
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-slate-500 hover:text-brand-700 transition-colors"
          >
            Website <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

export default async function DonorsPartnersPage() {
  let partners: Partner[] = [];
  try {
    partners = await sanityFetch<Partner[]>(partnersQuery, {}, { revalidate: 0, tags: ["partners"] });
  } catch {}

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category] ?? category,
    partners: partners.filter((p) => p.type === category),
  })).filter((g) => g.partners.length > 0);

  return (
    <>
      <PageHero
        overline="About"
        title="Donors & Partners"
        description="The Western Balkans Fund operates through a multi-donor model, channelling support from international partners directly to civil society and institutions across the Western Balkans."
        variant="compact"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Donors & Partners" },
        ]}
      />

      {groups.length > 0 ? (
        groups.map(({ category, label, partners: groupPartners }, i) => (
          <section
            key={category}
            className={`section-padding-sm ${i % 2 === 0 ? "bg-white" : "bg-section-alt"}`}
          >
            <div className="container-institutional">
              <SectionHeader overline={label} title={label} className="mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {groupPartners.map((partner) => (
                  <PartnerCard key={partner._id} partner={partner} />
                ))}
              </div>
            </div>
          </section>
        ))
      ) : (
        /* Fallback shown only when the CMS is unreachable */
        <section className="section-padding bg-white">
          <div className="container-institutional">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FALLBACK_PARTNER_NAMES.map((name) => (
                <div key={name} className="card p-6 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
                    <Handshake className="w-6 h-6 text-brand-600" />
                  </div>
                  <span className="font-semibold text-slate-800">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
