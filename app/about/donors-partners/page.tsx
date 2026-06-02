import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { sanityFetch, getImageUrl } from "@/lib/sanity/client";
import { donorsQuery } from "@/lib/sanity/queries";
import type { Donor } from "@/types";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Donors & Partners",
  description: "The Western Balkans Fund is supported by the European Union, Switzerland, Japan, Germany, the Visegrad Fund, and Open Society Foundations.",
};

const fallbackDonors = [
  {
    flag: "🇪🇺",
    name: "European Union — IPA III",
    desc: "The primary donor of the Western Balkans Fund, providing funding through the Instrument for Pre-Accession Assistance (IPA III) under the EU/WBF Joint Action programme.",
  },
  {
    flag: "🇨🇭",
    name: "Switzerland",
    desc: "Supporting WBF's regional cooperation programmes through the Swiss Agency for Development and Cooperation (SDC).",
  },
  {
    flag: "🇯🇵",
    name: "Japan",
    desc: "Funding WBF's Advocacy & Networking Events programme and the LeadBalkans platform through the Japanese Government.",
  },
  {
    flag: "🇩🇪",
    name: "Germany",
    desc: "Supporting WBF's civil society and democratic governance programmes through GIZ and the German Federal Foreign Office.",
  },
  {
    flag: "🔷",
    name: "Visegrad Fund",
    desc: "Partner in the Visegrad Fellowship programme, connecting Western Balkans youth with the V4 countries of Central Europe.",
  },
  {
    flag: "◆",
    name: "Open Society Foundations",
    desc: "Supporting WBF's civil society strengthening and independent media initiatives across the Western Balkans.",
  },
];

export default async function DonorsPartnersPage() {
  let cmsDonors: Donor[] = [];
  try {
    cmsDonors = await sanityFetch<Donor[]>(donorsQuery, {}, { revalidate: 0 });
  } catch {}

  const donors =
    cmsDonors.length > 0
      ? cmsDonors.map((d) => ({
          flag: d.country ?? "",
          name: d.name,
          desc: d.description ?? "",
          logoUrl: getImageUrl(d.logo, { width: 240, height: 120 }),
          website: d.website,
        }))
      : fallbackDonors.map((d) => ({ ...d, logoUrl: null, website: undefined }));

  return (
    <>
      <PageHero
        overline="About"
        title="Donors & Partners"
        description="The Western Balkans Fund operates through a multi-donor model, channelling co-funded grants from international partners directly to civil society and institutions across the WB6 region."
        variant="compact"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Donors & Partners" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {donors.map(({ flag, name, desc, logoUrl, website }) => {
              const Wrapper = website ? "a" : "div";
              return (
                <Wrapper
                  key={name}
                  {...(website
                    ? { href: website, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="card p-6 block"
                >
                  {logoUrl ? (
                    <div className="relative h-12 mb-4 flex items-start">
                      <Image src={logoUrl} alt={name} width={180} height={48} className="h-12 w-auto object-contain" />
                    </div>
                  ) : flag ? (
                    <div className="text-4xl mb-4">{flag}</div>
                  ) : null}
                  <h3 className="font-semibold text-slate-900 mb-2">{name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
