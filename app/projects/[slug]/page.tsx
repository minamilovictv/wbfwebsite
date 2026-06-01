import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch, getImageUrl } from "@/lib/sanity/client";
import { projectBySlugQuery } from "@/lib/sanity/queries";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate, getCountryFlag, getCountryName } from "@/lib/utils/formatters";
import { MapPin, Calendar, Users, Building2, CheckCircle2, ArrowLeft, Download } from "lucide-react";
import type { Project } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await sanityFetch<Project | null>(projectBySlugQuery, { slug }, { revalidate: 3600 });
    if (!project) return {};
    return {
      title: project.title,
      description: project.shortDescription,
    };
  } catch {
    return {};
  }
}

const statusConfig = {
  ongoing: { label: "Ongoing", variant: "success" as const },
  completed: { label: "Completed", variant: "neutral" as const },
  suspended: { label: "Suspended", variant: "warning" as const },
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  let project: Project | null = null;

  try {
    project = await sanityFetch<Project | null>(projectBySlugQuery, { slug }, {
      revalidate: 3600,
      tags: [`project:${slug}`],
    });
  } catch {
    notFound();
  }

  if (!project) notFound();

  const coverUrl = getImageUrl(project.coverImage, { width: 1200, height: 600 });
  const status = statusConfig[project.status] ?? { label: project.status, variant: "neutral" as const };

  return (
    <article className="bg-white">
      {/* Cover */}
      {coverUrl && (
        <div className="relative h-80 lg:h-[26rem] overflow-hidden">
          <Image
            src={coverUrl}
            alt={project.coverImage?.alt ?? project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      <div className="container-institutional py-10">
        <Breadcrumb
          items={[
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant={status.variant} dot>{status.label}</Badge>
              {project.program && (
                <Badge variant="primary">{project.program.title}</Badge>
              )}
            </div>

            <h1 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4 text-balance">
              {project.title}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {project.shortDescription}
            </p>

            {project.description && (
              <div className="prose prose-slate max-w-none mb-8">
                <p>{project.description}</p>
              </div>
            )}

            {/* Outcomes */}
            {project.outcomes && project.outcomes.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Key Outcomes</h2>
                <ul className="space-y-2">
                  {project.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Partners */}
            {project.partnerOrganizations && project.partnerOrganizations.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Partner Organizations</h2>
                <div className="flex flex-wrap gap-2">
                  {project.partnerOrganizations.map((org) => (
                    <Badge key={org} variant="neutral">{org}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.gallery.map((img, i) => {
                    const imgUrl = getImageUrl(img, { width: 400, height: 300 });
                    return imgUrl ? (
                      <div key={i} className="relative h-32 rounded-lg overflow-hidden bg-slate-100">
                        <Image src={imgUrl} alt={img.alt ?? ""} fill className="object-cover" sizes="200px" />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Documents */}
            {project.documents && project.documents.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Documents</h2>
                <div className="space-y-2">
                  {project.documents.map((doc) => (
                    <a
                      key={doc._key}
                      href={doc.file?.asset?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-brand-300 hover:bg-brand-50 transition-colors group"
                    >
                      <Download className="w-4 h-4 text-brand-500 shrink-0" />
                      <span className="text-sm text-slate-700 group-hover:text-brand-700">{doc.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <Link href="/projects" className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 font-medium mt-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Key facts */}
            <div className="card p-5 space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wide">Project Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Lead Organisation</div>
                    <div className="font-medium text-slate-800">{project.implementingOrganization}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Countries</div>
                    <div className="font-medium text-slate-800">
                      {(project.countries ?? []).map((c) => (
                        <span key={c} className="mr-2">
                          {getCountryFlag(c)} {getCountryName(c)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Project Period</div>
                    <div className="font-medium text-slate-800">
                      {formatDate(project.startDate)}
                      {project.endDate && ` – ${formatDate(project.endDate)}`}
                    </div>
                  </div>
                </div>
                {project.beneficiaries && (
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">Beneficiaries</div>
                      <div className="font-medium text-slate-800">{project.beneficiaries.toLocaleString()}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Grant amount */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-5">
              <div className="text-xs text-teal-600 font-semibold uppercase tracking-wide mb-1">Grant Amount</div>
              <div className="text-2xl font-display font-bold text-teal-800">
                {formatCurrency(project.grantAmount, project.currency)}
              </div>
              {project.grant?.slug?.current && (
                <Link
                  href={`/grants/${project.grant.slug.current}`}
                  className="text-xs text-teal-600 hover:text-teal-800 mt-2 block"
                >
                  {project.grant.title} →
                </Link>
              )}
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
