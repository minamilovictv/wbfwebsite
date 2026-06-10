import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImageUrl } from "@/lib/sanity/client";
import { Badge, GrantStatusBadge } from "@/components/ui/Badge";
import type { Program } from "@/types";

const FALLBACK_PROGRAMS = [
  {
    slug: "ggi-grants",
    name: "GGI Grants — Grassroots & Civil Society",
    desc: "Funds regional cooperation projects led by CSOs, cultural institutions, education bodies, and grassroots organizations across WB6. Call No. 8 under evaluation.",
    status: "review" as const,
    badge: "Under Review",
    grant: "€15,000",
    grantSub: "max grant",
    date: "Results: June 2026",
  },
  {
    slug: "matching-grants",
    name: "Matching Grants",
    desc: "Supports organizations that have secured co-funding from another source, amplifying their impact through matched WBF support. Rolling basis, no deadline.",
    status: "open" as const,
    badge: "Always Open",
    grant: "€10,000",
    grantSub: "max grant",
    date: "No deadline — rolling basis",
  },
  {
    slug: "visegrad-fellowship",
    name: "Visegrad Fellowship — 3rd Edition",
    desc: "Supports doctoral students and graduates from WB6 connecting with V4 countries — Czech Republic, Hungary, Poland, Slovakia. In partnership with the International Visegrad Fund.",
    status: "open" as const,
    badge: "Open",
    grant: "Fellowship",
    grantSub: "mobility grant",
    date: "Deadline: 30 June 2026",
  },
  {
    slug: "erc-grants",
    name: "ERC Grants — EU Co-funded",
    desc: "Larger EU co-funded grants for established organizations. Autumn 2026 opening — register your organization to be notified.",
    status: "upcoming" as const,
    badge: "Coming Soon",
    grant: "€30,000",
    grantSub: "max grant",
    date: "Opening: Autumn 2026",
  },
  {
    slug: "move-grants",
    name: "Move Grants",
    desc: "Supports individuals creating new regional connections — framed around purpose and output, not travel. Open to individuals. New call anticipated.",
    status: "upcoming" as const,
    badge: "Coming Soon",
    grant: "Travel grant",
    grantSub: "for individuals",
    date: "Next call: TBC",
  },
  {
    slug: "advocacy-networking",
    name: "Advocacy & Networking Events",
    desc: "Seven annual events connecting CSOs, governmental instances, and LeadBalkans platform participants. Japan-funded, focused on regional advocacy.",
    status: "open" as const,
    badge: "Open",
    grant: "7 events",
    grantSub: "annual",
    date: "LeadBalkans Platform →",
  },
];

const statusColors: Record<string, string> = {
  open: "bg-emerald-400/20 text-emerald-300",
  review: "bg-amber-400/20 text-amber-300",
  upcoming: "bg-white/12 text-white/75",
  closed: "bg-white/10 text-white/70",
};

interface ProgramsOverviewProps {
  programs?: Program[];
}

export function ProgramsOverview({ programs = [] }: ProgramsOverviewProps) {
  return (
    <section className="section-padding bg-gradient-to-br from-brand-700 via-brand-500 to-brand-400 relative overflow-hidden" id="programs">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-radial-[circle,rgba(255,255,255,0.08)_0%,transparent_70%] pointer-events-none" />

      <div className="container-institutional relative z-10">
        <div className="flex items-end justify-between mb-11">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 mb-2">
              Funding Opportunities
            </p>
            <h2 className="font-display text-3xl font-semibold text-white">Our Programs</h2>
          </div>
          <Link
            href="/programs"
            className="text-sm font-semibold text-white/80 border border-white/30 rounded-sm px-4 py-2 hover:border-white/60 hover:text-white transition-colors"
          >
            View All Programs →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {FALLBACK_PROGRAMS.map((p) => (
            <Link
              key={p.slug}
              href={`/programs/${p.slug}`}
              className="group flex flex-col bg-white/8 border border-white/15 rounded-lg p-5 hover:bg-white/14 hover:border-white/25 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.05em] px-2.5 py-1 rounded-full ${statusColors[p.status]}`}
                >
                  {p.badge}
                </span>
                <div className="text-right">
                  <div className="text-sm font-semibold text-white/90">{p.grant}</div>
                  <div className="text-[11px] text-white/60">{p.grantSub}</div>
                </div>
              </div>

              <h3 className="text-base font-semibold text-white mb-2 leading-snug flex-1">
                {p.name}
              </h3>
              <p className="text-[13px] text-white/70 leading-relaxed mb-4">{p.desc}</p>

              <div className="flex items-center justify-between pt-3 border-t border-white/15">
                <span className="text-xs text-white/55">{p.date}</span>
                <div className="w-6 h-6 rounded-full bg-white/12 flex items-center justify-center text-[13px] text-white/60 group-hover:bg-white/22 group-hover:text-white transition-all">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
