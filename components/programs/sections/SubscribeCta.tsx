import type { ProgramSubscribeCta } from "@/types";

interface Props {
  data?: ProgramSubscribeCta;
}

export function SubscribeCta({ data }: Props) {
  if (!data?.enabled) return null;

  return (
    <div className="container-institutional pb-20">
      <div className="bg-brand-950 rounded-xl px-8 lg:px-16 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-radial-[circle,rgba(74,163,240,0.35)_0%,transparent_70%] pointer-events-none" />
        <div className="relative z-10">
          {data.title && (
            <h2 className="font-display text-3xl font-bold text-white mb-4">{data.title}</h2>
          )}
          {data.description && (
            <p className="text-white/72 text-base leading-relaxed whitespace-pre-line">
              {data.description}
            </p>
          )}
        </div>
        <div className="relative z-10 flex flex-col gap-3">
          <input
            type="email"
            placeholder={data.emailPlaceholder ?? "your.email@organization.org"}
            className="w-full px-4 py-3 bg-white/12 border border-white/20 rounded-sm text-sm text-white placeholder-white/45 outline-none focus:border-teal-400 transition-colors"
          />
          <button
            type="button"
            className="w-full py-3 bg-white text-brand-900 font-bold text-sm rounded-sm hover:bg-slate-100 transition-colors"
          >
            {data.buttonLabel ?? "Notify Me"}
          </button>
        </div>
      </div>
    </div>
  );
}
