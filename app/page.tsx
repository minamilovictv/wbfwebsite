import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { homePageQuery } from "@/lib/sanity/queries";
import { HeroSection } from "@/components/sections/Hero";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { GrantCTA } from "@/components/sections/GrantCTA";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { PartnersStrip } from "@/components/sections/PartnersStrip";
import { ProgramsOverview } from "@/components/sections/ProgramsOverview";
import { EventsPreview } from "@/components/sections/EventsPreview";
import type { Program, Grant, NewsArticle, WBFEvent, Partner } from "@/types";

export const metadata: Metadata = {
  title: "Western Balkans Fund — Regional Cooperation & Grants",
  description:
    "The Western Balkans Fund promotes regional cooperation and people-to-people connectivity across Albania, Bosnia and Herzegovina, Kosovo, North Macedonia, Montenegro, and Serbia.",
};

interface HomeData {
  featuredPrograms: Program[];
  openGrants: Grant[];
  latestNews: NewsArticle[];
  upcomingEvents: WBFEvent[];
  partners: Partner[];
}

export default async function HomePage() {
  let data: HomeData = {
    featuredPrograms: [],
    openGrants: [],
    latestNews: [],
    upcomingEvents: [],
    partners: [],
  };

  try {
    data = await sanityFetch<HomeData>(homePageQuery, {}, { revalidate: 3600, tags: ["home"] });
  } catch {
    // Fallback to empty state when Sanity is not configured
  }

  return (
    <>
      <HeroSection />
      <ImpactStats />
      <ProgramsOverview programs={data.featuredPrograms} />
      <GrantCTA grants={data.openGrants} />
      <NewsGrid articles={data.latestNews} />
      <EventsPreview events={data.upcomingEvents} />
      <PartnersStrip partners={data.partners} />
    </>
  );
}
