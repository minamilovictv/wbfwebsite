import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Download, ExternalLink, Globe2, BookOpen, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "GGI Grants — Grassroots & Civil Society | Western Balkans Fund",
  description:
    "The GGI-WB scheme funds regional cooperation projects led by CSOs, cultural institutions, education bodies, and grassroots organizations across all six Western Balkans Contracting Parties.",
};

const timelineSteps = [
  { date: "Mar 2026", desc: "Call opened", done: true },
  { date: "Mar–Apr 2026", desc: "Info sessions held", done: true },
  { date: "20 Apr 2026", desc: "Deadline — 263 received", done: true },
  { date: "Apr–Jun 2026", desc: "Evaluation underway", done: false, active: true },
  { date: "Jun 2026", desc: "Results announced", done: false },
  { date: "Jun–Jul 2026", desc: "Contract signature", done: false },
];

const areas = [
  {
    icon: Globe2,
    title: "Cultural Cooperation",
    desc: "Supporting cross-border cultural exchange, heritage preservation, and inclusive access to culture across the Western Balkans.",
    color: "bg-brand-900",
  },
  {
    icon: BookOpen,
    title: "Education & Scientific Exchange",
    desc: "Fostering academic collaboration, youth exchanges, and knowledge-sharing between educational institutions across the region.",
    color: "bg-emerald-800",
  },
  {
    icon: Leaf,
    title: "Sustainable Development",
    desc: "Advancing environmental cooperation, green agenda initiatives, and sustainable community development across borders.",
    color: "bg-green-800",
  },
];

const crossCutting = [
  "🌿 Green Agenda",
  "🌐 Regional Outreach",
  "♀ Gender Sensitivity",
  "🕊 Conflict Sensitivity",
  "📚 Knowledge Sharing",
  "🤝 Marginalised Groups",
  "✍ Freedom of Expression",
  "🇪🇺 EU Integration",
  "🕊 Reconciliation",
  "💡 Innovation & Digitalization",
];

const eligibleOrgs = [
  {
    title: "Civil Society Organizations / NGOs",
    desc: "Registered CSOs and non-governmental organizations working in the WB6 region.",
  },
  {
    title: "Local & Regional Public Entities",
    desc: "Public bodies, municipalities, regional authorities or their associations.",
  },
  {
    title: "Business Associations",
    desc: "Enterprise associations, chambers of commerce, tourism and agriculture bodies.",
  },
  {
    title: "Educational Institutions",
    desc: "Universities, schools, institutes, libraries, research centres, and academies.",
  },
  {
    title: "Media Associations",
    desc: "Organizations working in media, journalism, and freedom of expression.",
  },
  {
    title: "Cultural & Sports Institutions",
    desc: "Museums, galleries, theatres, sport associations, and cultural centers.",
  },
];

const activityRules = [
  "All activities must ensure non-discriminatory participation.",
  "Activities must take place in WB6 (exceptions need strong justification).",
  "Sub-granting to third parties is not allowed.",
  "Regional events, awareness campaigns, networking, and advocacy are encouraged.",
];

const stories = [
  {
    emoji: "🏛️",
    area: "Cultural Cooperation",
    call: "GGI Grants · Call 7",
    title: "Museums Open to All",
    desc: "Led by the Association of the Deaf and Hard of Hearing of Montenegro, nine museums across Montenegro, Serbia, and Albania have been adapted with sign language training, audio guides, and inclusive tools for visitors with sensory impairments.",
    meta: "Montenegro, Serbia, Albania · 3 Countries · 9 Museums",
    gradient: "from-brand-900 to-brand-700",
    link: "https://sogincg.me/projekti/muzeji-otvoreni-za-sve/",
  },
  {
    emoji: "🔭",
    area: "Education & Scientific Exchange",
    call: "GGI Grants · Call 7",
    title: "From Earth to the Stars",
    desc: "The Astronomy Club of Kosovo brought together youth from all six countries in Kukaj village near Prishtina — connecting 400+ applicants through STEM, stargazing, and cultural exchange.",
    meta: "All 6 Countries · 400+ applicants · Kosovo led",
    gradient: "from-slate-900 to-brand-900",
    link: "https://www.instagram.com/astroclubkosova/",
  },
];

const news = [
  {
    date: "June 2026",
    title: "Evaluation of Call No. 8 is underway — results expected June 2026",
    desc: "The independent evaluation committee has begun reviewing 263 applications received by the April deadline.",
  },
  {
    date: "April 2026",
    title: "263 Applications Received for Call No. 8",
    desc: "The Western Balkans Fund received 263 applications for the 8th Call — a record for the GGI-WB scheme.",
  },
  {
    date: "March 2026",
    title: "Info Sessions Completed Across All 6 Contracting Parties",
    desc: "WBF coordinators held information sessions in all six WB6 capitals to support applicants preparing their proposals.",
  },
  {
    date: "February 2026",
    title: "Call No. 8 for Proposals Now Open",
    desc: "The 8th GGI-WB Call for Proposals officially launched with updated guidelines and an expanded list of eligible organizations.",
  },
];

const documents = [
  { title: "Application Guidelines — 8th Call", sub: "Full guidelines for applicants" },
  { title: "FAQ — 8th Call for Proposals", sub: "Frequently asked questions" },
  { title: "EU-WBF Joint Action Report", sub: "Latest program impact report" },
];

export default function GGIPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <div className="bg-brand-950 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 60px,white 60px,white 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,white 60px,white 61px)",
          }}
        />
        <div className="absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full bg-radial-[circle,rgba(74,163,240,0.55)_0%,transparent_70%] pointer-events-none" />

        <div className="container-institutional py-16 lg:py-20 relative z-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
              Call No. 8 · Now Under Review
            </span>
          </div>

          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 max-w-[18ch]">
            Grassroots & Civil Society Grants
          </h1>
          <p className="text-lg text-white/80 max-w-[58ch] leading-relaxed mb-3">
            Empowering civil society to build regional cooperation from the ground up across the
            Western Balkans.
          </p>
          <p className="text-sm text-white/50 mb-10">
            Co-Funded by the European Union · IPA III Instrument for Pre-Accession Assistance · WB6
            Region
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            <a
              href="https://wbfportal.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-brand-900 font-semibold text-sm rounded-sm hover:bg-slate-100 transition-colors"
            >
              Apply via OGMS <ExternalLink className="w-4 h-4" />
            </a>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 text-white/75 border border-white/20 rounded-sm hover:border-white/45 hover:text-white transition-colors text-sm font-semibold">
              Get Notified for Call 9
            </button>
          </div>

          {/* Meta facts */}
          <div className="flex flex-wrap gap-x-12 gap-y-4 border-t border-white/16 pt-7">
            {[
              { k: "Status", v: "Under Review" },
              { k: "Applications", v: "263 Received" },
              { k: "Max Grant", v: "€15,000" },
              { k: "Co-financing", v: "Min. 20%" },
              { k: "Duration", v: "3–6 months" },
              { k: "Min. Partners", v: "3 Countries" },
            ].map(({ k, v }) => (
              <div key={k}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50 mb-1.5">
                  {k}
                </div>
                <div className="text-base font-semibold text-white">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CALL INFO CARDS ── */}
      <div className="container-institutional py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Key facts */}
          <div className="card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-5">
              Call No. 8 — Key Facts
            </p>
            {[
              { label: "Status", value: "Under Review" },
              { label: "Applications received", value: "263" },
              { label: "Maximum grant", value: "€15,000" },
              { label: "Co-financing required", value: "Min. 20%" },
              { label: "Project duration", value: "3–6 months" },
              { label: "Minimum partners", value: "3 Contracting Parties" },
              { label: "Results expected", value: "June 2026" },
            ].map(({ label, value }, i, arr) => (
              <div
                key={label}
                className={`flex justify-between items-center py-2.5 text-sm ${i < arr.length - 1 ? "border-b border-slate-100" : ""}`}
              >
                <span className="text-slate-500">{label}</span>
                <span className="font-semibold text-slate-800">{value}</span>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-5">
              Call No. 8 — Timeline
            </p>
            <div className="flex flex-col">
              {timelineSteps.map(({ date, desc, done, active }, i) => (
                <div key={date} className="flex gap-4 items-start py-2.5">
                  <div className="flex flex-col items-center shrink-0 w-5">
                    <div
                      className={`w-3 h-3 rounded-full border-2 shrink-0 ${
                        done
                          ? "border-brand-600 bg-brand-600"
                          : active
                          ? "border-slate-300 bg-white"
                          : "border-slate-200 bg-white"
                      }`}
                    />
                    {i < timelineSteps.length - 1 && (
                      <div
                        className={`w-0.5 flex-1 min-h-[18px] mt-1 ${done ? "bg-brand-400" : "bg-slate-200"}`}
                      />
                    )}
                  </div>
                  <div className="pb-2">
                    <div
                      className={`text-xs font-semibold mb-0.5 ${active ? "text-amber-500" : "text-brand-600"}`}
                    >
                      {date} {active && "●"}
                    </div>
                    <div
                      className={`text-sm ${active ? "text-slate-900 font-medium" : done ? "text-slate-500" : "text-slate-400"}`}
                    >
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notify for Call 9 */}
          <div className="card p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-4">
              Get Notified — Call No. 9
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Stay ahead of Call No. 9
            </h3>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">
              Round 9 is expected in early 2027. Register now and we'll contact you as soon as the
              call opens.
            </p>
            <div className="flex flex-col gap-2.5">
              <input
                type="text"
                placeholder="Title of organization"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-sm bg-white outline-none focus:border-brand-400 transition-colors"
              />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-sm bg-white outline-none focus:border-brand-400 transition-colors"
              />
              <button className="w-full py-2.5 bg-brand-900 text-white text-sm font-semibold rounded-sm hover:bg-brand-700 transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── ABOUT THE PROGRAM ── */}
      <section className="section-padding bg-white" id="program">
        <div className="container-institutional">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-3">
                01 / About the Program
              </p>
              <h2 className="font-display text-3xl font-bold text-slate-900 leading-tight mb-5">
                Building{" "}
                <span className="text-brand-600">regional cooperation</span> from the ground up
              </h2>
              <p className="text-base text-slate-500 leading-relaxed mb-4">
                The Western Balkans Fund supports regional cooperation, reconciliation, and EU
                integration by funding civil society and grassroots initiatives across the WB6
                region.
              </p>
              <p className="text-base text-slate-500 leading-relaxed mb-4">
                The GGI-WB scheme strengthens regional cooperation, people-to-people links,
                democratic governance, sustainable development, and reconciliation processes —
                recognizing that lasting cooperation must be rooted in local ownership.
              </p>
              <p className="text-base text-slate-500 leading-relaxed mb-8">
                This program is part of a{" "}
                <strong className="text-slate-800 font-semibold">
                  continuous annual funding cycle
                </strong>
                . Call No. 8 is now active; Call No. 9 is anticipated in 2027.
              </p>

              {/* Outcomes */}
              <div className="bg-brand-950 rounded-lg p-7 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-400 mb-5">
                  Expected Outcomes
                </p>
                {[
                  "Increased participation of grassroots and marginalized organizations across the region.",
                  "Strengthened local ownership of regional cooperation processes.",
                  "Enhanced engagement of youth, women, and minority groups in cross-border initiatives.",
                ].map((outcome, i) => (
                  <div key={i} className="flex gap-3.5 items-start mb-4 last:mb-0">
                    <div className="w-7 h-7 rounded-lg bg-teal-400/20 text-teal-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(105 + i)}
                    </div>
                    <p className="text-sm text-white/82 leading-relaxed">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 lg:pt-16">
              {/* Annual cycle badge */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-xl">🔄</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Annual Funding Cycle</div>
                    <div className="text-xs text-slate-400">Continuous program, Call 8 active</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>📅 Call No. 8 active</span>
                  <span>⏳ Call No. 9 — 2027</span>
                </div>
              </div>

              {/* Countries */}
              <div className="card p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-600 mb-4">
                  WB6 Region Coverage
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    ["🇦🇱", "Albania"],
                    ["🇧🇦", "Bosnia & Herz."],
                    ["🇽🇰", "Kosovo*"],
                    ["🇲🇰", "North Macedonia"],
                    ["🇲🇪", "Montenegro"],
                    ["🇷🇸", "Serbia"],
                  ].map(([flag, name]) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 bg-brand-50 rounded-sm px-3 py-2.5 text-sm font-medium text-brand-900"
                    >
                      {flag} {name}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                  * This designation is without prejudice to positions on status and is in line with
                  UNSCR 1244/1999 and the ICJ Opinion on the Kosovo declaration of independence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AREAS OF INTERVENTION ── */}
      <section className="section-padding bg-slate-50" id="areas">
        <div className="container-institutional">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-3">
            02 / Areas of Intervention
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">
            Three intervention areas
          </h2>
          <p className="text-base text-slate-500 mb-10 max-w-[54ch]">
            All projects must address at least 3 cross-cutting issues and stay within these thematic
            pillars.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {areas.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="card p-7 hover:-translate-y-0.5 transition-transform"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${color}`}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Cross-cutting */}
          <div className="card p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600 mb-4">
              Cross-Cutting Issues — at least 3 mandatory
            </p>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {crossCutting.map((tag) => (
                <span
                  key={tag}
                  className="bg-brand-50 text-brand-900 border border-brand-100/60 text-xs font-medium px-4 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 mb-3">
                Key Activity Rules
              </p>
              <div className="flex flex-col gap-2">
                {activityRules.map((rule) => (
                  <div key={rule} className="flex gap-2.5 items-start text-sm text-slate-500">
                    <ArrowRight className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                    {rule}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY ── */}
      <section className="section-padding bg-white" id="eligibility">
        <div className="container-institutional">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-3">
            03 / Eligibility
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">Who can apply?</h2>
          <p className="text-base text-slate-500 mb-10 max-w-[54ch]">
            A wide range of organizations from across civil society are eligible to apply and lead
            GGI projects.
          </p>

          <div className="bg-slate-50 rounded-xl p-8 lg:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {eligibleOrgs.map(({ title, desc }) => (
                <div
                  key={title}
                  className="bg-white border border-slate-100 rounded-lg p-5"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5 text-brand-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Partnership requirement */}
            <div className="bg-brand-950 rounded-xl p-8 text-white text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70 mb-6">
                Your partnership must include partners from at least 3 of these 6 contracting parties
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
                {[
                  ["🇦🇱", "Albania"],
                  ["🇧🇦", "Bosnia & Herz."],
                  ["🇽🇰", "Kosovo*"],
                  ["🇲🇰", "N. Macedonia"],
                  ["🇲🇪", "Montenegro"],
                  ["🇷🇸", "Serbia"],
                ].map(([flag, name]) => (
                  <div
                    key={name}
                    className="bg-white/8 border border-white/15 rounded-lg py-4 px-2 text-center"
                  >
                    <div className="text-2xl mb-2">{flag}</div>
                    <div className="text-[11px] font-semibold text-white/90">{name}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/60 max-w-[44ch] mx-auto mb-6">
                Partnerships spanning all six Contracting Parties are especially encouraged and may
                be prioritized in evaluation.
              </p>
              <a
                href="https://wbfpartnership.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-teal-400 text-brand-950 font-bold text-sm px-6 py-3 rounded-full hover:bg-white transition-colors"
              >
                Use WBF Partnership Platform →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRANTEE STORIES ── */}
      <section className="section-padding bg-slate-50" id="stories">
        <div className="container-institutional">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-3">
            04 / Grantee Highlights
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">
            Built on a track record of regional change
          </h2>
          <p className="text-base text-slate-500 mb-10 max-w-[54ch]">
            Featured stories from previous calls. Partnerships across borders, anchored in local
            communities.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {stories.map(({ emoji, area, call, title, desc, meta, gradient, link }) => (
              <div
                key={title}
                className="card overflow-hidden hover:-translate-y-0.5 transition-transform"
              >
                <div
                  className={`h-44 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}
                >
                  <span className="text-5xl">{emoji}</span>
                  <span className="absolute top-3 left-3 bg-white/95 text-brand-900 text-[10px] font-bold uppercase tracking-[0.09em] px-3 py-1.5 rounded-full">
                    {area}
                  </span>
                  <span className="absolute bottom-3 left-3 bg-brand-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    {call}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{meta}</span>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                    >
                      Read story <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS & UPDATES ── */}
      <section className="section-padding bg-white" id="news">
        <div className="container-institutional">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-3">
            05 / News & Updates
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">
            Latest from the WB6 region
          </h2>
          <p className="text-base text-slate-500 mb-10">
            Project updates, stories, and announcements. Updated regularly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {news.map(({ date, title, desc }) => (
              <div
                key={title}
                className="card p-6 hover:-translate-y-0.5 transition-transform cursor-pointer"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-teal-500 mb-2">
                  {date}
                </p>
                <h3 className="text-base font-semibold text-slate-900 mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-600 mb-5">
              Document Depository
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {documents.map(({ title, sub }) => (
                <div
                  key={title}
                  className="card p-5 flex items-center gap-4 hover:-translate-y-0.5 transition-transform cursor-pointer group"
                >
                  <div className="w-11 h-11 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                    <Download className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 group-hover:text-brand-700 transition-colors leading-snug">
                      {title}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SUBSCRIBE ── */}
      <div className="container-institutional pb-20">
        <div className="bg-brand-950 rounded-xl px-8 lg:px-16 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-radial-[circle,rgba(74,163,240,0.35)_0%,transparent_70%] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold text-white mb-4">Stay Informed</h2>
            <p className="text-white/72 text-base leading-relaxed">
              Don't miss our next call for proposals. Subscribe for early access announcements,
              deadline reminders, and program updates. Call No. 9 is anticipated for 2027.
            </p>
          </div>
          <div className="relative z-10 flex flex-col gap-3">
            <input
              type="email"
              placeholder="your.email@organization.org"
              className="w-full px-4 py-3 bg-white/12 border border-white/20 rounded-sm text-sm text-white placeholder-white/45 outline-none focus:border-teal-400 transition-colors"
            />
            <button className="w-full py-3 bg-white text-brand-900 font-bold text-sm rounded-sm hover:bg-slate-100 transition-colors">
              Notify Me for Call No. 9
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
