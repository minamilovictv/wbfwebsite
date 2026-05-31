import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { homePageQuery } from "@/lib/sanity/queries";
import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProgramsOverview } from "@/components/sections/ProgramsOverview";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { EventsPreview } from "@/components/sections/EventsPreview";
import { PartnersStrip } from "@/components/sections/PartnersStrip";
import type { Program, Grant, NewsArticle, WBFEvent, Partner } from "@/types";

export const metadata: Metadata = {
  title: "Western Balkans Fund — Building Regional Cooperation",
  description:
    "The Western Balkans Fund supports civil society, institutions, and communities across all six Contracting Parties — funding projects that strengthen reconciliation, EU integration, and people-to-people ties.",
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
  } catch {}

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProgramsOverview programs={data.featuredPrograms} />
      <ImpactStats />
      <NewsGrid articles={data.latestNews} />
      <EventsPreview events={data.upcomingEvents} />
      <PartnersStrip partners={data.partners} />
    </>
  );
}
