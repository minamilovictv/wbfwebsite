import Link from "next/link";

const stats = [
  { value: "500+", label: "Projects funded", sub: "Across all programs and calls" },
  { value: "€8M+", label: "Total funding disbursed", sub: "EU co-funded and bilateral" },
  { value: "2,000+", label: "Organizations supported", sub: "CSOs, institutions, universities" },
  { value: "263", label: "Applications — GGI Call 8", sub: "Record for the GGI scheme" },
];

const countries = [
  { flag: "🇦🇱", name: "Albania", projects: "82 projects" },
  { flag: "🇧🇦", name: "Bosnia & Herzegovina", projects: "76 projects" },
  { flag: "🇽🇰", name: "Kosovo*", projects: "68 projects" },
  { flag: "🇲🇰", name: "North Macedonia", projects: "71 projects" },
  { flag: "🇲🇪", name: "Montenegro", projects: "74 projects" },
  { flag: "🇷🇸", name: "Serbia", projects: "79 projects" },
];

export function ImpactStats() {
  return (
    <section className="section-padding bg-white" id="impact">
      <div className="container-institutional">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-overline text-brand-600 mb-3">Our Impact</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Regional change, measured
          </h2>
          <p className="text-base text-slate-500 max-w-[50ch] mx-auto">
            Across all programs and eight calls, WBF has supported hundreds of organizations
            building a more connected Western Balkans.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map(({ value, label, sub }) => (
            <div
              key={label}
              className="card p-6 text-center hover:-translate-y-0.5 transition-transform"
            >
              <div className="font-display text-4xl font-bold text-brand-700 leading-none mb-2">
                {value}
              </div>
              <div className="text-sm font-semibold text-slate-800 mb-1">{label}</div>
              <div className="text-xs text-slate-400">{sub}</div>
            </div>
          ))}
        </div>

        {/* Country coverage */}
        <div className="card p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
              Six Contracting Parties, one region
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Every WBF project must cross at least three of the six Western Balkans territories.
              Projects covering all six are given priority in evaluation.
            </p>
            <div className="flex flex-col gap-2">
              {countries.map(({ flag, name, projects }) => (
                <div
                  key={name}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-100 rounded-sm text-sm"
                >
                  <span className="text-base">{flag}</span>
                  <span className="font-medium text-slate-800 flex-1">{name}</span>
                  <span className="text-xs text-slate-400">{projects}</span>
                </div>
              ))}
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                * Without prejudice to positions on status, in line with UNSCR 1244/1999 and the
                ICJ Opinion on the Kosovo declaration of independence.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center gap-6">
            <div className="text-7xl">🗺️</div>
            <div>
              <p className="font-display text-lg font-semibold text-slate-800 mb-2">
                Funding that crosses borders
              </p>
              <p className="text-sm text-slate-500 max-w-[32ch] mx-auto leading-relaxed">
                Every project connects at least 3 contracting parties, building regional ties from
                the ground up.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              Browse all projects →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
