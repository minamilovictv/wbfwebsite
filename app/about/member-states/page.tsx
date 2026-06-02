import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sanityFetch } from "@/lib/sanity/client";
import { memberStatesQuery } from "@/lib/sanity/queries";
import type { MemberState } from "@/types";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Member States",
  description: "The six Western Balkans economies that established and support the Western Balkans Fund.",
};

const fallbackMembers = [
  {
    code: "AL",
    name: "Albania",
    flag: "🇦🇱",
    capital: "Tirana",
    population: "2.8M",
    languages: "Albanian",
    memberSince: "2015",
    focalPoint: "Ministry of Europe and Foreign Affairs",
    description:
      "Albania joined WBF as a founding member in 2015. Albanian civil society and youth organisations have been among the most active participants in WBF mobility and cooperation programmes.",
  },
  {
    code: "BA",
    name: "Bosnia and Herzegovina",
    flag: "🇧🇦",
    capital: "Sarajevo",
    population: "3.5M",
    languages: "Bosnian, Croatian, Serbian",
    memberSince: "2015",
    focalPoint: "Ministry of Civil Affairs of BiH",
    description:
      "Bosnia and Herzegovina contributes to WBF's multicultural dimension, bringing unique cross-community perspectives to regional cooperation initiatives.",
  },
  {
    code: "XK",
    name: "Kosovo*",
    flag: "🇽🇰",
    capital: "Pristina",
    population: "1.8M",
    languages: "Albanian, Serbian",
    memberSince: "2015",
    focalPoint: "Ministry of Foreign Affairs and Diaspora",
    description:
      "Kosovo's civil society sector is particularly active within WBF frameworks, driving youth mobility, cultural exchange and cross-border dialogue projects.",
  },
  {
    code: "MK",
    name: "North Macedonia",
    flag: "🇲🇰",
    capital: "Skopje",
    population: "2.1M",
    languages: "Macedonian, Albanian",
    memberSince: "2015",
    focalPoint: "Secretariat for European Affairs",
    description:
      "North Macedonia has been instrumental in advancing science and research cooperation through WBF, alongside strong participation in youth and cultural heritage programmes.",
  },
  {
    code: "ME",
    name: "Montenegro",
    flag: "🇲🇪",
    capital: "Podgorica",
    population: "0.6M",
    languages: "Montenegrin",
    memberSince: "2015",
    focalPoint: "Ministry of European Affairs",
    description:
      "Montenegro, as the smallest WBF member by population, punches above its weight in regional civil society engagement and environmental programme participation.",
  },
  {
    code: "RS",
    name: "Serbia",
    flag: "🇷🇸",
    capital: "Belgrade",
    population: "6.8M",
    languages: "Serbian",
    memberSince: "2015",
    focalPoint: "Office for European Integration",
    description:
      "Serbia hosts the WBF Secretariat in Belgrade and is the largest member state by population, contributing significantly to the Fund's regional economic development programmes.",
  },
];

export default async function MemberStatesPage() {
  let cms: MemberState[] = [];
  try {
    cms = await sanityFetch<MemberState[]>(memberStatesQuery, {}, { revalidate: 0 });
  } catch {}

  const members =
    cms.length > 0
      ? cms.map((m) => ({
          code: m.code,
          name: m.name,
          flag: m.flag ?? "",
          capital: m.capital ?? "",
          population: m.population ?? "",
          languages: m.languages ?? "",
          memberSince: m.memberSince ?? "",
          focalPoint: m.focalPoint ?? "",
          description: m.description ?? "",
        }))
      : fallbackMembers;

  return (
    <>
      <PageHero
        overline="About"
        title="Member States"
        description="The Western Balkans Fund was established by the governments of six Western Balkans economies committed to deeper regional cooperation."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Member States" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          <SectionHeader
            overline="Founding Members"
            title="Six Economies, One Region"
            description="All six Western Balkans economies are equal founding members of the Fund, each contributing to its governance and programming."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {members.map((m) => (
              <div key={m.code} className="card-institutional p-6">
                <div className="flex items-start gap-4">
                  <span className="text-5xl shrink-0">{m.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-display font-bold text-slate-900">{m.name}</h3>
                      <span className="badge badge-neutral text-xs">{m.code}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">{m.description}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span><strong className="text-slate-700">Capital:</strong> {m.capital}</span>
                      <span><strong className="text-slate-700">Population:</strong> {m.population}</span>
                      <span><strong className="text-slate-700">Languages:</strong> {m.languages}</span>
                      <span><strong className="text-slate-700">Member since:</strong> {m.memberSince}</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      <strong className="text-slate-700">National Focal Point:</strong> {m.focalPoint}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-slate-400 border-t border-slate-100 pt-4">
            * This designation is without prejudice to positions on status, and is in line with UNSC 1244/1999 and the ICJ Opinion on the Kosovo declaration of independence.
          </p>
        </div>
      </section>
    </>
  );
}
