import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import {
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  CalendarDays,
  Handshake,
} from "lucide-react";
import { sanityFetch, getLogoUrl } from "@/lib/sanity/client";
import { partnerBySlugQuery } from "@/lib/sanity/queries";
import type { Partner } from "@/types";

export const revalidate = 0;

interface DonorInfo {
  name: string;
  description: string;
}

// Fallback content for when the CMS is unreachable.
const DONORS: Record<string, DonorInfo> = {
  "european-union": {
    name: "European Union",
    description:
      "The European Union is a key donor of the Western Balkans Fund, supporting regional cooperation and civil society across the Western Balkans.",
  },
  switzerland: {
    name: "Switzerland",
    description:
      "Switzerland supports WBF's regional cooperation programmes through the Swiss Agency for Development and Cooperation (SDC).",
  },
  japan: {
    name: "Government of Japan",
    description:
      "Japan funds WBF's Advocacy & Networking Events programme and the LeadBalkans platform through the Japanese Government.",
  },
  germany: {
    name: "Federal Foreign Office of Germany",
    description:
      "Germany supports WBF's civil society and democratic governance programmes through the Federal Foreign Office.",
  },
  "visegrad-fund": {
    name: "International Visegrad Fund",
    description:
      "The International Visegrad Fund is WBF's partner in the Visegrad Fellowship programme, connecting Western Balkans youth with the V4 countries of Central Europe.",
  },
  "open-society-foundations": {
    name: "Open Society Foundations",
    description:
      "Open Society Foundations support WBF's civil society strengthening and independent media initiatives across the Western Balkans.",
  },
};

const SLUG_ALIASES: Record<string, string> = {
  europeanunion: "european-union",
  "european-union-ipa-iii": "european-union",
  "switzerland-seco-sdc": "switzerland",
};

const upcomingTopics = [
  { title: "Our Cooperation", desc: "How this partner and the Western Balkans Fund work together across the region." },
  { title: "Supported Projects", desc: "Projects and programmes made possible through this partner's support." },
  { title: "Funding Support", desc: "An overview of the funding instruments and contributions provided." },
  { title: "Impact", desc: "Results and impact achieved through our joint work across the Western Balkans." },
];

const STATUS_LABELS: Record<string, string> = {
  active: "Active partnership",
  concluded: "Concluded",
  paused: "Paused",
};

function fallbackFromSlug(slug: string): DonorInfo {
  const known = DONORS[SLUG_ALIASES[slug] ?? slug];
  if (known) return known;
  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    name,
    description: `${name} supports the work of the Western Balkans Fund across the region.`,
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const partner = await fetchPartner(slug);
  const fallback = fallbackFromSlug(slug);
  return {
    title: `${partner?.name ?? fallback.name} — Donors & Partners`,
    description: partner?.description ?? fallback.description,
  };
}

async function fetchPartner(slug: string): Promise<Partner | null> {
  try {
    return await sanityFetch<Partner | null>(partnerBySlugQuery, { slug }, { revalidate: 0 });
  } catch {
    return null;
  }
}

export default async function DonorPage({ params }: PageProps) {
  const { slug } = await params;
  const partner = await fetchPartner(slug);
  const fallback = fallbackFromSlug(slug);

  const name = partner?.name ?? fallback.name;
  const description = partner?.description ?? fallback.description;
  const logoUrl = getLogoUrl(partner?.logo, 480);
  const overviewParagraphs = (partner?.partnershipOverview ?? partner?.longDescription ?? "")
    .split(/\n\s*\n/)
    .filter(Boolean);
  const roles = [
    partner?.isFundingPartner && "Funding Partner",
    partner?.isImplementingPartner && "Implementing Partner",
    partner?.isStrategicPartner && "Strategic Partner",
  ].filter(Boolean) as string[];

  const hasRichContent =
    overviewParagraphs.length > 0 ||
    (partner?.keyAchievements?.length ?? 0) > 0 ||
    (partner?.impactMetrics?.length ?? 0) > 0 ||
    (partner?.supportedProgrammes?.length ?? 0) > 0 ||
    Boolean(partner?.fundingInfo) ||
    Boolean(partner?.beneficiaryInfo);

  return (
    <>
      <PageHero
        overline="Donors & Partners"
        title={name}
        description={description}
        variant="compact"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Donors & Partners", href: "/about/donors-partners" },
          { label: name },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional max-w-5xl">
          {/* Identity row — logo, partnership facts, links */}
          <div className="card p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 items-center mb-12">
            <div className="flex items-center justify-center h-24 bg-slate-50 rounded-md px-6">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={name}
                  width={200}
                  height={96}
                  className="max-h-20 max-w-full w-auto h-auto object-contain"
                />
              ) : (
                <Handshake className="w-10 h-10 text-brand-300" />
              )}
            </div>
            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {partner?.startYear && (
                  <span className="badge badge-neutral">
                    <CalendarDays className="w-3 h-3" /> Partner since {partner.startYear}
                  </span>
                )}
                {partner?.status && (
                  <span className={partner.status === "active" ? "badge badge-success" : "badge badge-neutral"}>
                    {STATUS_LABELS[partner.status] ?? partner.status}
                  </span>
                )}
                {roles.map((role) => (
                  <span key={role} className="badge badge-primary">{role}</span>
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                {partner?.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors"
                  >
                    Official website <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {partner?.partnershipPageUrl && (
                  <a
                    href={partner.partnershipPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors"
                  >
                    Partnership page <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {partner?.externalResources?.map((resource) => (
                  <a
                    key={resource._key ?? resource.url}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-700 transition-colors"
                  >
                    {resource.label} <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Impact metrics */}
          {(partner?.impactMetrics?.length ?? 0) > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {partner!.impactMetrics!.map((m) => (
                <div key={m._key ?? m.label} className="card p-5 text-center">
                  <div className="font-display text-2xl font-bold text-brand-700 mb-1">{m.value}</div>
                  <div className="text-xs text-slate-500">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Partnership overview */}
          {overviewParagraphs.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Our Cooperation</h2>
              <div className="space-y-4 max-w-3xl">
                {overviewParagraphs.map((p, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          )}

          {/* Key achievements */}
          {(partner?.keyAchievements?.length ?? 0) > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Key Achievements</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
                {partner!.keyAchievements!.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Funding & beneficiaries */}
          {(partner?.fundingInfo || partner?.beneficiaryInfo) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
              {partner?.fundingInfo && (
                <div className="card p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Funding Support</h3>
                  <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{partner.fundingInfo}</p>
                </div>
              )}
              {partner?.beneficiaryInfo && (
                <div className="card p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Beneficiaries</h3>
                  <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{partner.beneficiaryInfo}</p>
                </div>
              )}
            </div>
          )}

          {/* Supported programmes / calls / events / stories */}
          {((partner?.supportedProgrammes?.length ?? 0) > 0 ||
            (partner?.supportedCalls?.length ?? 0) > 0 ||
            (partner?.supportedEvents?.length ?? 0) > 0 ||
            (partner?.successStories?.length ?? 0) > 0) && (
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Supported Initiatives</h2>
              <div className="flex flex-wrap gap-2">
                {partner?.supportedProgrammes
                  ?.filter((p) => p.slug?.current)
                  .map((p) => (
                    <Link key={p._id} href={`/programs/${p.slug!.current}`} className="badge badge-teal hover:bg-teal-100 transition-colors">
                      {p.title}
                    </Link>
                  ))}
                {partner?.supportedEvents
                  ?.filter((e) => e.slug?.current)
                  .map((e) => (
                    <Link key={e._id} href={`/events/${e.slug!.current}`} className="badge badge-gold hover:bg-gold-100 transition-colors">
                      {e.title}
                    </Link>
                  ))}
                {partner?.supportedCalls?.map((call) => (
                  <span key={call} className="badge badge-neutral">{call}</span>
                ))}
              </div>
              {(partner?.successStories?.length ?? 0) > 0 && (
                <div className="flex flex-col gap-2 mt-5">
                  {partner!.successStories!
                    .filter((s) => s.slug?.current)
                    .map((s) => (
                      <Link
                        key={s._id}
                        href={`/impact/stories`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" /> {s.title}
                      </Link>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* Publications & downloads */}
          {((partner?.publications?.length ?? 0) > 0 || (partner?.downloads?.length ?? 0) > 0) && (
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Publications & Downloads</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {partner?.publications?.map((pub) => {
                  const inner = (
                    <>
                      <FileText className="w-4 h-4 text-brand-600 shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{pub.title}</span>
                      {pub.url && <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 ml-auto" />}
                    </>
                  );
                  return pub.url ? (
                    <a
                      key={pub._key ?? pub.title}
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card p-4 flex items-center gap-3 hover:shadow-card-hover transition-shadow"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={pub._key ?? pub.title} className="card p-4 flex items-center gap-3">{inner}</div>
                  );
                })}
                {partner?.downloads?.map((dl) => {
                  const inner = (
                    <>
                      <Download className="w-4 h-4 text-brand-600 shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{dl.title}</span>
                    </>
                  );
                  return dl.fileUrl ? (
                    <a
                      key={dl._key ?? dl.title}
                      href={dl.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card p-4 flex items-center gap-3 hover:shadow-card-hover transition-shadow"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={dl._key ?? dl.title} className="card p-4 flex items-center gap-3 opacity-70">{inner}</div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Placeholder topics until rich content is added in Sanity */}
          {!hasRichContent && (
            <>
              <div className="max-w-3xl mx-auto text-center mb-10">
                <p className="text-base text-slate-600 leading-relaxed">
                  Detailed information about our cooperation with {name} — including joint
                  projects, funding support, and the impact achieved together — will be published
                  here soon.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-12">
                {upcomingTopics.map(({ title, desc }) => (
                  <div key={title} className="card p-6">
                    <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="text-center">
            <Link
              href="/about/donors-partners"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              ← All Donors & Partners
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
