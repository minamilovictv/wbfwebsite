import Link from "next/link";
import { ArrowRight, FileText, Users, BarChart3 } from "lucide-react";

const stats = [
  { value: "500+", label: "Projects funded across the region" },
  { value: "€8M+", label: "Total funding disbursed" },
  { value: "6", label: "Contracting Parties covered" },
  { value: "9", label: "Active funding programs" },
];

const audienceCards = [
  {
    icon: FileText,
    title: "Apply for Funding",
    sub: "CSOs, NGOs, institutions — explore open calls",
    href: "/grants/open-calls",
    color: "bg-white/10",
  },
  {
    icon: Users,
    title: "Build a Partnership",
    sub: "Find organizations across WB6 to collaborate",
    href: "https://wbfpartnership.com",
    color: "bg-white/10",
    external: true,
  },
  {
    icon: BarChart3,
    title: "Explore Our Impact",
    sub: "Donors and governments — see what we fund",
    href: "/projects",
    color: "bg-white/10",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 60px,white 60px,white 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,white 60px,white 61px)",
        }}
      />
      {/* Orbs */}
      <div className="absolute -top-40 -right-24 w-[560px] h-[560px] rounded-full bg-radial-[circle,rgba(75,101,132,0.28)_0%,transparent_70%] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[360px] h-[360px] rounded-full bg-radial-[circle,rgba(26,54,104,0.4)_0%,transparent_70%] pointer-events-none" />

      <div className="relative container-institutional pt-24 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-end">
          {/* Left */}
          <div className="pb-16">
            <div className="inline-flex items-center gap-2 bg-white/7 border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs font-medium text-white/65 tracking-wide">
                Co-funded by the European Union · IPA III · WB6 Region
              </span>
            </div>

            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6">
              Building{" "}
              <em className="not-italic font-light text-white/65">lasting</em>
              <br />
              regional cooperation
              <br />
              across the Western Balkans
            </h1>

            <p className="text-lg text-white/60 leading-relaxed max-w-[50ch] mb-10">
              The Western Balkans Fund supports civil society, institutions, and communities across
              all six Contracting Parties — funding projects that strengthen reconciliation, EU
              integration, and people-to-people ties.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/grants/open-calls"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-900 font-semibold text-sm rounded-sm hover:bg-slate-100 transition-colors"
              >
                Explore Funding Programs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 text-white/75 border border-white/20 rounded-sm hover:border-white/45 hover:text-white transition-colors text-sm font-semibold"
              >
                About WBF
              </Link>
            </div>
          </div>

          {/* Right — audience cards */}
          <div className="pb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30 mb-4">
              I am looking to…
            </p>
            <div className="flex flex-col gap-3">
              {audienceCards.map(({ icon: Icon, title, sub, href, external }) => {
                const inner = (
                  <div className="flex items-center gap-4 bg-white/5 border border-white/9 rounded-lg px-5 py-4 hover:bg-white/9 hover:border-white/18 transition-all group cursor-pointer">
                    <div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white mb-0.5">{title}</div>
                      <div className="text-xs text-white/50">{sub}</div>
                    </div>
                    <span className="text-white/25 group-hover:text-white/60 transition-colors text-base">→</span>
                  </div>
                );
                return external ? (
                  <a key={title} href={href} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <Link key={title} href={href}>
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/7 bg-black/20">
        <div className="container-institutional">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className={`py-6 px-6 ${i < stats.length - 1 ? "border-r border-white/7" : ""}`}
              >
                <div className="font-display text-3xl font-bold text-white leading-none mb-1">
                  {value}
                </div>
                <div className="text-sm text-white/45">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
