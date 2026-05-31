import Link from "next/link";
import { ArrowRight } from "lucide-react";

const pillars = [
  {
    num: "01",
    title: "Regional Cooperation",
    desc: "Every project must cross at least three Contracting Parties, building genuine ties rather than bilateral arrangements.",
  },
  {
    num: "02",
    title: "Civil Society Empowerment",
    desc: "From grassroots organizations to universities, WBF funds the actors closest to communities who anchor change where it matters.",
  },
  {
    num: "03",
    title: "EU Integration Pathway",
    desc: "Every program supports the Western Balkans' path toward European integration through democratic governance and people-to-people links.",
  },
  {
    num: "04",
    title: "Reconciliation & Dialogue",
    desc: "WBF supports projects that address shared history and build common futures across the region.",
  },
];

export function AboutSection() {
  return (
    <section className="section-padding bg-white" id="about">
      <div className="container-institutional">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <p className="text-overline text-brand-600 mb-3">About the Western Balkans Fund</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-6">
              An intergovernmental fund built on regional ownership
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              The Western Balkans Fund is an intergovernmental organization established by all six
              Western Balkans governments to support regional cooperation from within — not imposed
              from outside.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              Co-funded by the European Union through IPA III and supported by Switzerland, Japan,
              Germany, and the Visegrad Fund, WBF channels grants directly to civil society,
              institutions, and communities working across borders.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-900 text-white font-semibold text-sm rounded-sm hover:bg-brand-700 transition-colors"
            >
              Learn About WBF <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — pillars */}
          <div className="flex flex-col gap-1">
            {pillars.map(({ num, title, desc }) => (
              <div
                key={num}
                className="flex gap-5 items-start px-5 py-5 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <div className="font-display text-2xl font-bold text-slate-200 leading-none shrink-0 w-9 text-right pt-0.5">
                  {num}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">{title}</div>
                  <div className="text-sm text-slate-500 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
