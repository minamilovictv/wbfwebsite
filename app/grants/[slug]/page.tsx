import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { grantBySlugQuery } from "@/lib/sanity/queries";
import { PageHero } from "@/components/ui/PageHero";
import { GrantStatusBadge, Badge } from "@/components/ui/Badge";
import {
  formatCurrency, formatDate, daysUntil, getCountryName, getCountryFlag, toPlainText
} from "@/lib/utils/formatters";
import {
  ArrowRight, Calendar, Clock, Download, ExternalLink, Mail,
  CheckCircle2, XCircle, AlertCircle, Euro, Users
} from "lucide-react";
import type { Grant, EligibleApplicant } from "@/types";

const applicantLabels: Record<EligibleApplicant, string> = {
  ngo: "NGO / CSO",
  university: "University",
  "government-body": "Government Body",
  individual: "Individual",
  sme: "SME",
  municipality: "Municipality",
  "research-institute": "Research Institute",
  "cultural-institution": "Cultural Institution",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const grant = await sanityFetch<Grant | null>(grantBySlugQuery, { slug }, { revalidate: 300 });
    if (!grant) return {};
    return {
      title: grant.title,
      description: grant.shortDescription,
    };
  } catch {
    return {};
  }
}

export default async function GrantPage({ params }: PageProps) {
  const { slug } = await params;
  let grant: Grant | null = null;

  try {
    grant = await sanityFetch<Grant | null>(grantBySlugQuery, { slug }, {
      revalidate: 300,
      tags: [`grant:${slug}`],
    });
  } catch {
    notFound();
  }

  if (!grant) notFound();

  const days = grant.deadline ? daysUntil(grant.deadline) : null;
  const urgent = days !== null && days <= 14 && days > 0;

  return (
    <>
      <PageHero
        overline="Grant"
        title={grant.title}
        description={grant.shortDescription}
        coverImage={grant.coverImage}
        breadcrumbs={[
          { label: "Grants", href: "/grants" },
          { label: grant.status === "open" ? "Open Calls" : "Grants", href: grant.status === "open" ? "/grants/open-calls" : "/grants" },
          { label: grant.title },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <GrantStatusBadge status={grant.status} />
          {urgent && (
            <span className="badge bg-amber-500 text-white flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {days} days remaining
            </span>
          )}
        </div>
      </PageHero>

      <section className="section-padding bg-white">
        <div className="container-institutional">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-xl font-display font-bold text-slate-900 mb-4">About this Grant</h2>
                <p className="text-slate-600 leading-relaxed">{toPlainText(grant.description)}</p>
              </div>

              {/* Objectives */}
              {grant.objectives && grant.objectives.length > 0 && (
                <div>
                  <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Objectives</h2>
                  <ul className="space-y-2">
                    {grant.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Eligible applicants */}
              <div>
                <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Eligible Applicants</h2>
                <div className="flex flex-wrap gap-2">
                  {(grant.eligibleApplicants ?? []).map((a) => (
                    <Badge key={a} variant="teal">{applicantLabels[a] ?? a}</Badge>
                  ))}
                </div>
              </div>

              {/* Eligible countries */}
              <div>
                <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Eligible Countries</h2>
                <div className="flex flex-wrap gap-3">
                  {(grant.eligibleCountries ?? []).map((c) => (
                    <span key={c} className="flex items-center gap-1.5 text-sm text-slate-700">
                      <span className="text-lg">{getCountryFlag(c)}</span>
                      {getCountryName(c)}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              {grant.faqs && grant.faqs.length > 0 && (
                <div>
                  <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {grant.faqs.map((faq) => (
                      <div key={faq._key} className="border border-slate-100 rounded-lg p-5">
                        <h4 className="font-semibold text-slate-900 mb-2">{faq.question}</h4>
                        <p className="text-sm text-slate-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {grant.documents && grant.documents.length > 0 && (
                <div>
                  <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Documents</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {grant.documents.map((doc) => (
                      <a
                        key={doc._key}
                        href={doc.file.asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:border-brand-300 hover:bg-brand-50 transition-colors group"
                      >
                        <Download className="w-5 h-5 text-brand-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-slate-800 group-hover:text-brand-700 truncate">
                            {doc.title}
                          </div>
                          {doc.type && <div className="text-xs text-slate-500 capitalize">{doc.type}</div>}
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-brand-400 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Apply CTA */}
              {grant.status === "open" && (
                <div className="bg-teal-600 rounded-lg p-6 text-white">
                  <h3 className="font-display font-bold text-lg mb-2">Ready to Apply?</h3>
                  <p className="text-teal-100 text-sm mb-4">
                    Submit your application through our grant management system.
                  </p>
                  {grant.applicationUrl ? (
                    <a
                      href={grant.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-white text-teal-700 font-semibold py-3 px-4 rounded-sm hover:bg-teal-50 transition-colors text-sm"
                    >
                      Apply via OGMS <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href="/apply"
                      className="w-full flex items-center justify-center gap-2 bg-white text-teal-700 font-semibold py-3 px-4 rounded-sm hover:bg-teal-50 transition-colors text-sm"
                    >
                      Go to Application Portal <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )}

              {/* Key facts */}
              <div className="card p-5 space-y-4">
                <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wide">Key Facts</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Grant Range</span>
                    <span className="font-medium text-slate-800">
                      {formatCurrency(grant.minGrantAmount, grant.currency)} – {formatCurrency(grant.maxGrantAmount, grant.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Budget</span>
                    <span className="font-medium text-slate-800">
                      {formatCurrency(grant.totalBudget, grant.currency)}
                    </span>
                  </div>
                  {grant.coFinancingRequired && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Co-financing</span>
                      <span className="font-medium text-slate-800">{grant.coFinancingRate}%</span>
                    </div>
                  )}
                  {grant.deadline && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Deadline</span>
                      <span className="font-medium text-slate-800">{formatDate(grant.deadline)}</span>
                    </div>
                  )}
                  {grant.resultsDate && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Results</span>
                      <span className="font-medium text-slate-800">{formatDate(grant.resultsDate)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contacts */}
              {grant.contacts && grant.contacts.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wide mb-3">
                    Grant Contacts
                  </h3>
                  <div className="space-y-3">
                    {grant.contacts.map((c) => (
                      <div key={c._id} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4 text-brand-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800">{c.fullName}</div>
                          <div className="text-xs text-slate-500">{c.role}</div>
                          {c.email && (
                            <a href={`mailto:${c.email}`} className="text-xs text-brand-600 hover:text-brand-700">
                              {c.email}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Link href="/grants/how-to-apply" className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 font-medium">
                <ArrowRight className="w-4 h-4" />
                How to Apply Guide
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
