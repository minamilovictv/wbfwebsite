import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MilestoneCarousel } from "@/components/about/MilestoneCarousel";
import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  Target,
  Globe2,
  Users,
  BookOpen,
  HeartHandshake,
  Landmark,
  Briefcase,
  GraduationCap,
  Palette,
  Trophy,
  FlaskConical,
  Sprout,
  Newspaper,
  Leaf,
  Star,
  Scale,
  Megaphone,
  Handshake,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { sanityFetch, getImageUrl } from "@/lib/sanity/client";
import { aboutPageQuery } from "@/lib/sanity/queries";
import { dedupePartners, donorSlug } from "@/lib/utils/partners";
import {
  FALLBACK_MANDATE,
  FALLBACK_MANDATE_FOOTNOTE,
  FALLBACK_MISSION,
  FALLBACK_VALUES_STATEMENT,
  FALLBACK_OBJECTIVES_INTRO,
  FALLBACK_BEYOND_GRANTS_INTRO,
  FALLBACK_BEYOND_GRANTS_ITEMS,
  FALLBACK_MILESTONES,
  BENEFICIARY_GROUPS,
  FALLBACK_OBJECTIVES,
  FALLBACK_GRANT_PROGRAMMES,
  FALLBACK_PARTNER_NAMES,
} from "@/lib/about-content";
import type {
  AboutPageContent,
  Milestone,
  BeneficiaryCategory,
  Objective,
  GrantProgramme,
  Partner,
} from "@/types";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "About the Western Balkans Fund",
  description:
    "The Western Balkans Fund is an international organization based in Tirana, founded by the six Western Balkans governments to promote regional cooperation, reconciliation, and people-to-people ties.",
};

interface AboutData {
  content: AboutPageContent | null;
  milestones: Milestone[];
  beneficiaries: BeneficiaryCategory[];
  objectives: Objective[];
  grantProgrammes: GrantProgramme[];
  partners: Partner[];
}

// ── Static UI config ────────────────────────────────────────────────────────

const values = [
  { icon: Shield, title: "Transparency", desc: "All funding decisions published and auditable." },
  { icon: Target, title: "Impact", desc: "Evidence-based programming focused on measurable outcomes." },
  { icon: Globe2, title: "Regionalism", desc: "Promoting cross-border cooperation over national isolation." },
  { icon: Users, title: "Inclusivity", desc: "Open to all eligible actors regardless of sector or size." },
];

const quickLinks = [
  { label: "Governance", href: "/about/governance", icon: Shield },
  { label: "Team", href: "/about/team", icon: Users },
  { label: "Member States", href: "/about/member-states", icon: Globe2 },
  { label: "Strategic Plan", href: "/about/strategic-plan", icon: BookOpen },
];

const keyFacts = [
  { icon: CalendarDays, label: "Founded", value: "November 2015" },
  { icon: Star, label: "Operational since", value: "October 2017" },
  { icon: MapPin, label: "Headquarters", value: "Tirana, Albania" },
  { icon: Globe2, label: "Contracting Parties", value: "Six, equal contributions" },
];

const groupIcons: Record<string, typeof Users> = {
  "civil-society": HeartHandshake,
  "public-sector": Landmark,
  business: Briefcase,
  education: GraduationCap,
  culture: Palette,
  community: Trophy,
};

const objectiveIcons: Record<string, typeof Users> = {
  culture: Palette,
  science: FlaskConical,
  sustainability: Sprout,
  youth: Users,
  crossborder: Globe2,
  media: Newspaper,
  environment: Leaf,
  eu: Star,
  gender: Scale,
};

const beyondIcons = [Scale, HeartHandshake, Users, Leaf, Globe2, Megaphone, Handshake];

function CtaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary">
      {children}
    </a>
  ) : (
    <Link href={href} className="btn-primary">
      {children}
    </Link>
  );
}

export default async function AboutPage() {
  let data: AboutData = {
    content: null,
    milestones: [],
    beneficiaries: [],
    objectives: [],
    grantProgrammes: [],
    partners: [],
  };
  try {
    data = await sanityFetch<AboutData>(aboutPageQuery, {}, { revalidate: 0, tags: ["about"] });
  } catch {}

  const content = data.content ?? {};
  const mandateParagraphs = (content.mandateBody ?? FALLBACK_MANDATE).split(/\n\s*\n/);
  const mandateFootnote = content.mandateFootnote ?? FALLBACK_MANDATE_FOOTNOTE;
  const mission = content.missionBody ?? FALLBACK_MISSION;
  const valuesStatement = content.valuesBody ?? FALLBACK_VALUES_STATEMENT;
  const objectivesIntro = content.objectivesIntro ?? FALLBACK_OBJECTIVES_INTRO;
  const beyondIntro = content.beyondGrantsIntro ?? FALLBACK_BEYOND_GRANTS_INTRO;
  const beyondItems =
    (content.beyondGrantsItems?.length ?? 0) > 0
      ? content.beyondGrantsItems!
      : FALLBACK_BEYOND_GRANTS_ITEMS;

  const milestones: Milestone[] =
    data.milestones.length > 0
      ? data.milestones
      : FALLBACK_MILESTONES.map((m, i) => ({ _id: `fallback-${i}`, ...m }));

  const beneficiaryGroups = BENEFICIARY_GROUPS.map((group) => {
    const cmsItems = data.beneficiaries
      .filter((b) => b.group === group.key)
      .map((b) => b.name);
    return { ...group, items: cmsItems.length > 0 ? cmsItems : group.items };
  }).filter((g) => g.items.length > 0);

  const objectives =
    data.objectives.length > 0
      ? data.objectives
      : FALLBACK_OBJECTIVES.map((o, i) => ({ _id: `fallback-${i}`, ...o }));

  const grantProgrammes =
    data.grantProgrammes.length > 0
      ? data.grantProgrammes
      : FALLBACK_GRANT_PROGRAMMES.map((g, i) => ({ _id: `fallback-${i}`, ...g }));

  const partners = dedupePartners(data.partners);

  return (
    <>
      <PageHero
        overline="About"
        title="Western Balkans Fund"
        description="An international organisation dedicated to regional cooperation, people-to-people connectivity, and the European integration of the Western Balkans."
        breadcrumbs={[{ label: "About" }]}
      />

      {/* ── Our Mandate ── */}
      <section className="section-padding bg-white">
        <div className="container-institutional">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <SectionHeader
                overline="Our Mandate"
                title="What is the Western Balkans Fund?"
              />
              <div className="mt-6 space-y-4">
                {mandateParagraphs.map((paragraph, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="mt-5 text-xs text-slate-400 leading-relaxed">{mandateFootnote}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/programs" className="btn-primary">
                  Our Programs <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/grants/open-calls" className="btn-outline">
                  Open Calls
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Key facts */}
              <div className="grid grid-cols-2 gap-4">
                {keyFacts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="card p-5">
                    <div className="w-9 h-9 bg-brand-50 rounded-md flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-0.5">
                      {label}
                    </div>
                    <div className="text-sm font-semibold text-slate-800">{value}</div>
                  </div>
                ))}
              </div>

              {/* Quick navigation */}
              <div className="grid grid-cols-2 gap-4">
                {quickLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group card p-5 hover:shadow-card-hover transition-shadow flex items-center gap-3"
                  >
                    <div className="w-9 h-9 bg-brand-50 rounded-md flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <span className="font-semibold text-sm text-slate-800 group-hover:text-brand-600 transition-colors">
                      {label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-400 transition-colors ml-auto" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="section-padding bg-section-alt">
        <div className="container-institutional">
          <SectionHeader overline="Our Values" title="What Guides Us" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 text-center">
                <div className="w-14 h-14 bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-teal-400" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestones carousel ── */}
      <section className="section-padding bg-white">
        <div className="container-institutional">
          <SectionHeader
            overline="History"
            title="Key Milestones"
            description="A decade of building regional cooperation — from the founding agreement to today."
          />
          <div className="mt-8">
            <MilestoneCarousel milestones={milestones} />
          </div>
        </div>
      </section>

      {/* ── Who We Support ── */}
      <section className="section-padding bg-section-alt">
        <div className="container-institutional">
          <SectionHeader
            overline="Who We Support"
            title="Open to the whole region"
            description="WBF funding is open to a wide range of organizations and institutions working across borders in the Western Balkans."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {beneficiaryGroups.map(({ key, label, items }) => {
              const Icon = groupIcons[key] ?? Users;
              return (
                <div key={key} className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand-50 rounded-md flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 text-[15px]">{label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span key={item} className="badge badge-neutral">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mission & Values statements ── */}
      <section className="section-padding bg-gradient-brand text-white">
        <div className="container-institutional">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/8 border border-white/15 rounded-lg p-8 lg:p-10">
              <p className="text-overline text-teal-300 mb-3">Our Mission</p>
              <div className="w-10 h-1 rounded-full bg-white/60 mb-5" />
              <p className="text-base lg:text-lg text-white/85 leading-relaxed">{mission}</p>
            </div>
            <div className="bg-white/8 border border-white/15 rounded-lg p-8 lg:p-10">
              <p className="text-overline text-teal-300 mb-3">Values</p>
              <div className="w-10 h-1 rounded-full bg-white/60 mb-5" />
              <p className="text-base lg:text-lg text-white/85 leading-relaxed">{valuesStatement}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Objectives ── */}
      <section className="section-padding bg-white">
        <div className="container-institutional">
          <SectionHeader
            overline="Objectives"
            title="What we work toward"
            description={objectivesIntro}
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {objectives.map(({ _id, title, description, icon }) => {
              const Icon = objectiveIcons[icon ?? ""] ?? Target;
              return (
                <div key={_id} className="card p-6 flex gap-4 items-start hover:shadow-card-hover transition-shadow">
                  <div className="w-11 h-11 bg-brand-900 rounded-md flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-[15px] mb-1">{title}</h3>
                    {description && <p className="text-[13px] text-slate-500 leading-relaxed">{description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Types of Grants ── */}
      <section className="section-padding bg-section-alt">
        <div className="container-institutional">
          <SectionHeader
            overline="Types of Grants"
            title="Our grant programmes"
            description="From grassroots initiatives to regional fellowships — WBF offers funding instruments for every scale of cooperation."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {grantProgrammes.map(({ _id, name, description, url }) => {
              const inner = (
                <>
                  <h3 className="font-semibold text-slate-900 text-[15px] mb-2 group-hover:text-brand-600 transition-colors">
                    {name}
                  </h3>
                  {description && (
                    <p className="text-[13px] text-slate-500 leading-relaxed flex-1">{description}</p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </>
              );
              return url ? (
                <Link key={_id} href={url} className="group card card-institutional p-6 flex flex-col hover:shadow-card-hover transition-shadow">
                  {inner}
                </Link>
              ) : (
                <div key={_id} className="card card-institutional p-6 flex flex-col">
                  {inner}
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <CtaLink href={content.grantsCtaUrl ?? "/programs"}>
              {content.grantsCtaLabel ?? "Explore Grant Programmes"} <ArrowRight className="w-4 h-4" />
            </CtaLink>
          </div>
        </div>
      </section>

      {/* ── Beyond Grants ── */}
      <section className="section-padding bg-brand-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-radial-[circle,rgba(0,168,152,0.12)_0%,transparent_70%] pointer-events-none" />
        <div className="container-institutional relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              overline="Beyond Grants"
              title="A regional voice, not only a funder"
              description={beyondIntro}
              align="center"
              theme="dark"
              dividerColor="white"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-10 max-w-3xl mx-auto">
            {beyondItems.map((item, i) => {
              const Icon = beyondIcons[i % beyondIcons.length];
              return (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-5 py-2.5 text-sm font-medium text-white/85"
                >
                  <Icon className="w-4 h-4 text-teal-300" />
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="section-padding bg-white">
        <div className="container-institutional">
          <SectionHeader
            overline="Partners"
            title="Working alongside the region's key institutions"
            description={
              content.partnersIntro ??
              "WBF cooperates with international donors and regional organizations that share its vision of a connected Western Balkans."
            }
            align="center"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {partners.length > 0
              ? partners.map((partner) => {
                  const logoUrl = getImageUrl(partner.logo, { width: 320, height: 160 });
                  return (
                    <Link
                      key={partner._id}
                      href={`/donors/${donorSlug(partner)}`}
                      className="group card p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[120px] hover:shadow-card-hover transition-shadow"
                    >
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={partner.name}
                          width={140}
                          height={70}
                          className="object-contain max-h-12 w-auto"
                        />
                      ) : (
                        <div className="w-11 h-11 bg-brand-50 rounded-full flex items-center justify-center">
                          <Handshake className="w-5 h-5 text-brand-600" />
                        </div>
                      )}
                      <span className="text-[13px] font-semibold text-slate-700 group-hover:text-brand-700 transition-colors leading-snug">
                        {partner.name}
                      </span>
                    </Link>
                  );
                })
              : FALLBACK_PARTNER_NAMES.map((name) => (
                  <div
                    key={name}
                    className="card p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[120px]"
                  >
                    <div className="w-11 h-11 bg-brand-50 rounded-full flex items-center justify-center">
                      <Handshake className="w-5 h-5 text-brand-600" />
                    </div>
                    <span className="text-[13px] font-semibold text-slate-700 leading-snug">{name}</span>
                  </div>
                ))}
          </div>
          <div className="text-center mt-10">
            <CtaLink href={content.partnersCtaUrl ?? "/about/donors-partners"}>
              {content.partnersCtaLabel ?? "Find out more about our Partners"}{" "}
              <ArrowUpRight className="w-4 h-4" />
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
