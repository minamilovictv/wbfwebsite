import type { Metadata } from "next";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { sanityFetch } from "@/lib/sanity/client";
import { openJobsQuery } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils/formatters";
import type { JobOpening } from "@/types";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Western Balkans Fund Secretariat — open positions and opportunities.",
};

const typeLabels: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  consultant: "Consultant",
  internship: "Internship",
};

export default async function CareersPage() {
  let jobs: JobOpening[] = [];
  try {
    jobs = await sanityFetch<JobOpening[]>(openJobsQuery, {}, { revalidate: 0 });
  } catch {}

  return (
    <>
      <PageHero
        overline="About"
        title="Careers"
        description="Join our team and help build a more connected Western Balkans."
        variant="compact"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Careers" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional max-w-3xl">
          {jobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 mx-auto mb-5 bg-brand-50 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-brand-600" />
              </div>
              <p className="text-slate-700 font-medium mb-2">No open positions at the moment.</p>
              <p className="text-sm text-slate-500">
                Check back regularly or send a speculative application to{" "}
                <a
                  href="mailto:info@westernbalkansfund.org"
                  className="text-brand-600 hover:underline"
                >
                  info@westernbalkansfund.org
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job._id} className="card p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-xs">
                    {job.type && (
                      <span className="px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">
                        {typeLabels[job.type] ?? job.type}
                      </span>
                    )}
                    {job.location && (
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5" /> {job.location}
                      </span>
                    )}
                    {job.deadline && (
                      <span className="flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3.5 h-3.5" /> Deadline: {formatDate(job.deadline)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{job.title}</h3>
                  {job.summary && (
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{job.summary}</p>
                  )}
                  {job.applicationUrl && (
                    <a
                      href={job.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
                    >
                      Apply now <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
