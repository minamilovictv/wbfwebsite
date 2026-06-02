import type { Metadata } from "next";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { sanityFetch, getImageUrl } from "@/lib/sanity/client";
import { awardsQuery } from "@/lib/sanity/queries";
import { getCountryFlag, getCountryName } from "@/lib/utils/formatters";
import type { Award } from "@/types";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "WBF Champion Awards",
  description:
    "The WBF Champion Awards recognise outstanding grantee organisations and projects across the Western Balkans region.",
};

export default async function AwardsPage() {
  let awards: Award[] = [];
  try {
    awards = await sanityFetch<Award[]>(awardsQuery, {}, { revalidate: 0 });
  } catch {}

  return (
    <>
      <PageHero
        overline="Our Impact"
        title="WBF Champion Awards"
        description="Recognising outstanding contributions to regional cooperation, reconciliation, and European integration across the Western Balkans."
        variant="compact"
        breadcrumbs={[
          { label: "Our Impact", href: "/impact" },
          { label: "Champion Awards" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          {awards.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-gold-500" />
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
                Awards programme coming soon
              </h2>
              <p className="text-slate-500 leading-relaxed">
                The WBF Champion Awards programme will recognise the most impactful projects and
                organisations from each annual cycle. Details will be published here once the
                programme launches.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awards.map((a) => {
                const photo = getImageUrl(a.photo, { width: 600, height: 400 });
                return (
                  <div key={a._id} className="card overflow-hidden">
                    {photo ? (
                      <div className="relative h-44 bg-slate-100">
                        <Image src={photo} alt={a.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                      </div>
                    ) : (
                      <div className="h-32 bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center">
                        <Trophy className="w-10 h-10 text-gold-600" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-gold-700 mb-2 font-semibold uppercase tracking-wide">
                        {a.edition && <span>{a.edition}</span>}
                        {a.edition && a.category && <span>·</span>}
                        {a.category && <span>{a.category}</span>}
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-1">{a.title}</h3>
                      {a.winner && <p className="text-sm text-slate-600 mb-2">{a.winner}</p>}
                      {a.country && (
                        <p className="text-xs text-slate-500 mb-3">
                          {getCountryFlag(a.country)} {getCountryName(a.country)}
                        </p>
                      )}
                      {a.citation && (
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-4">
                          {a.citation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
