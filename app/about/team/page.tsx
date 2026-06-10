import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { sanityFetch } from "@/lib/sanity/client";
import { teamQuery } from "@/lib/sanity/queries";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import type { Person } from "@/types";

// Always render this page from fresh Sanity data (no static cache).
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Team",
  description: "The Western Balkans Fund Secretariat team based in Belgrade, Serbia.",
};

// Fallback placeholder team shown before Sanity content is added
const placeholderTeam = [
  { department: "Leadership", members: ["Executive Director", "Deputy Director"] },
  { department: "Grants & Programmes", members: ["Head of Grants", "Programme Officer", "Programme Officer"] },
  { department: "Finance & Administration", members: ["Head of Finance", "Finance Officer", "Administrative Officer"] },
  { department: "Communications", members: ["Head of Communications", "Communications Officer"] },
];

function PlaceholderCard({ title }: { title: string }) {
  return (
    <div className="card p-5 flex flex-col items-center text-center opacity-50">
      <div className="w-24 h-24 rounded-full bg-slate-100 mb-4" />
      <div className="h-3 bg-slate-200 rounded w-28 mb-2" />
      <div className="h-2 bg-slate-100 rounded w-20" />
    </div>
  );
}

export default async function TeamPage() {
  let team: Person[] = [];

  try {
    team = await sanityFetch<Person[]>(teamQuery, {}, {
      revalidate: 0,
      tags: ["team"],
    });
  } catch {}

  // Group by department
  const departments = team.reduce<Record<string, Person[]>>((acc, person) => {
    const dept = person.department ?? "Secretariat";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(person);
    return acc;
  }, {});

  const hasSanityData = team.length > 0;

  return (
    <>
      <PageHero
        overline="About"
        title="Our Team"
        description="The WBF Secretariat is based in Belgrade, Serbia. Our multilingual team of professionals manages the Fund's grants, programmes, communications and finances."
        variant="compact"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Team" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          {hasSanityData ? (
            /* Render from Sanity */
            Object.entries(departments).map(([dept, members]) => (
              <div key={dept} className="mb-12">
                <h2 className="text-lg font-display font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                  {dept}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {members.map((person) => (
                    <TeamMemberCard key={person._id} person={person} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            /* Placeholder until Sanity content is added */
            <div>
              <div className="text-center mb-10 p-6 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm font-medium">
                  Team profiles will appear here once added in the CMS.
                </p>
                <a
                  href="https://sanity.io/manage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 underline text-xs mt-1 block"
                >
                  Add team members in Sanity →
                </a>
              </div>

              {placeholderTeam.map(({ department, members }) => (
                <div key={department} className="mb-12">
                  <h2 className="text-lg font-display font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                    {department}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {members.map((m) => <PlaceholderCard key={m} title={m} />)}
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
