import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { openGrantsQuery } from "@/lib/sanity/queries";
import { PageHero } from "@/components/ui/PageHero";
import { GrantCard } from "@/components/grants/GrantCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Grant } from "@/types";

export const metadata: Metadata = {
  title: "Open Calls",
  description: "Currently open grant calls from the Western Balkans Fund. Apply before the deadline.",
};

export default async function OpenCallsPage() {
  let grants: Grant[] = [];

  try {
    grants = await sanityFetch<Grant[]>(openGrantsQuery, {}, { revalidate: 300, tags: ["grants"] });
  } catch {}

  const open = grants.filter((g) => g.status === "open");
  const upcoming = grants.filter((g) => g.status === "upcoming");

  return (
    <>
      <PageHero
        overline="Grants"
        title="Open Calls"
        description="Currently accepting applications. Review eligibility and submit before the deadline."
        breadcrumbs={[
          { label: "Grants", href: "/grants" },
          { label: "Open Calls" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional max-w-4xl">
          {open.length > 0 ? (
            <div>
              <SectionHeader
                overline={`${open.length} open`}
                title="Accepting Applications"
                className="mb-8"
              />
              <div className="space-y-4">
                {open.map((g) => <GrantCard key={g._id} grant={g} />)}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-lg">
              <p className="text-xl font-display font-semibold text-slate-700 mb-2">
                No open calls at this time
              </p>
              <p className="text-slate-500">
                Sign up for notifications to be informed when the next cycle opens.
              </p>
            </div>
          )}

          {upcoming.length > 0 && (
            <div className="mt-14">
              <SectionHeader
                overline="Coming Soon"
                title="Upcoming Grant Calls"
                className="mb-8"
              />
              <div className="space-y-4">
                {upcoming.map((g) => <GrantCard key={g._id} grant={g} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
