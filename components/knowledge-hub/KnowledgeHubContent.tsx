"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Compass,
  FileText,
  Users,
  Presentation,
  Target,
  Layers,
  BookOpen,
  Download,
  PlayCircle,
  Newspaper,
  ClipboardList,
  ArrowRight,
  Clock,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { LearningPath, KnowledgeResource, KnowledgeDownload, CaseStudy } from "@/types";

// ── Display maps ────────────────────────────────────────────────────────────

const pathIcons: Record<string, LucideIcon> = {
  compass: Compass,
  "file-text": FileText,
  users: Users,
  presentation: Presentation,
  target: Target,
  layers: Layers,
};

const pathColors: Record<string, { bg: string; text: string; border: string }> = {
  brand:   { bg: "bg-brand-50",   text: "text-brand-700",   border: "border-t-brand-600" },
  teal:    { bg: "bg-teal-50",    text: "text-teal-700",    border: "border-t-teal-600" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-t-emerald-600" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-t-amber-500" },
  rose:    { bg: "bg-rose-50",    text: "text-rose-700",    border: "border-t-rose-500" },
};

const levelBadge: Record<string, string> = {
  beginner: "badge-success",
  intermediate: "badge-warning",
  advanced: "badge-primary",
};

const resourceTypeMeta: Record<string, { label: string; icon: LucideIcon }> = {
  guide:    { label: "Guide",    icon: BookOpen },
  toolkit:  { label: "Toolkit",  icon: Layers },
  template: { label: "Template", icon: ClipboardList },
  video:    { label: "Video",    icon: PlayCircle },
  webinar:  { label: "Webinar",  icon: Presentation },
  article:  { label: "Article",  icon: Newspaper },
  report:   { label: "Report",   icon: FileText },
};

const topicLabels: Record<string, string> = {
  applying: "Applying for Funding",
  "project-management": "Project Management",
  reporting: "Reporting & Compliance",
  communications: "Communications & Visibility",
  partnerships: "Regional Partnerships",
  policy: "Policy & Research",
};

const themeLabels: Record<string, string> = {
  culture: "Cultural Cooperation",
  education: "Education & Youth",
  environment: "Environment & Sustainability",
  governance: "Governance & Advocacy",
  "social-inclusion": "Social Inclusion",
};

const TYPE_FILTERS = ["all", "guide", "toolkit", "template", "video", "webinar", "article", "report"] as const;

// ── Section heading helper ──────────────────────────────────────────────────

function SectionHeading({ overline, title, intro }: { overline: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl mb-10">
      <p className="text-overline text-brand-600 mb-3">{overline}</p>
      <h2 className="text-section-title text-slate-900 mb-3">{title}</h2>
      {intro && <p className="text-slate-500 leading-relaxed">{intro}</p>}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

interface KnowledgeHubContentProps {
  learningPaths: LearningPath[];
  resources: KnowledgeResource[];
  downloads: KnowledgeDownload[];
  caseStudies: CaseStudy[];
}

export function KnowledgeHubContent({
  learningPaths,
  resources,
  downloads,
  caseStudies,
}: KnowledgeHubContentProps) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_FILTERS)[number]>("all");

  const filteredResources = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (typeFilter !== "all" && r.type !== typeFilter) return false;
      if (!q) return true;
      return [r.title, r.summary, topicLabels[r.topic ?? ""], resourceTypeMeta[r.type]?.label]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q));
    });
  }, [resources, query, typeFilter]);

  const featuredResources = resources.filter((r) => r.featured);

  return (
    <>
      {/* ── Search bar (overlapping hero) ───────────────────────────────── */}
      <div className="container-institutional relative z-10 -mt-7">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-card border border-slate-200 flex items-center gap-3 px-4 py-3.5">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, toolkits, templates, videos…"
            className="w-full bg-transparent text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
            aria-label="Search the Knowledge Hub"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[12px] font-medium text-slate-400 hover:text-slate-600 shrink-0"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Learning Paths ──────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-institutional">
          <SectionHeading
            overline="Learning Paths"
            title="Structured tracks, from first application to final report"
            intro="Follow a curated sequence of modules designed for your role and experience level."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path) => {
              const Icon = pathIcons[path.icon ?? ""] ?? GraduationCap;
              const colors = pathColors[path.color ?? "brand"] ?? pathColors.brand;
              return (
                <div
                  key={path._id}
                  className={cn("card card-hover p-6 border-t-4 flex flex-col", colors.border)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("w-11 h-11 rounded-md flex items-center justify-center", colors.bg)}>
                      <Icon className={cn("w-5 h-5", colors.text)} />
                    </div>
                    {path.level && (
                      <span className={levelBadge[path.level] ?? "badge-neutral"}>
                        {path.level.charAt(0).toUpperCase() + path.level.slice(1)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-[16px] mb-2">{path.title}</h3>
                  {path.summary && (
                    <p className="text-[13.5px] text-slate-500 leading-relaxed mb-4">{path.summary}</p>
                  )}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-[12.5px] text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      {path.modules?.length ?? 0} modules
                    </span>
                    {path.estimatedDuration && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {path.estimatedDuration}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Resource Library ────────────────────────────────────────────── */}
      <section className="section-padding bg-slate-50">
        <div className="container-institutional">
          <SectionHeading
            overline="Resource Library"
            title="Browse all resources"
            intro="Guides, toolkits, templates, and recordings — searchable and filterable by format."
          />

          {/* Type filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TYPE_FILTERS.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={cn(
                  "px-3.5 py-1.5 text-[13px] font-medium rounded-full border transition-colors",
                  typeFilter === t
                    ? "bg-brand-800 text-white border-brand-800"
                    : "bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-700"
                )}
              >
                {t === "all" ? "All" : (resourceTypeMeta[t]?.label ?? t)}
              </button>
            ))}
          </div>

          {filteredResources.length === 0 ? (
            <div className="card p-10 text-center text-slate-500">
              No resources match your search{query && <> for &ldquo;{query}&rdquo;</>}. Try a different
              term or filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredResources.map((r) => {
                const meta = resourceTypeMeta[r.type] ?? resourceTypeMeta.guide;
                const Icon = meta.icon;
                return (
                  <div key={r._id} className="card card-hover p-5 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-brand-700" />
                      </span>
                      <span className="badge-neutral">{meta.label}</span>
                      {r.topic && (
                        <span className="text-[11px] text-slate-400 truncate">{topicLabels[r.topic]}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-[15px] mb-1.5">{r.title}</h3>
                    {r.summary && (
                      <p className="text-[13px] text-slate-500 leading-relaxed mb-4 line-clamp-3">{r.summary}</p>
                    )}
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                      <span className="flex items-center gap-1.5">
                        {r.duration && (
                          <>
                            <Clock className="w-3.5 h-3.5" /> {r.duration}
                          </>
                        )}
                      </span>
                      {r.download?.fileType && (
                        <span className="flex items-center gap-1 text-brand-700 font-medium">
                          <Download className="w-3.5 h-3.5" />
                          {r.download.fileType}
                          {r.download.fileSize && <span className="text-slate-400"> · {r.download.fileSize}</span>}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Downloads strip */}
          {downloads.length > 0 && (
            <div className="mt-12">
              <h3 className="font-semibold text-slate-900 text-[16px] mb-4 flex items-center gap-2">
                <Download className="w-4 h-4 text-brand-700" />
                Quick downloads
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {downloads.map((d) => (
                  <div
                    key={d._id}
                    className="card p-4 flex items-start gap-3 hover:border-brand-300 transition-colors"
                  >
                    <div className="w-9 h-9 bg-brand-50 rounded-md flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-brand-700" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold text-slate-800 leading-snug">{d.title}</p>
                      <p className="text-[11.5px] text-slate-400 mt-0.5">
                        {[d.fileType, d.fileSize].filter(Boolean).join(" · ") || "Coming soon"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Featured Resources ──────────────────────────────────────────── */}
      {featuredResources.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-institutional">
            <SectionHeading
              overline="Featured"
              title="Start with these"
              intro="Hand-picked resources our team recommends most often."
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredResources.slice(0, 3).map((r, i) => {
                const meta = resourceTypeMeta[r.type] ?? resourceTypeMeta.guide;
                const Icon = meta.icon;
                return (
                  <div
                    key={r._id}
                    className={cn(
                      "rounded-lg p-6 flex flex-col",
                      i === 0
                        ? "bg-brand-900 text-white"
                        : "card card-hover"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={cn(
                          "w-9 h-9 rounded-md flex items-center justify-center shrink-0",
                          i === 0 ? "bg-white/10" : "bg-brand-50"
                        )}
                      >
                        <Icon className={cn("w-4 h-4", i === 0 ? "text-teal-300" : "text-brand-700")} />
                      </span>
                      <span className={i === 0 ? "badge bg-white/10 text-teal-300" : "badge-primary"}>
                        {meta.label}
                      </span>
                    </div>
                    <h3 className={cn("font-semibold text-[16px] mb-2", i === 0 ? "text-white" : "text-slate-900")}>
                      {r.title}
                    </h3>
                    {r.summary && (
                      <p className={cn("text-[13.5px] leading-relaxed mb-5", i === 0 ? "text-slate-300" : "text-slate-500")}>
                        {r.summary}
                      </p>
                    )}
                    <span
                      className={cn(
                        "mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold",
                        i === 0 ? "text-teal-300" : "text-brand-700"
                      )}
                    >
                      Open resource <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Case Studies ────────────────────────────────────────────────── */}
      <section className="section-padding bg-slate-50">
        <div className="container-institutional">
          <SectionHeading
            overline="Case Studies"
            title="Learn from real projects"
            intro="In-depth looks at how grantees designed, delivered, and reported regional cooperation projects."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((cs) => (
              <div key={cs._id} className="card card-hover p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  {cs.theme && <span className="badge-teal">{themeLabels[cs.theme] ?? cs.theme}</span>}
                  {cs.programTitle && (
                    <span className="text-[11.5px] text-slate-400 truncate">{cs.programTitle}</span>
                  )}
                </div>
                <h3 className="font-semibold text-slate-900 text-[16px] mb-1">{cs.title}</h3>
                {cs.organization && (
                  <p className="text-[12.5px] text-slate-400 mb-2.5">{cs.organization}</p>
                )}
                {cs.summary && (
                  <p className="text-[13.5px] text-slate-500 leading-relaxed mb-4">{cs.summary}</p>
                )}
                {cs.keyResults && cs.keyResults.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-3 gap-3">
                    {cs.keyResults.slice(0, 3).map((kr, idx) => (
                      <div key={kr._key ?? idx}>
                        <div className="text-[17px] font-bold text-brand-800">{kr.value}</div>
                        <div className="text-[11px] text-slate-500 leading-tight">{kr.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/impact/stories" className="btn-outline">
              Explore grantee stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
