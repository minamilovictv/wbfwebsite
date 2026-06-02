import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { sanityFetch } from "@/lib/sanity/client";
import { reportsQuery } from "@/lib/sanity/queries";
import type { Report } from "@/types";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Accountability",
  description:
    "Western Balkans Fund annual reports, financial statements, audit reports and accountability documents.",
};

// Fallback list shown only if Sanity has no published reports yet
const fallback = [
  { title: "Annual Report 2024", sub: "PDF · 4.2 MB" },
  { title: "Annual Report 2023", sub: "PDF · 3.8 MB" },
  { title: "Financial Statements 2024", sub: "PDF · 1.1 MB" },
  { title: "External Audit Report 2023", sub: "PDF · 890 KB" },
  { title: "EU/WBF Joint Action Report 2024", sub: "PDF · 5.6 MB" },
  { title: "WBF Statutes", sub: "PDF · 340 KB" },
];

function humanSize(bytes?: number) {
  if (!bytes) return undefined;
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

export default async function AccountabilityPage() {
  let reports: Report[] = [];
  try {
    reports = await sanityFetch<Report[]>(reportsQuery, {}, { revalidate: 0 });
  } catch {}

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
        <div className="container-institutional max-w-3xl">
          {reports.length > 0 ? (
            <div className="space-y-3">
              {reports.map((r) => {
                const href = r.file?.asset?.url ?? r.externalUrl;
                const size = humanSize(r.file?.asset?.size);
                const sub = [r.year, size].filter(Boolean).join(" · ");
                const Wrapper = href ? "a" : "div";
                return (
                  <Wrapper
                    key={r._id}
                    {...(href
                      ? {
                          href,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className="card p-5 flex items-center gap-4 group hover:-translate-y-0.5 transition-transform"
                  >
                    <div className="w-11 h-11 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                      {r.externalUrl ? (
                        <ExternalLink className="w-5 h-5 text-brand-600" />
                      ) : (
                        <Download className="w-5 h-5 text-brand-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 group-hover:text-brand-700 transition-colors">
                        {r.title}
                      </div>
                      {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
                      {r.summary && (
                        <div className="text-xs text-slate-500 mt-1 line-clamp-2">{r.summary}</div>
                      )}
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {fallback.map((d) => (
                <div key={d.title} className="card p-5 flex items-center gap-4 opacity-70">
                  <div className="w-11 h-11 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                    <Download className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{d.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{d.sub}</div>
                  </div>
                </div>
              ))}
              <p className="text-xs text-slate-400 text-center pt-6">
                Reports will be downloadable once uploaded in Sanity Studio.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
