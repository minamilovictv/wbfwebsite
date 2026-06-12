import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { KnowledgeHubContent } from "@/components/knowledge-hub/KnowledgeHubContent";
import { sanityFetch } from "@/lib/sanity/client";
import {
  learningPathsQuery,
  knowledgeResourcesQuery,
  knowledgeDownloadsQuery,
  caseStudiesQuery,
} from "@/lib/sanity/queries";
import type { LearningPath, KnowledgeResource, KnowledgeDownload, CaseStudy } from "@/types";

export const metadata: Metadata = {
  title: "Knowledge Hub",
  description:
    "Learning paths, guides, toolkits, and case studies from the Western Balkans Fund — a growing academy for applicants and grantees.",
};

export default async function KnowledgeHubPage() {
  let learningPaths: LearningPath[] = [];
  let resources: KnowledgeResource[] = [];
  let downloads: KnowledgeDownload[] = [];
  let caseStudies: CaseStudy[] = [];

  try {
    [learningPaths, resources, downloads, caseStudies] = await Promise.all([
      sanityFetch<LearningPath[]>(learningPathsQuery),
      sanityFetch<KnowledgeResource[]>(knowledgeResourcesQuery),
      sanityFetch<KnowledgeDownload[]>(knowledgeDownloadsQuery),
      sanityFetch<CaseStudy[]>(caseStudiesQuery),
    ]);
  } catch {
    // Sanity not reachable — render the hub shell with empty sections
  }

  return (
    <>
      <PageHero
        overline="WBF Academy"
        title="Knowledge Hub"
        description="Everything you need to design, fund, deliver, and report a regional cooperation project — learning paths, practical guides, templates, and lessons from real grantees."
        variant="default"
        breadcrumbs={[{ label: "Knowledge Hub" }]}
      />

      <KnowledgeHubContent
        learningPaths={learningPaths}
        resources={resources}
        downloads={downloads}
        caseStudies={caseStudies}
      />
    </>
  );
}
