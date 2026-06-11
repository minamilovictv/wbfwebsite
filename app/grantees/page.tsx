import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { sanityFetch } from "@/lib/sanity/client";
import { projectsListQuery } from "@/lib/sanity/queries";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { GranteeFilters, type ProgramOption } from "@/components/projects/GranteeFilters";
import type { Project } from "@/types";

// Always render this page from fresh Sanity data (no static cache).
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Our Grantees",
  description: "Browse all projects and organisations funded by the Western Balkans Fund across the WB6 region.",
};

interface PageProps {
  searchParams: Promise<{ program?: string; country?: string; type?: string; area?: string }>;
}

export default async function GranteesPage({ searchParams }: PageProps) {
  const { program, country, type, area } = await searchParams;

  // The query orders by Period of Implementation (end date, falling back to
  // start date), most recent first.
  let projects: Project[] = [];
  try {
    projects = await sanityFetch<Project[]>(projectsListQuery, {}, {
      revalidate: 0,
      tags: ["projects"],
    });
  } catch {}

  const programOptions: ProgramOption[] = [
    ...new Map(
      projects
        .filter((p) => p.program?.slug?.current)
        .map((p) => [p.program!.slug.current, { slug: p.program!.slug.current, title: p.program!.title }])
    ).values(),
  ].sort((a, b) => a.title.localeCompare(b.title));

  const filtered = projects.filter((p) => {
    if (program && p.program?.slug?.current !== program) return false;
    if (country && !(p.countries ?? []).includes(country as Project["countries"][number])) return false;
    if (type && (p.granteeType ?? "organization") !== type) return false;
    if (area && !(p.areasOfIntervention ?? []).includes(area)) return false;
    return true;
  });

  return (
    <>
      <PageHero
        overline="Our Grantees"
        title="Funded Projects"
        description="All projects funded by the Western Balkans Fund — filter by program, Contracting Party, and grantee type to see regional cooperation in action."
        variant="compact"
        breadcrumbs={[{ label: "Our Grantees" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          <GranteeFilters
            programs={programOptions}
            activeProgram={program}
            activeCountry={country}
            activeType={type}
            activeArea={area}
          />

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-medium mb-2">
                {projects.length === 0 ? "No projects yet" : "No grantees match these filters"}
              </p>
              <p className="text-sm">
                {projects.length === 0
                  ? "Funded projects will appear here once added in the CMS."
                  : "Try removing a filter to see more results."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
