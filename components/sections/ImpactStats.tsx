import Link from "next/link";

const stats = [
  { value: "500+", label: "Projects funded", sub: "Across all programs and calls" },
  { value: "€8M+", label: "Total funding disbursed", sub: "EU co-funded and bilateral" },
  { value: "2,000+", label: "Organizations supported", sub: "CSOs, institutions, universities" },
  { value: "263", label: "Applications — GGI Call 8", sub: "Record for the GGI scheme" },
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

        {/* Regional coverage */}
        <div className="card px-8 py-12 lg:px-16 lg:py-16 text-center">
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
            Six Contracting Parties, One Region
          </h3>
          <div className="max-w-[68ch] mx-auto space-y-4 mb-8">
            <p className="text-base text-slate-600 leading-relaxed">
              The Western Balkans Fund supports regional cooperation and people-to-people
              connections across the entire Western Balkans region. Through grants, partnerships,
              and joint initiatives, we work to strengthen collaboration among civil society
              organizations, institutions, and communities throughout the region.
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
    </section>
  );
}
