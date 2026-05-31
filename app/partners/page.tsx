import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch, getImageUrl } from "@/lib/sanity/client";
import { partnersQuery } from "@/lib/sanity/queries";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import type { Partner, PartnerType } from "@/types";

export const metadata: Metadata = {
  title: "Partners & Donors",
  description: "Partners, donors, and strategic allies of the Western Balkans Fund.",
};

const typeLabels: Record<PartnerType, string> = {
  donor: "Donor",
  "implementing-partner": "Implementing Partner",
  "strategic-partner": "Strategic Partner",
  "network-member": "Network Member",
  observer: "Observer",
};

const typeVariants: Record<PartnerType, "primary" | "teal" | "gold" | "neutral"> = {
  donor: "gold",
  "implementing-partner": "teal",
  "strategic-partner": "primary",
  "network-member": "neutral",
  observer: "neutral",
};

export default async function PartnersPage() {
  let partners: Partner[] = [];
  try {
    partners = await sanityFetch<Partner[]>(partnersQuery, {}, { revalidate: 3600, tags: ["partners"] });
  } catch {}

  const donors = partners.filter((p) => p.type === "donor");
  const strategic = partners.filter((p) => ["strategic-partner", "implementing-partner"].includes(p.type));
  const network = partners.filter((p) => ["network-member", "observer"].includes(p.type));

  return (
    <>
      <PageHero
        overline="Network"
        title="Partners & Donors"
        description="WBF works with governments, international organisations, civil society, and the private sector to advance regional cooperation."
        variant="compact"
        breadcrumbs={[{ label: "Partners" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          {donors.length > 0 && (
            <div className="mb-14">
              <SectionHeader overline="Funding" title="Donors" className="mb-8" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {donors.map((p) => (
                  <PartnerCard key={p._id} partner={p} />
                ))}
              </div>
            </div>
          )}

          {strategic.length > 0 && (
            <div className="mb-14">
              <SectionHeader overline="Cooperation" title="Strategic & Implementing Partners" className="mb-8" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {strategic.map((p) => (
                  <PartnerCard key={p._id} partner={p} />
                ))}
              </div>
            </div>
          )}

          {network.length > 0 && (
            <div>
              <SectionHeader overline="Network" title="Network Members & Observers" className="mb-8" />
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {network.map((p) => (
                  <PartnerCard key={p._id} partner={p} compact />
                ))}
              </div>
            </div>
          )}

          {partners.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <p>Partner information coming soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function PartnerCard({ partner, compact = false }: { partner: Partner; compact?: boolean }) {
  const logoUrl = getImageUrl(partner.logo, { width: 200, height: 100 });
  const inner = (
    <div className={`card p-4 text-center flex flex-col items-center gap-3 hover:shadow-card-hover transition-shadow ${compact ? "h-24 justify-center" : "h-36 justify-center"}`}>
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={partner.name}
          width={compact ? 80 : 120}
          height={compact ? 40 : 60}
          className="object-contain max-h-12 opacity-70 hover:opacity-100 transition-opacity"
        />
      ) : (
        <span className="text-sm font-semibold text-slate-600">{partner.name}</span>
      )}
      {!compact && (
        <Badge variant={typeVariants[partner.type] ?? "neutral"} size="sm">
          {typeLabels[partner.type] ?? partner.type}
        </Badge>
      )}
    </div>
  );

  if (partner.website) {
    return (
      <a href={partner.website} target="_blank" rel="noopener noreferrer" aria-label={partner.name}>
        {inner}
      </a>
    );
  }
  return inner;
}
