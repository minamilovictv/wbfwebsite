import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Grantee Stories",
  description: "In-depth stories from Western Balkans Fund grantees — projects that are changing the region.",
};

const stories = [
  {
    emoji: "🏛️",
    area: "Cultural Cooperation",
    call: "GGI Grants · Call 7",
    title: "Museums Open to All",
    desc: "Led by the Association of the Deaf and Hard of Hearing of Montenegro, nine museums across Montenegro, Serbia, and Albania have been adapted with sign language training, audio guides, and inclusive tools for visitors with sensory impairments.",
    meta: "Montenegro, Serbia, Albania · 3 Countries · 9 Museums",
    gradient: "from-brand-900 to-brand-700",
  },
  {
    emoji: "🔭",
    area: "Education & Scientific Exchange",
    call: "GGI Grants · Call 7",
    title: "From Earth to the Stars",
    desc: "The Astronomy Club of Kosovo brought together youth from all six countries in Kukaj village near Prishtina — connecting 400+ applicants through STEM, stargazing, and cultural exchange.",
    meta: "All 6 Countries · 400+ applicants · Kosovo led",
    gradient: "from-slate-900 to-brand-900",
  },
  {
    emoji: "🌱",
    area: "Sustainable Development",
    call: "GGI Grants · Call 6",
    title: "Green Corridors",
    desc: "Cross-border environmental cooperation connecting communities across four Western Balkans countries through green infrastructure, biodiversity monitoring, and local green champions.",
    meta: "4 Countries · GGI Grants",
    gradient: "from-green-900 to-emerald-800",
  },
];

export default function StoriesPage() {
  return (
    <>
      <PageHero
        overline="Our Impact"
        title="Grantee Stories"
        description="Partnerships across borders, anchored in local communities. Stories of regional change from previous calls."
        variant="compact"
        breadcrumbs={[
          { label: "Our Impact", href: "/impact" },
          { label: "Stories" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {stories.map(({ emoji, area, call, title, desc, meta, gradient }) => (
              <div key={title} className="card overflow-hidden hover:-translate-y-0.5 transition-transform">
                <div className={`h-44 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
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
                  <span className="text-xs text-slate-400">{meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
