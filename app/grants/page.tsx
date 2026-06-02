import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { grantsListQuery } from "@/lib/sanity/queries";
import { PageHero } from "@/components/ui/PageHero";
import { GrantCard } from "@/components/grants/GrantCard";
import { GrantFiltersPanel } from "@/components/grants/GrantFilters";
import type { Grant, GrantFilters } from "@/types";
import { FileText, HelpCircle, List } from "lucide-react";

// Always render this page from fresh Sanity data (no static cache).
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Grants",
  description:
    "Browse all Western Balkans Fund grant opportunities — open calls, upcoming cycles, and the full grant database.",
};

interface PageProps {
  searchParams: Promise<GrantFilters & { page?: string }>;
}

const infoCards = [
  { icon: FileText, title: "How to Apply", href: "/grants/how-to-apply", desc: "Step-by-step guide" },
  { icon: HelpCircle, title: "Eligibility", href: "/grants/eligibility", desc: "Who can apply" },
  { icon: List, title: "Grant Database", href: "/grants/database", desc: "Search all grants" },
];

export default async function GrantsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  let grants: Grant[] = [];

  try {
    grants = await sanityFetch<Grant[]>(grantsListQuery, {}, { revalidate: 0, tags: ["grants"] });
  } catch {}

  const filtered = (grants ?? []).filter((g) => {
    if (!g) return false;
    if (params.type && g.type !== params.type) return false;
    if (params.status && g.status !== params.status) return false;
    if (params.country && !(g.eligibleCountries ?? []).includes(params.country as any)) return false;
    return true;
  });

  return (
    <>
      <PageHero
        overline="Funding"
        title="Grant Opportunities"
        description="WBF provides grants for regional cooperation projects, mobility programmes, civil society initiatives, and more."
        breadcrumbs={[{ label: "Grants" }]}
      />

      {/* Info cards */}
      <section className="bg-white border-b border-slate-100">
        <div className="container-institutional py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {infoCards.map(({ icon: Icon, title, href, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-brand-50 rounded-md flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 group-hover:text-brand-600 transition-colors text-sm">
                    {title}
                  </div>
                  <div className="text-xs text-slate-500">{desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-section-alt">
        <div className="container-institutional">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside>
              <GrantFiltersPanel
                activeType={params.type}
                activeStatus={params.status}
                activeCountry={params.country}
              />
            </aside>
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-slate-500">
                  Showing <strong>{filtered.length}</strong> grants
                </p>
              </div>
              {filtered.length > 0 ? (
                <div className="space-y-4">
                  {filtered.map((grant) => (
                    <GrantCard key={grant._id} grant={grant} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-slate-500">No grants match your filters.</p>
                  <Link href="/grants" className="btn-ghost btn-sm mt-4">
                    Clear filters
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
