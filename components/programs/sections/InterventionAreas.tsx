import { ArrowRight } from "lucide-react";
import type { ProgramInterventionAreas } from "@/types";
import { iconMap, colorBgMap } from "./iconMap";

interface Props {
  data?: ProgramInterventionAreas;
}

export function InterventionAreas({ data }: Props) {
  if (!data) return null;
  const hasAreas = (data.areas?.length ?? 0) > 0;
  const hasTags = (data.crossCuttingTags?.length ?? 0) > 0;
  const hasRules = (data.activityRules?.length ?? 0) > 0;
  if (!hasAreas && !hasTags && !hasRules) return null;

  return (
    <section className="section-padding bg-slate-50" id="areas">
      <div className="container-institutional">
        {data.overline && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-3">
            {data.overline}
          </p>
        )}
        {data.title && (
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">{data.title}</h2>
        )}
        {data.intro && (
          <p className="text-base text-slate-500 mb-10 max-w-[54ch]">{data.intro}</p>
        )}

        {hasAreas && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {data.areas!.map((area) => {
              const Icon = iconMap[area.icon ?? "globe"];
              const colorClass = colorBgMap[area.color ?? "brand"];
              return (
                <div
                  key={area._key ?? area.title}
                  className="card p-7 hover:-translate-y-0.5 transition-transform"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${colorClass}`}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{area.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{area.description}</p>
                </div>
              );
            })}
          </div>
        )}

        {(hasTags || hasRules) && (
          <div className="card p-7">
            {hasTags && (
              <>
                {data.crossCuttingHeading && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600 mb-4">
                    {data.crossCuttingHeading}
                  </p>
                )}
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {data.crossCuttingTags!.map((tag) => (
                    <span
                      key={tag}
                      className="bg-brand-50 text-brand-900 border border-brand-100/60 text-xs font-medium px-4 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}

            {hasRules && (
              <div className={hasTags ? "border-t border-slate-100 pt-5" : ""}>
                {data.activityRulesHeading && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 mb-3">
                    {data.activityRulesHeading}
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  {data.activityRules!.map((rule, i) => (
                    <div key={i} className="flex gap-2.5 items-start text-sm text-slate-500">
                      <ArrowRight className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                      <span className="whitespace-pre-line">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
