import Link from "next/link";
import { ArrowRight, ChevronRight, Users, Globe2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const quickStats = [
  { value: "6", label: "Member States", icon: Globe2 },
  { value: "€40M+", label: "Grants Awarded", icon: Building2 },
  { value: "2,400+", label: "Projects Funded", icon: Users },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[80vh] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Decorative shape */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden xl:block">
        <svg viewBox="0 0 600 800" fill="none" className="h-full w-full">
          <circle cx="500" cy="200" r="300" fill="url(#heroGrad)" />
          <circle cx="200" cy="600" r="200" fill="url(#heroGrad2)" />
          <defs>
            <radialGradient id="heroGrad">
              <stop stopColor="#00756A" />
              <stop offset="1" stopColor="#003366" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heroGrad2">
              <stop stopColor="#F4A41A" />
              <stop offset="1" stopColor="#F4A41A" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="relative container-institutional py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Overline tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-300 text-xs font-semibold uppercase tracking-wider">
              Open Calls Available
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6 text-balance">
            Connecting the
            <span className="block text-teal-400">Western Balkans</span>
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-xl text-pretty">
            The Western Balkans Fund supports regional cooperation through grants, mobility
            programmes, and partnerships across six economies.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Button href="/grants/open-calls" size="lg" variant="secondary">
              View Open Calls
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button href="/about" size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 hover:text-white">
              About the Fund
            </Button>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-8">
            {quickStats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-white leading-none">
                    {value}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Member states ribbon */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container-institutional py-3 flex items-center gap-6 overflow-x-auto scrollbar-thin">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider shrink-0">
              Member States
            </span>
            {[
              ["🇦🇱", "Albania"],
              ["🇧🇦", "Bosnia & Herz."],
              ["🇽🇰", "Kosovo*"],
              ["🇲🇰", "North Macedonia"],
              ["🇲🇪", "Montenegro"],
              ["🇷🇸", "Serbia"],
            ].map(([flag, name]) => (
              <div key={name} className="flex items-center gap-2 text-sm text-slate-300 shrink-0">
                <span className="text-lg">{flag}</span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
