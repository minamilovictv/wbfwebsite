import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ProgramHero as ProgramHeroData } from "@/types";
import { statusDotMap } from "./iconMap";

interface Props {
  title: string;
  hero?: ProgramHeroData;
}

export function ProgramHero({ title, hero }: Props) {
  const pillColor = hero?.statusPill?.dotColor
    ? statusDotMap[hero.statusPill.dotColor]
    : statusDotMap.amber;
  const [pillBg, pillText] = pillColor.split(" ");

  return (
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
        {hero?.statusPill?.text && (
          <div className="inline-flex items-center gap-2 mb-6">
            <span className={cn("w-2 h-2 rounded-full", pillBg)} />
            <span className={cn("text-xs font-semibold uppercase tracking-[0.18em]", pillText)}>
              {hero.statusPill.text}
            </span>
          </div>
        )}

        <h1 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 max-w-[18ch]">
          {title}
        </h1>
        {hero?.tagline && (
          <p className="text-lg text-white/80 max-w-[58ch] leading-relaxed mb-3 whitespace-pre-line">
            {hero.tagline}
          </p>
        )}
        {hero?.footnote && (
          <p className="text-sm text-white/50 mb-10">{hero.footnote}</p>
        )}

        {hero?.ctas && hero.ctas.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-14">
            {hero.ctas.map((cta) => {
              const isPrimary = (cta.variant ?? "primary") === "primary";
              return (
                <a
                  key={cta._key ?? cta.label}
                  href={cta.url}
                  {...(cta.external ?? true
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-sm transition-colors",
                    isPrimary
                      ? "bg-white text-brand-900 hover:bg-slate-100"
                      : "text-white/75 border border-white/20 hover:border-white/45 hover:text-white",
                  )}
                >
                  {cta.label}
                  {(cta.external ?? true) && isPrimary && <ExternalLink className="w-4 h-4" />}
                </a>
              );
            })}
          </div>
        )}

        {hero?.metaFacts && hero.metaFacts.length > 0 && (
          <div className="flex flex-wrap gap-x-12 gap-y-4 border-t border-white/16 pt-7">
            {hero.metaFacts.map((fact) => (
              <div key={fact._key ?? fact.key}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50 mb-1.5">
                  {fact.key}
                </div>
                <div className="text-base font-semibold text-white">{fact.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
