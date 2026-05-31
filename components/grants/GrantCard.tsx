import Link from "next/link";
import { ArrowRight, Clock, Euro } from "lucide-react";
import { GrantStatusBadge, Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate, daysUntil, getCountryFlag } from "@/lib/utils/formatters";
import type { Grant } from "@/types";
import { cn } from "@/lib/utils/cn";

const typeLabels: Record<string, string> = {
  mobility: "Mobility",
  project: "Project Grant",
  "institution-building": "Institution Building",
  research: "Research",
  cultural: "Cultural",
  youth: "Youth",
  "civil-society": "Civil Society",
  environmental: "Environmental",
};

interface GrantCardProps {
  grant: Grant;
  variant?: "default" | "compact";
}

export function GrantCard({ grant, variant = "default" }: GrantCardProps) {
  const days = grant.deadline ? daysUntil(grant.deadline) : null;
  const urgent = days !== null && days <= 14 && days > 0;
  const expired = days !== null && days <= 0;

  return (
    <Link
      href={`/grants/${grant.slug.current}`}
      className={cn(
        "group card-hover block",
        variant === "compact" ? "p-4" : "p-6"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <GrantStatusBadge status={grant.status} />
            <Badge variant="neutral" size="sm">{typeLabels[grant.type] ?? grant.type}</Badge>
            {grant.program && (
              <Badge variant="primary" size="sm">{grant.program.title}</Badge>
            )}
          </div>

          <h3 className="text-card-title group-hover:text-brand-600 transition-colors mb-2 text-balance">
            {grant.title}
          </h3>

          {variant !== "compact" && (
            <p className="text-sm text-slate-500 line-clamp-2 mb-3">
              {grant.shortDescription}
            </p>
          )}

          <div className="flex flex-wrap gap-1">
            {grant.eligibleCountries.slice(0, 6).map((c) => (
              <span key={c} title={c} className="text-base">{getCountryFlag(c)}</span>
            ))}
          </div>
        </div>

        {/* Right — key info */}
        <div className="shrink-0 flex flex-col items-end gap-2 text-right">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Up to</div>
            <div className="text-lg font-bold font-display text-slate-800">
              {formatCurrency(grant.maxGrantAmount, grant.currency)}
            </div>
          </div>

          {grant.deadline && !expired && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              urgent ? "text-amber-600" : "text-slate-500"
            )}>
              <Clock className="w-3.5 h-3.5" />
              {urgent ? `${days}d remaining` : `Deadline: ${formatDate(grant.deadline, "dd MMM")}`}
            </div>
          )}

          <div className="flex items-center gap-1 text-brand-500 text-sm font-medium group-hover:gap-1.5 transition-all mt-1">
            Details <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
