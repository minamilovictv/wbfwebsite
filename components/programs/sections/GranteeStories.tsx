import { ExternalLink } from "lucide-react";
import type { ProgramFeaturedStories } from "@/types";
import { storyGradientMap } from "./iconMap";

interface Props {
  data?: ProgramFeaturedStories;
}

export function GranteeStories({ data }: Props) {
  if (!data || (data.stories?.length ?? 0) === 0) return null;

  return (
    <section className="section-padding bg-slate-50" id="stories">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {data.stories!.map((story) => {
            const gradient = storyGradientMap[story.gradient ?? "brand"];
            return (
              <div
                key={story._key ?? story.title}
                className="card overflow-hidden hover:-translate-y-0.5 transition-transform"
              >
                <div
                  className={`h-44 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}
                >
                  {story.emoji && <span className="text-5xl">{story.emoji}</span>}
                  {story.area && (
                    <span className="absolute top-3 left-3 bg-white/95 text-brand-900 text-[10px] font-bold uppercase tracking-[0.09em] px-3 py-1.5 rounded-full">
                      {story.area}
                    </span>
                  )}
                  {story.callTag && (
                    <span className="absolute bottom-3 left-3 bg-brand-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      {story.callTag}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{story.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{story.description}</p>
                  <div className="flex items-center justify-between">
                    {story.meta && <span className="text-xs text-slate-400">{story.meta}</span>}
                    {story.link && (
                      <a
                        href={story.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 ml-auto"
                      >
                        Read story <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
