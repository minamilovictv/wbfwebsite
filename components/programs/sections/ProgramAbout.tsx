import { Fragment } from "react";
import { getCountryFlag, getCountryName } from "@/lib/utils/formatters";
import type { CountryCode, ProgramAbout as ProgramAboutData } from "@/types";

interface Props {
  about?: ProgramAboutData;
  countries?: CountryCode[];
}

/**
 * Splits a title containing `{{highlight}}` markers into <span>-styled parts.
 * Example: "Building {{regional cooperation}} from the ground up"
 */
function renderTitle(raw?: string) {
  if (!raw) return null;
  const parts = raw.split(/(\{\{[^}]+\}\})/g);
  return parts.map((part, i) => {
    const match = part.match(/^\{\{(.+)\}\}$/);
    if (match) {
      return (
        <span key={i} className="text-brand-600">
          {match[1]}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function ProgramAbout({ about, countries }: Props) {
  if (!about) return null;

  const hasOutcomes = (about.outcomes?.length ?? 0) > 0;
  const showAnnualCycle = about.annualCycle?.enabled === true;
  const showCoverage = about.showWb6Coverage !== false && (countries?.length ?? 0) > 0;
  const hasKosovo = (countries ?? []).includes("XK");

  return (
    <section className="section-padding bg-white" id="program">
      <div className="container-institutional">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            {about.overline && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-3">
                {about.overline}
              </p>
            )}
            {about.title && (
              <h2 className="font-display text-3xl font-bold text-slate-900 leading-tight mb-5">
                {renderTitle(about.title)}
              </h2>
            )}
            {about.paragraphs?.map((p, i) => (
              <p key={i} className="text-base text-slate-500 leading-relaxed mb-4 last:mb-8 whitespace-pre-line">
                {p}
              </p>
            ))}

            {hasOutcomes && (
              <div className="bg-brand-950 rounded-lg p-7 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-400 mb-5">
                  {about.outcomesHeading ?? "Expected Outcomes"}
                </p>
                {about.outcomes!.map((outcome, i) => (
                  <div key={i} className="flex gap-3.5 items-start mb-4 last:mb-0">
                    <div className="w-7 h-7 rounded-lg bg-teal-400/20 text-teal-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(105 + i)}
                    </div>
                    <p className="text-sm text-white/82 leading-relaxed whitespace-pre-line">{outcome}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {(showAnnualCycle || showCoverage) && (
            <div className="space-y-4 lg:pt-16">
              {showAnnualCycle && (
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-xl">🔄</span>
                    </div>
                    <div>
                      {about.annualCycle?.label && (
                        <div className="text-sm font-semibold text-slate-800">
                          {about.annualCycle.label}
                        </div>
                      )}
                      {about.annualCycle?.sublabel && (
                        <div className="text-xs text-slate-400">{about.annualCycle.sublabel}</div>
                      )}
                    </div>
                  </div>
                  {(about.annualCycle?.leftText || about.annualCycle?.rightText) && (
                    <div className="flex justify-between text-sm text-slate-500">
                      {about.annualCycle?.leftText && <span>{about.annualCycle.leftText}</span>}
                      {about.annualCycle?.rightText && <span>{about.annualCycle.rightText}</span>}
                    </div>
                  )}
                </div>
              )}

              {showCoverage && countries && (
                <div className="card p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-600 mb-4">
                    Eligible Countries
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {countries.map((c) => (
                      <div
                        key={c}
                        className="flex items-center gap-2 bg-brand-50 rounded-sm px-3 py-2.5 text-sm font-medium text-brand-900"
                      >
                        <span>{getCountryFlag(c)}</span>
                        <span>{getCountryName(c)}</span>
                      </div>
                    ))}
                  </div>
                  {hasKosovo && (
                    <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                      * This designation is without prejudice to positions on status and is in line
                      with UNSCR 1244/1999 and the ICJ Opinion on the Kosovo declaration of
                      independence.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
