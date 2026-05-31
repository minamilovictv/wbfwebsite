import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Accountability",
  description: "Western Balkans Fund annual reports, financial statements, audit reports and accountability documents.",
};

const documents = [
  { title: "Annual Report 2024",              sub: "PDF · 4.2 MB" },
  { title: "Annual Report 2023",              sub: "PDF · 3.8 MB" },
  { title: "Financial Statements 2024",       sub: "PDF · 1.1 MB" },
  { title: "External Audit Report 2023",      sub: "PDF · 890 KB" },
  { title: "EU/WBF Joint Action Report 2024", sub: "PDF · 5.6 MB" },
  { title: "WBF Statutes",                    sub: "PDF · 340 KB" },
];

export default function AccountabilityPage() {
  return (
    <>
      <PageHero
        overline="About"
        title="Accountability"
        description="The Western Balkans Fund is committed to full transparency. All annual reports, financial statements, and audit reports are publicly available."
        variant="compact"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Accountability" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional max-w-2xl">
          <h2 className="text-xl font-display font-bold text-slate-900 mb-6">Documents</h2>
          <div className="flex flex-col gap-3">
            {documents.map(({ title, sub }) => (
              <div
                key={title}
                className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:border-brand-300 hover:bg-brand-50 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                  <Download className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-brand-700 transition-colors">
                    {title}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
                </div>
                <span className="ml-auto text-xs text-slate-400 italic">Coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
