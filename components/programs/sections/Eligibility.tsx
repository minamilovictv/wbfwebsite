import { CheckCircle2 } from "lucide-react";
import { getCountryFlag, getCountryName } from "@/lib/utils/formatters";
import type { CountryCode, ProgramEligibility } from "@/types";

interface Props {
  data?: ProgramEligibility;
  countries?: CountryCode[];
}

export function Eligibility({ data, countries }: Props) {
  if (!data) return null;
  const hasOrgs = (data.organizations?.length ?? 0) > 0;
  const hasPartnership =
    !!data.partnershipNote || (countries?.length ?? 0) > 0 || !!data.partnershipCtaUrl;
  if (!hasOrgs && !hasPartnership) return null;

  return (
    <section className="section-padding bg-white" id="eligibility">
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

        <div className="bg-slate-50 rounded-xl p-8 lg:p-10">
          {hasOrgs && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {data.organizations!.map((org) => (
                <div
                  key={org._key ?? org.title}
                  className="bg-white border border-slate-100 rounded-lg p-5"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5 text-brand-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{org.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{org.description}</p>
                </div>
              ))}
            </div>
          )}

          {hasPartnership && (
            <div className="bg-brand-950 rounded-xl p-8 text-white text-center">
              {data.partnershipNote && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70 mb-6">
                  {data.partnershipNote}
                </p>
              )}
              {countries && countries.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
                  {countries.map((c) => (
                    <div
                      key={c}
                      className="bg-white/8 border border-white/15 rounded-lg py-4 px-2 text-center"
                    >
                      <div className="text-2xl mb-2">{getCountryFlag(c)}</div>
                      <div className="text-[11px] font-semibold text-white/90">
                        {getCountryName(c)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {data.partnershipSubnote && (
                <p className="text-sm text-white/60 max-w-[44ch] mx-auto mb-6 whitespace-pre-line">
                  {data.partnershipSubnote}
                </p>
              )}
              {data.partnershipCtaUrl && data.partnershipCtaLabel && (
                <a
                  href={data.partnershipCtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-teal-400 text-brand-950 font-bold text-sm px-6 py-3 rounded-full hover:bg-white transition-colors"
                >
                  {data.partnershipCtaLabel} →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
