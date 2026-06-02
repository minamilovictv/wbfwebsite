import { cn } from "@/lib/utils/cn";
import type {
  ProgramKeyFacts,
  ProgramTimeline,
  ProgramNotifySignup,
} from "@/types";

interface Props {
  keyFacts?: ProgramKeyFacts;
  timeline?: ProgramTimeline;
  notifySignup?: ProgramNotifySignup;
}

export function CallInfoCards({ keyFacts, timeline, notifySignup }: Props) {
  const hasKeyFacts = (keyFacts?.items?.length ?? 0) > 0;
  const hasTimeline = (timeline?.steps?.length ?? 0) > 0;
  const hasNotify = notifySignup?.enabled === true;

  if (!hasKeyFacts && !hasTimeline && !hasNotify) return null;

  const count = [hasKeyFacts, hasTimeline, hasNotify].filter(Boolean).length;
  const cols =
    count === 1 ? "lg:grid-cols-1" : count === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <div className="container-institutional py-12">
      <div className={cn("grid grid-cols-1 gap-5", cols)}>
        {hasKeyFacts && <KeyFactsCard data={keyFacts!} />}
        {hasTimeline && <TimelineCard data={timeline!} />}
        {hasNotify && <NotifyCard data={notifySignup!} />}
      </div>
    </div>
  );
}

function KeyFactsCard({ data }: { data: ProgramKeyFacts }) {
  const items = data.items ?? [];
  return (
    <div className="card p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-5">
        {data.heading ?? "Key Facts"}
      </p>
      {items.map((item, i) => (
        <div
          key={item._key ?? item.label}
          className={cn(
            "flex justify-between items-center py-2.5 text-sm",
            i < items.length - 1 && "border-b border-slate-100",
          )}
        >
          <span className="text-slate-500">{item.label}</span>
          <span className="font-semibold text-slate-800">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function TimelineCard({ data }: { data: ProgramTimeline }) {
  const steps = data.steps ?? [];
  return (
    <div className="card p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-5">
        {data.heading ?? "Timeline"}
      </p>
      <div className="flex flex-col">
        {steps.map((step, i) => {
          const done = step.status === "done";
          const active = step.status === "active";
          return (
            <div key={step._key ?? `${step.date}-${i}`} className="flex gap-4 items-start py-2.5">
              <div className="flex flex-col items-center shrink-0 w-5">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full border-2 shrink-0",
                    done
                      ? "border-brand-600 bg-brand-600"
                      : active
                        ? "border-slate-300 bg-white"
                        : "border-slate-200 bg-white",
                  )}
                />
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-0.5 flex-1 min-h-[18px] mt-1",
                      done ? "bg-brand-400" : "bg-slate-200",
                    )}
                  />
                )}
              </div>
              <div className="pb-2">
                <div
                  className={cn(
                    "text-xs font-semibold mb-0.5",
                    active ? "text-amber-500" : "text-brand-600",
                  )}
                >
                  {step.date} {active && "●"}
                </div>
                <div
                  className={cn(
                    "text-sm",
                    active
                      ? "text-slate-900 font-medium"
                      : done
                        ? "text-slate-500"
                        : "text-slate-400",
                  )}
                >
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NotifyCard({ data }: { data: ProgramNotifySignup }) {
  return (
    <div className="card p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
      {data.overline && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 mb-4">
          {data.overline}
        </p>
      )}
      {data.title && (
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{data.title}</h3>
      )}
      {data.description && (
        <p className="text-sm text-slate-500 mb-5 leading-relaxed">{data.description}</p>
      )}
      <div className="flex flex-col gap-2.5">
        <input
          type="text"
          placeholder={data.organizationPlaceholder ?? "Title of organization"}
          className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-sm bg-white outline-none focus:border-brand-400 transition-colors"
        />
        <input
          type="email"
          placeholder={data.emailPlaceholder ?? "Your email address"}
          className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-sm bg-white outline-none focus:border-brand-400 transition-colors"
        />
        <button
          type="button"
          className="w-full py-2.5 bg-brand-900 text-white text-sm font-semibold rounded-sm hover:bg-brand-700 transition-colors"
        >
          {data.buttonLabel ?? "Notify Me"}
        </button>
      </div>
    </div>
  );
}
