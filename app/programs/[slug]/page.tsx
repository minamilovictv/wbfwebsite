import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { programBySlugQuery, programsListQuery } from "@/lib/sanity/queries";
import { PageHero } from "@/components/ui/PageHero";
import { GrantStatusBadge, StatusBadge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatCurrency, formatDate, getCountryFlag, getCountryName } from "@/lib/utils/formatters";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import type { Program, Grant } from "@/types";

type ProgramWithGrants = Program & {
  openGrants?: Pick<Grant, "_id" | "title" | "slug">[];
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const programs = await sanityFetch<{ slug: { current: string } }[]>(
      `*[_type == "program"]{ slug }`,
      {},
      { revalidate: false }
    );
    return programs.map((p) => ({ slug: p.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const program = await sanityFetch<ProgramWithGrants | null>(programBySlugQuery, { slug }, { revalidate: 3600 });
    if (!program) return {};
    return {
      title: program.title,
      description: program.shortDescription,
      openGraph: { title: program.title, description: program.shortDescription },
    };
  } catch {
    return {};
  }
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params;
  let program: ProgramWithGrants | null = null;

  try {
    program = await sanityFetch<ProgramWithGrants | null>(programBySlugQuery, { slug }, {
      revalidate: 3600,
      tags: [`program:${slug}`],
    });
  } catch {
    notFound();
  }

  if (!program) notFound();

  return (
    <>
      <PageHero
        overline="Program"
        title={program.title}
        description={program.shortDescription}
        coverImage={program.coverImage}
        breadcrumbs={[
          { label: "Programs", href: "/programs" },
          { label: program.title },
        ]}
      >
        <div className="flex flex-wrap gap-3 mt-6">
          <StatusBadge status={program.status} />
          {program.totalBudget && (
            <span className="badge badge-gold">
              Budget: {formatCurrency(program.totalBudget, program.currency)}
            </span>
          )}
        </div>
      </PageHero>

      <section className="section-padding bg-white">
        <div className="container-institutional">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 prose prose-slate max-w-none">
              <p className="text-body-lead">{program.description}</p>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Countries */}
              {program.countries && program.countries.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
                    Eligible Countries
                  </h3>
                  <div className="space-y-2">
                    {program.countries.map((c) => (
                      <div key={c} className="flex items-center gap-2 text-sm">
                        <span>{getCountryFlag(c)}</span>
                        <span className="text-slate-700">{getCountryName(c)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dates */}
              {(program.startDate || program.endDate) && (
                <div className="card p-5">
                  <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
                    Programme Period
                  </h3>
                  <div className="text-sm text-slate-600 space-y-1">
                    {program.startDate && <div>Start: {formatDate(program.startDate)}</div>}
                    {program.endDate && <div>End: {formatDate(program.endDate)}</div>}
                  </div>
                </div>
              )}

              {/* Documents */}
              {program.documents && program.documents.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
                    Documents
                  </h3>
                  <div className="space-y-2">
                    {program.documents.map((doc) => (
                      <a
                        key={doc._key}
                        href={doc.file.asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700"
                      >
                        <Download className="w-4 h-4 shrink-0" />
                        {doc.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Open grants CTA */}
              {program.openGrants && program.openGrants.length > 0 && (
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-5">
                  <h3 className="font-semibold text-teal-800 mb-3 text-sm">
                    Open Grant Calls ({program.openGrants.length})
                  </h3>
                  <div className="space-y-2">
                    {program.openGrants.map((g) => (
                      <Link
                        key={g._id}
                        href={`/grants/${g.slug.current}`}
                        className="flex items-center justify-between text-sm text-teal-700 hover:text-teal-900"
                      >
                        <span className="line-clamp-1">{g.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
