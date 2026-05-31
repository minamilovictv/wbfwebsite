import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Download, ArrowRight, Target, Globe2, Users, Leaf, BookOpen, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Strategic Plan 2024–2028",
  description: "Western Balkans Fund Strategic Plan 2024–2028 — priorities, goals and expected results.",
};

const pillars = [
  {
    icon: Globe2,
    number: "01",
    title: "Regional Cooperation",
    description:
      "Deepening cross-border cooperation between WBF member states through joint projects, shared institutions, and people-to-people exchange programmes.",
    targets: ["500+ cross-border projects", "6 regional networks strengthened", "€15M in regional grants"],
  },
  {
    icon: Users,
    number: "02",
    title: "Youth & Mobility",
    description:
      "Expanding opportunities for young people to study, work, and volunteer across the Western Balkans, building a generation of regional citizens.",
    targets: ["10,000+ youth mobilities", "50+ university partnerships", "Regional youth councils"],
  },
  {
    icon: BookOpen,
    number: "03",
    title: "Civil Society & Democracy",
    description:
      "Supporting a vibrant civil society sector capable of holding governments accountable and driving democratic reforms across the region.",
    targets: ["300+ CSO grants", "Regional CSO network", "Advocacy capacity building"],
  },
  {
    icon: Leaf,
    number: "04",
    title: "Environment & Climate",
    description:
      "Advancing the green transition in the Western Balkans through environmental projects, climate education, and sustainable development initiatives.",
    targets: ["€8M in green grants", "100+ environmental projects", "Regional climate action plan"],
  },
  {
    icon: Cpu,
    number: "05",
    title: "Digital & Innovation",
    description:
      "Bridging the digital divide and fostering innovation ecosystems that connect the Western Balkans to European digital markets and standards.",
    targets: ["Digital skills training", "Tech startup support", "E-governance cooperation"],
  },
  {
    icon: Target,
    number: "06",
    title: "Institutional Effectiveness",
    description:
      "Strengthening WBF's own systems, governance, and delivery capacity to ensure maximum impact, accountability and transparency.",
    targets: ["ISO-certified processes", "Digital grant management", "Enhanced M&E framework"],
  },
];

const timeline = [
  { year: "2024", label: "Foundation", desc: "Launch new programmes, upgrade OGMS, expand partnerships" },
  { year: "2025", label: "Scale", desc: "Double youth mobility grants, launch Partnership Platform" },
  { year: "2026", label: "Deepen", desc: "Regional thematic networks, mid-term evaluation" },
  { year: "2027", label: "Expand", desc: "New donor partnerships, increased budget envelope" },
  { year: "2028", label: "Legacy", desc: "Final evaluation, next strategy development" },
];

export default function StrategicPlanPage() {
  return (
    <>
      <PageHero
        overline="About"
        title="Strategic Plan 2024–2028"
        description="A five-year roadmap for deepening regional cooperation, expanding opportunity, and strengthening democratic resilience across the Western Balkans."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Strategic Plan" },
        ]}
      >
        <div className="flex flex-wrap gap-3 mt-6">
          <a href="#" className="btn-secondary btn-sm">
            <Download className="w-4 h-4" />
            Download Full Plan (PDF)
          </a>
          <Link href="/programs" className="btn-outline border-white/30 text-white hover:bg-white/10 hover:text-white btn-sm">
            View Programs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </PageHero>

      {/* Vision */}
      <section className="section-padding bg-white">
        <div className="container-institutional">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                overline="Vision"
                title="A Connected, Prosperous Western Balkans"
                description="By 2028, the Western Balkans Fund will have contributed to a region where borders are bridges, opportunities are shared, and citizens identify with a common regional future anchored in European values."
              />
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                {[
                  { value: "€50M+", label: "Total Budget" },
                  { value: "3,000+", label: "Projects" },
                  { value: "500K+", label: "Beneficiaries" },
                ].map(({ value, label }) => (
                  <div key={label} className="card p-4">
                    <div className="text-2xl font-display font-bold text-brand-600">{value}</div>
                    <div className="text-xs text-slate-500 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-900 rounded-xl p-8 text-white">
              <p className="text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Strategic Mission
              </p>
              <blockquote className="font-display text-lg font-medium leading-relaxed italic text-white/90">
                &ldquo;To strengthen regional bonds through funded cooperation, mobility and partnership — accelerating the Western Balkans' path to European integration.&rdquo;
              </blockquote>
              <p className="text-slate-400 text-xs mt-4">— WBF Strategic Plan 2024–2028</p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic pillars */}
      <section className="section-padding bg-section-alt">
        <div className="container-institutional">
          <SectionHeader
            overline="Priority Areas"
            title="Six Strategic Pillars"
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map(({ icon: Icon, number, title, description, targets }) => (
              <div key={title} className="card p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-900 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <span className="text-3xl font-display font-bold text-slate-100">{number}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{description}</p>
                <ul className="space-y-1.5">
                  {targets.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-institutional max-w-3xl">
          <SectionHeader
            overline="Roadmap"
            title="Implementation Timeline"
            className="mb-10"
          />
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-slate-200" />
            <div className="space-y-6">
              {timeline.map(({ year, label, desc }) => (
                <div key={year} className="flex gap-6 items-start">
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-sm font-bold text-brand-600">{year}</span>
                  </div>
                  <div className="relative pl-6 pb-2">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-teal-500 border-2 border-white shadow" />
                    <div className="font-semibold text-slate-800 text-sm">{label}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{desc}</div>
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
