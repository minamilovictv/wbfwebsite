import { ArrowRight, Clock, FileText, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Grant } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils/formatters";
import { GrantStatusBadge } from "@/components/ui/Badge";
import { daysUntil } from "@/lib/utils/formatters";

interface GrantCTAProps {
  grants?: Grant[];
}

function GrantCard({ grant }: { grant: Grant }) {
  if (!grant.slug?.current) return null;

  const days = grant.deadline ? daysUntil(grant.deadline) : null;
  const urgent = days !== null && days <= 14 && days > 0;

  return (
    <Link
      href={`/grants/${grant.slug.current}`}
      className="card-hover p-6 group block"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <GrantStatusBadge status={grant.status} />
        {urgent && (
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
            <Clock className="w-3.5 h-3.5" />
            {days}d left
          </span>
        )}
      </div>

      <h3 className="text-card-title text-slate-900 group-hover:text-brand-600 transition-colors mb-2 text-balance">
        {grant.title}
      </h3>

      <p className="text-sm text-slate-500 line-clamp-2 mb-4">{grant.shortDescription}</p>

      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="text-slate-400">Up to </span>
          <span className="font-semibold text-slate-800">
            {formatCurrency(grant.maxGrantAmount, grant.currency)}
          </span>
        </div>
        {grant.deadline && (
          <span className="text-slate-400 text-xs">
            Deadline: {formatDateShort(grant.deadline)}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-1 text-brand-500 text-sm font-medium group-hover:gap-2 transition-all">
        View details <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

function formatDateShort(d: string) {
  return formatDate(d, "dd MMM yyyy");
}

export function GrantCTA({ grants = [] }: GrantCTAProps) {
  return (
    <section className="section-padding bg-section-alt">
      <div className="container-institutional">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-overline text-teal-600 mb-2">Funding Opportunities</p>
            <div className="divider-teal mb-3" />
            <h2 className="text-section-title text-slate-900">Open Grant Calls</h2>
            <p className="text-slate-600 mt-2 max-w-xl">
              Submit your application before the deadline. Grants are open to
              organisations from all six WBF member states.
            </p>
          </div>
          <Link href="/grants/open-calls" className="shrink-0 btn-outline btn-sm">
            All Open Calls
          </Link>
        </div>

        {/* Grant cards */}
        {grants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {grants.map((grant) => (
              <GrantCard key={grant._id} grant={grant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium text-slate-600">No open calls at this time</p>
            <p className="text-sm mt-1">Subscribe to be notified when new calls open.</p>
          </div>
        )}

        {/* Bottom info row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: FileText,
              title: "How to Apply",
              desc: "Step-by-step application guide",
              href: "/grants/how-to-apply",
            },
            {
              icon: HelpCircle,
              title: "Eligibility",
              desc: "Check if your organization qualifies",
              href: "/grants/eligibility",
            },
            {
              icon: Clock,
              title: "Upcoming Calls",
              desc: "Preview forthcoming grant cycles",
              href: "/grants/database",
            },
          ].map(({ icon: Icon, title, desc, href }) => (
            <Link
              key={title}
              href={href}
              className="flex items-start gap-4 p-5 bg-white rounded-lg border border-slate-100 hover:border-brand-200 hover:shadow-card transition-all group"
            >
              <div className="w-10 h-10 bg-brand-50 rounded-md flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-800 group-hover:text-brand-600 transition-colors">
                  {title}
                </div>
                <div className="text-sm text-slate-500 mt-0.5">{desc}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-400 ml-auto mt-0.5 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
