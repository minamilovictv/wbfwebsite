import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shield, Users, Globe2, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Governance",
  description: "Western Balkans Fund governance structure — Board of Governors, Executive Board, and Secretariat.",
};

const bodies = [
  {
    icon: Globe2,
    title: "Board of Governors",
    role: "Supreme governing body",
    description:
      "Composed of one representative from each of the six member states at ministerial level. The Board of Governors sets the strategic direction of the Fund, approves the annual budget, and elects the Executive Board.",
    members: [
      { country: "🇦🇱", name: "Albania", rep: "Minister responsible for European integration" },
      { country: "🇧🇦", name: "Bosnia & Herz.", rep: "Minister for Civil Affairs" },
      { country: "🇽🇰", name: "Kosovo*", rep: "Minister of Foreign Affairs and Diaspora" },
      { country: "🇲🇰", name: "North Macedonia", rep: "Minister for European Affairs" },
      { country: "🇲🇪", name: "Montenegro", rep: "Minister of European Affairs" },
      { country: "🇷🇸", name: "Serbia", rep: "Minister for European Integration" },
    ],
  },
  {
    icon: Shield,
    title: "Executive Board",
    role: "Oversight and decision-making",
    description:
      "The Executive Board oversees the implementation of WBF's programmes and grants. It approves grant decisions, monitors financial management, and ensures compliance with the Fund's statutes and donor agreements.",
    members: [
      { country: "🇦🇱", name: "Albania", rep: "Senior Official" },
      { country: "🇧🇦", name: "Bosnia & Herz.", rep: "Senior Official" },
      { country: "🇽🇰", name: "Kosovo*", rep: "Senior Official" },
      { country: "🇲🇰", name: "North Macedonia", rep: "Senior Official" },
      { country: "🇲🇪", name: "Montenegro", rep: "Senior Official" },
      { country: "🇷🇸", name: "Serbia", rep: "Senior Official" },
    ],
  },
  {
    icon: Users,
    title: "Secretariat",
    role: "Day-to-day operations",
    description:
      "Based in Belgrade, Serbia, the Secretariat manages the Fund's daily operations including grant administration, financial reporting, communications, and stakeholder relations. It is headed by the Executive Director.",
    members: [
      { country: "🏢", name: "Executive Director", rep: "Heads the Secretariat" },
      { country: "🏢", name: "Grants Department", rep: "Grant cycle management" },
      { country: "🏢", name: "Finance Department", rep: "Financial oversight" },
      { country: "🏢", name: "Communications", rep: "Public affairs & media" },
    ],
  },
];

const principles = [
  { title: "Equal Representation", desc: "All six member states have equal weight in governance bodies." },
  { title: "Transparency", desc: "All funding decisions, budgets and reports are publicly available." },
  { title: "Independence", desc: "Grant decisions are made by independent evaluation panels." },
  { title: "Accountability", desc: "External audits conducted annually by independent auditors." },
];

export default function GovernancePage() {
  return (
    <>
      <PageHero
        overline="About"
        title="Governance"
        description="The Western Balkans Fund operates under a transparent multi-level governance structure with equal representation from all six member states."
        variant="compact"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Governance" },
        ]}
      />

      {/* Governance bodies */}
      <section className="section-padding bg-white">
        <div className="container-institutional">
          <SectionHeader
            overline="Structure"
            title="Governance Bodies"
            description="WBF is governed through three interconnected bodies, each with distinct responsibilities."
            className="mb-12"
          />

          <div className="space-y-8">
            {bodies.map(({ icon: Icon, title, role, description, members }) => (
              <div key={title} className="card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Left header */}
                  <div className="bg-brand-900 p-8 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-teal-400" />
                      </div>
                      <h3 className="text-xl font-display font-bold text-white mb-1">{title}</h3>
                      <p className="text-teal-400 text-sm font-semibold uppercase tracking-wide">{role}</p>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mt-6">{description}</p>
                  </div>

                  {/* Right — members */}
                  <div className="lg:col-span-2 p-8">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                      Composition
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {members.map((m) => (
                        <div key={m.name} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                          <span className="text-2xl shrink-0">{m.country}</span>
                          <div>
                            <div className="text-sm font-semibold text-slate-800">{m.name}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{m.rep}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-padding bg-section-alt">
        <div className="container-institutional">
          <SectionHeader
            overline="Principles"
            title="Governance Principles"
            align="center"
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {principles.map(({ title, desc }) => (
              <div key={title} className="card p-6 text-center">
                <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-5 h-5 text-brand-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">{title}</h4>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="section-padding-sm bg-white">
        <div className="container-institutional max-w-2xl">
          <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Governing Documents</h2>
          {[
            "WBF Statute",
            "Rules of Procedure",
            "Financial Regulations",
            "Annual Report 2024",
            "External Audit Report 2023",
          ].map((doc) => (
            <div
              key={doc}
              className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
            >
              <span className="text-sm text-slate-700">{doc}</span>
              <span className="text-xs text-slate-400 italic">Coming soon</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
