import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { programsListQuery } from "@/lib/sanity/queries";
import { PageHero } from "@/components/ui/PageHero";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { ProgramFilters } from "@/components/programs/ProgramFilters";
import type { Program } from "@/types";

// Always render this page from fresh Sanity data (no static cache).
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore the Western Balkans Fund's full programme portfolio — from youth mobility to environmental initiatives.",
};

interface PageProps {
  searchParams: Promise<{ pillar?: string; status?: string }>;
}

export default async function ProgramsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  let programs: Program[] = [];

  try {
    programs = await sanityFetch<Program[]>(programsListQuery, {}, {
      revalidate: 0,
      tags: ["programs"],
    });
  } catch {
    // CMS not configured
  }

  const filtered = programs.filter((p) => {
    if (params.pillar && p.pillar !== params.pillar) return false;
    if (params.status && p.status !== params.status) return false;
    return true;
  });

  return (
    <>
      <PageHero
        overline="Programs"
        title="Our Programme Portfolio"
        description="WBF programmes span youth mobility, civil society, cultural heritage, economic development, environment, and more."
        breadcrumbs={[{ label: "Programs" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          <ProgramFilters activePillar={params.pillar} activeStatus={params.status} />

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filtered.map((program) => (
                <ProgramCard key={program._id} program={program} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-medium text-slate-600">No programs found</p>
              <p className="text-sm mt-1">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
