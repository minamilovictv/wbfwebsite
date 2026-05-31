import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Trophy, BookOpen, BarChart3, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Impact",
  description: "Western Balkans Fund impact — numbers, geography, reach across all six Contracting Parties.",
};

const stats = [
  { value: "500+", label: "Projects funded", sub: "Across all programs and calls" },
  { value: "€8M+", label: "Total funding disbursed", sub: "EU co-funded and bilateral" },
  { value: "2,000+", label: "Organizations supported", sub: "CSOs, institutions, universities" },
  { value: "263", label: "Applications — GGI Call 8", sub: "Record for the GGI scheme" },
];

const countries = [
  { flag: "🇦🇱", name: "Albania",            projects: "82 projects" },
  { flag: "🇧🇦", name: "Bosnia & Herzegovina", projects: "76 projects" },
  { flag: "🇽🇰", name: "Kosovo*",            projects: "68 projects" },
  { flag: "🇲🇰", name: "North Macedonia",    projects: "71 projects" },
  { flag: "🇲🇪", name: "Montenegro",         projects: "74 projects" },
  { flag: "🇷🇸", name: "Serbia",             projects: "79 projects" },
];

const sections = [
  {
    icon: BookOpen,
    title: "Grantee Stories",
    desc: "In-depth project highlights from across the Western Balkans.",
    href: "/impact/stories",
  },
  {
    icon: Trophy,
    title: "WBF Champion Awards",
    desc: "Annual recognition program celebrating outstanding grantees.",
    href: "/impact/awards",
  },
  {
    icon: BarChart3,
    title: "Projects Database",
    desc: "Browse all funded projects by country, sector, and program.",
    href: "/grantees",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        overline="Impact"
        title="Regional change, measured"
        description="Across all programs and eight calls, WBF has supported hundreds of organizations building a more connected Western Balkans."
        variant="compact"
        breadcrumbs={[{ label: "Our Impact" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {stats.map(({ value, label, sub }) => (
              <div key={label} className="card p-6 text-center">
                <div className="font-display text-4xl font-bold text-brand-700 leading-none mb-2">{value}</div>
                <div className="text-sm font-semibold text-slate-800 mb-1">{label}</div>
                <div className="text-xs text-slate-400">{sub}</div>
              </div>
            ))}
          </div>

          <div className="card p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">
                Six Contracting Parties, one region
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Every WBF project must cross at least three of the six Western Balkans territories.
                Projects covering all six are given priority in evaluation.
              </p>
              <div className="flex flex-col gap-2">
                {countries.map(({ flag, name, projects }) => (
                  <div key={name} className="flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-100 rounded-sm text-sm">
                    <span className="text-base">{flag}</span>
                    <span className="font-medium text-slate-800 flex-1">{name}</span>
                    <span className="text-xs text-slate-400">{projects}</span>
                  </div>
                ))}
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  * Without prejudice to positions on status, in line with UNSCR 1244/1999 and the ICJ Opinion on the Kosovo declaration of independence.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <div className="text-7xl">🗺️</div>
              <p className="text-sm text-slate-500 max-w-[28ch] leading-relaxed">
                Every project connects at least 3 contracting parties, building regional ties from the ground up.
              </p>
              <Link href="/grantees" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                Browse all projects →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sections.map(({ icon: Icon, title, desc, href }) => (
              <Link
                key={href}
                href={href}
                className="card p-6 group hover:-translate-y-0.5 transition-transform"
              >
                <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{desc}</p>
                <span className="text-sm font-semibold text-brand-600 flex items-center gap-1">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
