import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sanityFetch, getImageUrl } from "@/lib/sanity/client";
import { teamQuery } from "@/lib/sanity/queries";
import { Mail, Linkedin } from "lucide-react";
import type { Person } from "@/types";

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

function PersonCard({ person }: { person: Person }) {
  const photoUrl = getImageUrl(person.photo, { width: 300, height: 300 });

  return (
    <div className="card p-5 flex flex-col items-center text-center group">
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-slate-100 mb-4 shrink-0">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={person.fullName}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
            <span className="text-brand-600 font-display font-bold text-2xl">
              {person.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </span>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 text-sm">
          {person.title ? `${person.title} ` : ""}{person.fullName}
        </h3>
        <p className="text-xs text-teal-600 font-medium mt-0.5">{person.role}</p>
        {person.country && (
          <p className="text-xs text-slate-400 mt-0.5">{person.country}</p>
        )}
      </div>

      <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {person.email && (
          <a
            href={`mailto:${person.email}`}
            className="w-8 h-8 bg-brand-50 rounded-full flex items-center justify-center hover:bg-brand-100 transition-colors"
            aria-label={`Email ${person.fullName}`}
          >
            <Mail className="w-3.5 h-3.5 text-brand-600" />
          </a>
        )}
        {person.linkedin && (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-brand-50 rounded-full flex items-center justify-center hover:bg-brand-100 transition-colors"
            aria-label={`LinkedIn profile of ${person.fullName}`}
          >
            <Linkedin className="w-3.5 h-3.5 text-brand-600" />
          </a>
        )}
      </div>
    </div>
  );
}

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
      revalidate: 3600,
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
                    <PersonCard key={person._id} person={person} />
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
