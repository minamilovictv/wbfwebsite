import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { GrantStatusBadge, Badge } from "@/components/ui/Badge";
import { sanityFetch } from "@/lib/sanity/client";
import { grantsListQuery } from "@/lib/sanity/queries";
import { formatCurrency, formatDate, getCountryFlag } from "@/lib/utils/formatters";
import { Calendar, Euro, ArrowRight } from "lucide-react";
import type { Grant } from "@/types";

// Always render this page from fresh Sanity data (no static cache).
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Grants Database",
  description: "Full searchable database of all Western Balkans Fund grants — open, upcoming, and closed.",
};

const statusOrder = ["open", "upcoming", "closed", "archived"];

export default async function GrantsDatabasePage() {
  let grants: Grant[] = [];

  try {
    grants = await sanityFetch<Grant[]>(grantsListQuery, {}, {
      revalidate: 0,
      tags: ["grants"],
    });
  } catch {}

  const grouped = statusOrder.reduce<Record<string, Grant[]>>((acc, s) => {
    const items = grants.filter((g) => g.status === s);
    if (items.length) acc[s] = items;
    return acc;
  }, {});

  const statusLabels: Record<string, string> = {
    open: "Open Calls",
    upcoming: "Upcoming",
    closed: "Closed",
    archived: "Archived",
  };

  return (
    <>
      <PageHero
        overline="Grants"
        title="Grants Database"
        description="Browse the complete history of WBF grant calls — filter by status, programme, or country to find relevant funding opportunities."
        variant="compact"
        breadcrumbs={[
          { label: "Grants", href: "/grants" },
          { label: "Database" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          {grants.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-medium mb-2">No grants yet</p>
              <p className="text-sm">Grant calls will appear here once added in the CMS.</p>
            </div>
          ) : (
            <div className="space-y-14">
              {Object.entries(grouped).map(([status, items]) => (
                <div key={status}>
                  <h2 className="text-lg font-display font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-3">
                    {statusLabels[status]}
                    <span className="text-sm font-normal text-slate-400">({items.length})</span>
                  </h2>
                  <div className="space-y-3">
                    {items.filter((g) => g.slug?.current).map((grant) => (
                      <Link
                        key={grant._id}
                        href={`/grants/${grant.slug.current}`}
                        className="group flex flex-col sm:flex-row sm:items-center gap-4 p-5 border border-slate-100 rounded-xl hover:border-brand-200 hover:bg-brand-50/30 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <GrantStatusBadge status={grant.status} />
                            {grant.program && (
                              <Badge variant="primary" size="sm">{grant.program.title}</Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-slate-900 group-hover:text-brand-700 truncate">
                            {grant.title}
                          </h3>
                          {grant.shortDescription && (
                            <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">{grant.shortDescription}</p>
                          )}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {grant.eligibleCountries?.slice(0, 6).map((c) => (
                              <span key={c} className="text-sm" title={c}>{getCountryFlag(c)}</span>
                            ))}
                          </div>
                        </div>

                        <div className="shrink-0 flex sm:flex-col items-start sm:items-end gap-4 sm:gap-1.5 text-sm text-slate-600">
                          {(grant.minGrantAmount || grant.maxGrantAmount) && (
                            <div className="flex items-center gap-1">
                              <Euro className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-medium">
                                {formatCurrency(grant.minGrantAmount ?? 0, grant.currency)}
                                {grant.maxGrantAmount && grant.maxGrantAmount !== grant.minGrantAmount && (
                                  <> – {formatCurrency(grant.maxGrantAmount, grant.currency)}</>
                                )}
                              </span>
                            </div>
                          )}
                          {grant.deadline && (
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                              <Calendar className="w-3 h-3" />
                              {formatDate(grant.deadline)}
                            </div>
                          )}
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 transition-colors hidden sm:block mt-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
