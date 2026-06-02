import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { projectsListQuery } from "@/lib/sanity/queries";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import type { Project } from "@/types";

// Always render this page from fresh Sanity data (no static cache).
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse projects funded by the Western Balkans Fund across all six member states.",
};

interface PageProps {
  searchParams: Promise<{
    status?: string;
    country?: string;
    program?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  let projects: Project[] = [];

  try {
    projects = await sanityFetch<Project[]>(projectsListQuery, {}, {
      revalidate: 0,
      tags: ["projects"],
    });
  } catch {}

  const filtered = (projects ?? []).filter((p) => {
    if (!p) return false;
    if (params.status && p.status !== params.status) return false;
    if (params.country && !(p.countries ?? []).includes(params.country as any)) return false;
    if (params.search) {
      const q = params.search.toLowerCase();
      const title = (p.title ?? "").toLowerCase();
      const org = (p.implementingOrganization ?? "").toLowerCase();
      if (!title.includes(q) && !org.includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <>
      <PageHero
        overline="Impact"
        title="Funded Projects"
        description={`${projects.length}+ projects funded across the Western Balkans — browse by country, status, or programme.`}
        breadcrumbs={[{ label: "Projects" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          <ProjectFilters
            activeStatus={params.status}
            activeCountry={params.country}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-medium text-slate-600">No projects found</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
