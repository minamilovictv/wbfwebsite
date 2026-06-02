import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { sanityFetch } from "@/lib/sanity/client";
import { projectsListQuery } from "@/lib/sanity/queries";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types";

// Always render this page from fresh Sanity data (no static cache).
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Our Grantees",
  description: "Browse all projects and organisations funded by the Western Balkans Fund across the WB6 region.",
};

export default async function GranteesPage() {
  let projects: Project[] = [];

  try {
    projects = await sanityFetch<Project[]>(projectsListQuery, {}, {
      revalidate: 0,
      tags: ["projects"],
    });
  } catch {}

  return (
    <>
      <PageHero
        overline="Our Grantees"
        title="Funded Projects"
        description="All projects funded by the Western Balkans Fund — explore by country, sector, and program to see regional cooperation in action."
        variant="compact"
        breadcrumbs={[{ label: "Our Grantees" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          {projects.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-medium mb-2">No projects yet</p>
              <p className="text-sm">Funded projects will appear here once added in the CMS.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
