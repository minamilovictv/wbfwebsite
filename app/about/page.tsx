import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, Shield, Target, Globe2, Users, Calendar, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Western Balkans Fund",
  description:
    "Learn about the Western Balkans Fund — its mandate, governance, history and vision for regional cooperation.",
};

const milestones = [
  { year: "2015", event: "WBF established by the Western Balkans Six governments" },
  { year: "2016", event: "First grant cycle launched with 6 pilot programmes" },
  { year: "2017", event: "Secretariat fully operational in Belgrade" },
  { year: "2019", event: "€10M cumulative grants milestone reached" },
  { year: "2021", event: "Partnership Platform launched for civil society" },
  { year: "2023", event: "€40M+ in total grants disbursed to date" },
];

const values = [
  { icon: Shield, title: "Transparency", desc: "All funding decisions published and auditable." },
  { icon: Target, title: "Impact", desc: "Evidence-based programming focused on measurable outcomes." },
  { icon: Globe2, title: "Regionalism", desc: "Promoting cross-border cooperation over national isolation." },
  { icon: Users, title: "Inclusivity", desc: "Open to all eligible actors regardless of sector or size." },
];

const quickLinks = [
  { label: "Governance", href: "/about/governance", icon: Shield },
  { label: "Team", href: "/about/team", icon: Users },
  { label: "Member States", href: "/about/member-states", icon: Globe2 },
  { label: "Strategic Plan", href: "/about/strategic-plan", icon: BookOpen },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        overline="About"
        title="Western Balkans Fund"
        description="An international organisation dedicated to regional cooperation, people-to-people connectivity, and the European integration of the Western Balkans."
        breadcrumbs={[{ label: "About" }]}
      />

      {/* Mandate */}
      <section className="section-padding bg-white">
        <div className="container-institutional">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <SectionHeader
                overline="Our Mandate"
                title="What is the Western Balkans Fund?"
                description="The Western Balkans Fund (WBF) is an international organisation established by the governments of Albania, Bosnia and Herzegovina, Kosovo, North Macedonia, Montenegro, and Serbia to promote regional cooperation and mutual understanding."
              />
              <p className="text-slate-600 mt-6 leading-relaxed">
                WBF provides funding, technical support, and networking opportunities to
                civil society organisations, cultural institutions, universities, youth groups,
                and public bodies across the region. Its work contributes to the Western Balkans'
                European integration process by strengthening regional bonds and democratic values.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/programs" className="btn-primary">
                  Our Programs <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/grants/open-calls" className="btn-outline">
                  Open Calls
                </Link>
              </div>
            </div>

            {/* Quick navigation */}
            <div className="grid grid-cols-2 gap-4">
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group card p-6 hover:shadow-card-hover transition-shadow flex flex-col gap-3"
                >
                  <div className="w-10 h-10 bg-brand-50 rounded-md flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 group-hover:text-brand-600 transition-colors">
                      {label}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-400 transition-colors mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-section-alt">
        <div className="container-institutional">
          <SectionHeader
            overline="Our Values"
            title="What Guides Us"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 text-center">
                <div className="w-14 h-14 bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-teal-400" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-institutional max-w-3xl">
          <SectionHeader
            overline="History"
            title="Key Milestones"
            description="From our founding to today — a decade of regional impact."
          />
          <div className="mt-10 relative">
            <div className="absolute left-20 top-0 bottom-0 w-0.5 bg-slate-200" />
            <div className="space-y-6">
              {milestones.map(({ year, event }) => (
                <div key={year} className="flex gap-6 items-start">
                  <div className="w-20 shrink-0 text-right">
                    <span className="text-sm font-bold text-brand-600">{year}</span>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-teal-500 border-2 border-white shadow" />
                    <p className="text-sm text-slate-700 pt-0.5">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
