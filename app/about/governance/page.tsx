import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Landmark,
  Users,
  UserCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Scale,
  Eye,
  ShieldCheck,
  ClipboardCheck,
  FileText,
  Download,
  ExternalLink,
  Shield,
} from "lucide-react";
import { sanityFetch, getImageUrl } from "@/lib/sanity/client";
import { governancePageQuery } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils/formatters";
import type { GovernanceBody, GovernanceDocument, GovernancePrinciple } from "@/types";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Governance",
  description:
    "The governing bodies of the Western Balkans Fund — the Conference of Ministers of Foreign Affairs, the Council of Senior Officials, the Executive Director, and the Secretariat.",
};

// ── Fallback content (mirrors the documents seeded in Sanity) ──────────────

const FALLBACK_BODIES = [
  {
    icon: "ministers",
    title: "Conference of Ministers of Foreign Affairs",
    role: "Supreme decision-making body",
    description:
      "The Conference of Ministers of Foreign Affairs is the supreme body of the Fund.\n\nIt meets once a year and is composed of the Ministers of Foreign Affairs of the Contracting Parties or their duly authorized representatives.",
    responsibilitiesHeading: "The Conference approves",
    responsibilities: [
      "Annual activity plans",
      "Long-term strategic plans",
      "Annual budgets",
      "Annual financial statements",
      "Budget clearances submitted by the Council of Senior Officials",
    ],
  },
  {
    icon: "council",
    title: "Council of Senior Officials",
    role: "Strategic oversight & policy coordination",
    description:
      "The Council of Senior Officials consists of Senior Officials from the Ministries of Foreign Affairs of the Contracting Parties or other duly appointed representatives.\n\nThe Council meets at least once every six months.",
    responsibilitiesHeading: "Its responsibilities include",
    responsibilities: [
      "Preparing draft budgets of the Fund",
      "Reviewing utilization of financial resources",
      "Submitting budgets and reports to the Conference of Ministers",
      "Establishing binding guidelines for the Executive Director",
      "Defining rules governing project preparation, evaluation, approval, and implementation",
    ],
  },
  {
    icon: "director",
    title: "Executive Director",
    role: "Leadership, implementation & representation",
    description:
      "The Executive Director serves as the chief executive officer of the Fund and is responsible for implementing the objectives of the Fund and ensuring its effective performance.",
    responsibilitiesHeading: "Key responsibilities include",
    responsibilities: [
      "Representing the Fund and its interests",
      "Signing agreements necessary for the functioning of the Fund",
      "Leading fundraising efforts",
      "Preparing budgets and reports for decision-making bodies",
      "Coordinating Calls for Proposals",
      "Supervising project evaluations",
      "Preparing recommendations for grant awards",
      "Engaging with stakeholders throughout the Western Balkans region",
      "Representing WBF at regional and international events",
    ],
  },
  {
    icon: "secretariat",
    title: "Secretariat",
    role: "The operational backbone",
    description:
      "The Secretariat is responsible for the day-to-day operations of the Fund.",
    responsibilitiesHeading: "As the administrative body of WBF, it",
    responsibilities: [
      "Implements decisions of the governing bodies",
      "Coordinates daily operations",
      "Supports programme implementation",
      "Ensures institutional continuity",
      "Provides operational and administrative support",
    ],
  },
];

const FALLBACK_PRINCIPLES = [
  { icon: "equal", title: "Equal Representation", description: "All six member states have equal weight in governance bodies." },
  { icon: "transparency", title: "Transparency", description: "All funding decisions, budgets, and reports are publicly available." },
  { icon: "independence", title: "Independence", description: "Grant decisions are made by independent evaluation panels." },
  { icon: "accountability", title: "Accountability", description: "External audits are conducted annually by independent auditors." },
];

const FALLBACK_DOCUMENTS = [
  { title: "WBF Statute", category: "statute" },
  { title: "Rules of Procedure", category: "rules" },
  { title: "Financial Regulations", category: "financial" },
  { title: "Annual Report 2024", category: "report" },
  { title: "External Audit Report 2023", category: "audit" },
];

const bodyIcons: Record<string, typeof Users> = {
  ministers: Landmark,
  council: Users,
  director: UserCheck,
  secretariat: Building2,
};

const principleIcons: Record<string, typeof Users> = {
  equal: Scale,
  transparency: Eye,
  independence: ShieldCheck,
  accountability: ClipboardCheck,
};

const documentCategoryLabels: Record<string, string> = {
  statute: "Statute",
  rules: "Rules & Procedures",
  financial: "Financial Regulations",
  report: "Annual Report",
  audit: "Audit Report",
  other: "Document",
};

interface GovernanceData {
  bodies: GovernanceBody[];
  principles: GovernancePrinciple[];
  documents: GovernanceDocument[];
}

function anchorId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function GovernancePage() {
  let data: GovernanceData = { bodies: [], principles: [], documents: [] };
  try {
    data = await sanityFetch<GovernanceData>(governancePageQuery, {}, { revalidate: 0, tags: ["governance"] });
  } catch {}

  const bodies: GovernanceBody[] =
    data.bodies.length > 0
      ? data.bodies
      : FALLBACK_BODIES.map((b, i) => ({ _id: `fallback-${i}`, ...b }));
  const principles: GovernancePrinciple[] =
    data.principles.length > 0
      ? data.principles
      : FALLBACK_PRINCIPLES.map((p, i) => ({ _id: `fallback-${i}`, ...p }));
  const documents: GovernanceDocument[] =
    data.documents.length > 0
      ? data.documents
      : FALLBACK_DOCUMENTS.map((d, i) => ({ _id: `fallback-${i}`, ...d }));

  return (
    <>
      <PageHero
        overline="About"
        title="Governance"
        description="The Western Balkans Fund operates under a transparent governance framework with equal representation from all six Contracting Parties."
        variant="compact"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Governance" },
        ]}
      />

      {/* ── Structure overview ── */}
      <section className="section-padding bg-white">
        <div className="container-institutional">
          <SectionHeader
            overline="Structure"
            title="Governing Bodies of the Western Balkans Fund"
            description="The Western Balkans Fund is governed through a structured framework designed to ensure equal representation, transparency, accountability, and effective implementation of its mission across all Contracting Parties."
            align="center"
          />

          {/* Connected flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {bodies.map((body, i) => {
              const Icon = bodyIcons[body.icon ?? ""] ?? Shield;
              return (
                <a
                  key={body._id}
                  href={`#${anchorId(body.title)}`}
                  className="group relative card p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 bg-brand-900 rounded-md flex items-center justify-center">
                      <Icon className="w-5 h-5 text-teal-400" />
                    </div>
                    <span className="font-display text-2xl font-bold text-slate-200">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-[15px] leading-snug mb-1 group-hover:text-brand-700 transition-colors">
                    {body.title}
                  </h3>
                  {body.role && <p className="text-xs text-teal-600 font-medium">{body.role}</p>}
                  {/* Connector arrow (desktop) */}
                  {i < bodies.length - 1 && (
                    <span className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 items-center justify-center text-slate-300 z-10">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Body sections ── */}
      {bodies.map((body, i) => {
        const Icon = bodyIcons[body.icon ?? ""] ?? Shield;
        const imageUrl = getImageUrl(body.image, { width: 900, height: 700 });
        const paragraphs = (body.description ?? "").split(/\n\s*\n/).filter(Boolean);
        const responsibilities = body.responsibilities ?? [];
        const imageLeft = i % 2 === 1;

        return (
          <section
            key={body._id}
            id={anchorId(body.title)}
            className={`section-padding scroll-mt-24 ${i % 2 === 0 ? "bg-section-alt" : "bg-white"}`}
          >
            <div className="container-institutional">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Text */}
                <div className={imageLeft ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 bg-brand-900 rounded-md flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-teal-400" />
                    </div>
                    {body.role && (
                      <span className="badge badge-teal">{body.role}</span>
                    )}
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-5">
                    {body.title}
                  </h2>
                  <div className="space-y-3 mb-6">
                    {paragraphs.map((p, j) => (
                      <p key={j} className="text-slate-600 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>

                  {responsibilities.length > 0 && (
                    <>
                      {body.responsibilitiesHeading && (
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                          {body.responsibilitiesHeading}
                        </h3>
                      )}
                      <ul
                        className={`grid grid-cols-1 ${responsibilities.length > 6 ? "sm:grid-cols-2" : ""} gap-x-6 gap-y-2.5`}
                      >
                        {responsibilities.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* Representative image */}
                <div className={imageLeft ? "lg:order-1" : ""}>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-institutional">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={body.image?.alt ?? body.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-brand flex flex-col items-center justify-center gap-3">
                        <Icon className="w-14 h-14 text-white/30" strokeWidth={1.2} />
                        <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
                          Image coming soon
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Principles ── */}
      <section className="section-padding bg-brand-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-radial-[circle,rgba(0,168,152,0.12)_0%,transparent_70%] pointer-events-none" />
        <div className="container-institutional relative z-10">
          <SectionHeader
            overline="Principles"
            title="Governance Principles"
            align="center"
            theme="dark"
            dividerColor="white"
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {principles.map(({ _id, title, description, icon }) => {
              const Icon = principleIcons[icon ?? ""] ?? Shield;
              return (
                <div key={_id} className="bg-white/8 border border-white/15 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-teal-300" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{title}</h3>
                  {description && <p className="text-sm text-white/65 leading-relaxed">{description}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Governing documents ── */}
      <section className="section-padding bg-white">
        <div className="container-institutional">
          <SectionHeader
            overline="Resources"
            title="Governing Documents"
            description="The statutes, regulations, and reports that frame the Fund's work. Documents become downloadable as they are published."
            align="center"
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {documents.map((doc) => {
              const href = doc.fileUrl ?? doc.externalUrl;
              const available = Boolean(href);
              const inner = (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-brand-50 rounded-md flex items-center justify-center">
                      <FileText className="w-5 h-5 text-brand-600" />
                    </div>
                    {available ? (
                      doc.fileUrl ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600">
                          <Download className="w-3.5 h-3.5" /> Download
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600">
                          <ExternalLink className="w-3.5 h-3.5" /> Open
                        </span>
                      )
                    ) : (
                      <span className="badge badge-neutral">Coming Soon</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{doc.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    {doc.category && <span>{documentCategoryLabels[doc.category] ?? doc.category}</span>}
                    {doc.publicationDate && (
                      <>
                        <span>·</span>
                        <span>{formatDate(doc.publicationDate)}</span>
                      </>
                    )}
                  </div>
                  {doc.description && (
                    <p className="text-xs text-slate-500 leading-relaxed mt-2">{doc.description}</p>
                  )}
                </>
              );
              return available ? (
                <a
                  key={doc._id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-5 block hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
                >
                  {inner}
                </a>
              ) : (
                <div key={doc._id} className="card p-5 opacity-80">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
