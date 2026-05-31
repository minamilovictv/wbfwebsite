import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Donors & Partners",
  description: "The Western Balkans Fund is supported by the European Union, Switzerland, Japan, Germany, the Visegrad Fund, and Open Society Foundations.",
};

const donors = [
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

export default function DonorsPartnersPage() {
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
            {donors.map(({ flag, name, desc }) => (
              <div key={name} className="card p-6">
                <div className="text-4xl mb-4">{flag}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
