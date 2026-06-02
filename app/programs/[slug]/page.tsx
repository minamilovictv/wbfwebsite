import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity/client";
import { programBySlugQuery } from "@/lib/sanity/queries";
import { ProgramHero } from "@/components/programs/sections/ProgramHero";
import { CallInfoCards } from "@/components/programs/sections/CallInfoCards";
import { ProgramAbout } from "@/components/programs/sections/ProgramAbout";
import { InterventionAreas } from "@/components/programs/sections/InterventionAreas";
import { Eligibility } from "@/components/programs/sections/Eligibility";
import { GranteeStories } from "@/components/programs/sections/GranteeStories";
import { ProgramNews } from "@/components/programs/sections/ProgramNews";
import { ProgramDocuments } from "@/components/programs/sections/ProgramDocuments";
import { SubscribeCta } from "@/components/programs/sections/SubscribeCta";
import type { Program } from "@/types";

// Always render this page from fresh Sanity data (no static cache).
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const programs = await sanityFetch<{ slug: { current: string } }[]>(
      `*[_type == "program" && !(_id in path("drafts.**"))]{ slug }`,
      {},
      { revalidate: false },
    );
    return programs.filter((p) => p.slug?.current).map((p) => ({ slug: p.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const program = await sanityFetch<Program | null>(programBySlugQuery, { slug }, { revalidate: 0 });
    if (!program) return {};
    return {
      title: program.seo?.title ?? program.title,
      description: program.seo?.description ?? program.shortDescription,
      openGraph: {
        title: program.title,
        description: program.shortDescription,
      },
    };
  } catch {
    return {};
  }
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params;
  let program: Program | null = null;

  try {
    program = await sanityFetch<Program | null>(programBySlugQuery, { slug }, {
      revalidate: 0,
      tags: [`program:${slug}`, "programs", "news"],
    });
  } catch {
    notFound();
  }

  if (!program) notFound();

  return (
    <div className="bg-white">
      <ProgramHero title={program.title} hero={program.hero} />

      <CallInfoCards
        keyFacts={program.keyFacts}
        timeline={program.timeline}
        notifySignup={program.notifySignup}
      />

      <ProgramAbout about={program.about} countries={program.countries} />

      <InterventionAreas data={program.interventionAreas} />

      <Eligibility data={program.eligibility} countries={program.countries} />

      <GranteeStories data={program.featuredStories} />

      <ProgramNews
        programSlug={program.slug.current}
        programTitle={program.title}
        articles={program.news}
        total={program.newsTotal}
      />

      <ProgramDocuments documents={program.documents} heading={program.documentsHeading} />

      <SubscribeCta data={program.subscribeCta} />
    </div>
  );
}
