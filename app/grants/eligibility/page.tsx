import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Eligibility",
  description: "Who can apply for Western Balkans Fund grants — eligibility criteria and requirements.",
};

const eligibleOrgs = [
  { type: "NGO / Civil Society", desc: "Registered non-profit organisations with civil legal status" },
  { type: "Universities & Research Institutes", desc: "Accredited higher education and research institutions" },
  { type: "Public Bodies & Municipalities", desc: "Local government, cultural institutions, public agencies" },
  { type: "SMEs", desc: "Small and medium enterprises (select programmes only)" },
  { type: "Individuals", desc: "For mobility and scholarship grants only" },
];

const requirements = [
  "Organisation registered in a WBF member state (Albania, BiH, Kosovo*, N. Macedonia, Montenegro, Serbia)",
  "At least 1 year of legal existence at the time of application",
  "No outstanding financial obligations to WBF or other EU/IFI funders",
  "Demonstrated capacity to implement the proposed project",
  "Consortium applications: at least two partners from different member states",
  "Not subject to debarment or exclusion by any donor organisation",
];

const ineligible = [
  "Organisations based outside WBF member states (unless as associate partners)",
  "Political parties or organisations with political objectives",
  "Profit-distributing commercial entities (most programmes)",
  "Organisations under insolvency or liquidation",
  "Individuals (except mobility/scholarship grants)",
];

export default function EligibilityPage() {
  return (
    <>
      <PageHero
        overline="Grants"
        title="Eligibility Criteria"
        description="Before applying, ensure your organisation meets the eligibility requirements. General criteria apply to all WBF grants — specific calls may have additional requirements."
        breadcrumbs={[
          { label: "Grants", href: "/grants" },
          { label: "Eligibility" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Eligible types */}
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-6">
                Eligible Applicant Types
              </h2>
              <div className="space-y-3">
                {eligibleOrgs.map(({ type, desc }) => (
                  <div key={type} className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-teal-900 text-sm">{type}</div>
                      <div className="text-teal-700 text-xs mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Not eligible */}
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-6">
                Not Eligible
              </h2>
              <div className="space-y-3">
                {ineligible.map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-red-800 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* General requirements */}
          <div className="mt-12">
            <h2 className="text-xl font-display font-bold text-slate-900 mb-6">
              General Requirements
            </h2>
            <div className="space-y-2">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-700">{req}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/grants/open-calls" className="btn-primary">
              Browse Open Calls <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/grants/how-to-apply" className="btn-outline">
              How to Apply
            </Link>
          </div>

          <p className="mt-6 text-xs text-slate-400">
            * This designation is without prejudice to positions on status, and is in line with UNSC 1244/1999.
          </p>
        </div>
      </section>
    </>
  );
}
