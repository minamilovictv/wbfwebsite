import { cn } from "@/lib/utils/cn";
import type { GrantStatus, Status } from "@/types";

type BadgeVariant =
  | "primary"
  | "teal"
  | "gold"
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  primary: "bg-brand-50 text-brand-700 border border-brand-200",
  teal: "bg-teal-50 text-teal-700 border border-teal-200",
  gold: "bg-gold-50 text-gold-700 border border-gold-200",
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  danger: "bg-red-50 text-red-700 border border-red-200",
  outline: "border border-slate-300 text-slate-600",
};

export function Badge({ children, variant = "neutral", size = "md", dot, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-2xs" : "px-2.5 py-0.5 text-xs",
        variants[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            variant === "success" && "bg-emerald-500",
            variant === "warning" && "bg-amber-500",
            variant === "danger" && "bg-red-500",
            variant === "teal" && "bg-teal-500",
            variant === "primary" && "bg-brand-500",
            variant === "gold" && "bg-gold-500",
            (variant === "neutral" || variant === "outline") && "bg-slate-400"
          )}
        />
      )}
      {children}
    </span>
  );
}

/** Semantic status badge for grants */
export function GrantStatusBadge({ status }: { status: GrantStatus }) {
  const config: Record<GrantStatus, { label: string; variant: BadgeVariant }> = {
    open: { label: "Open", variant: "success" },
    upcoming: { label: "Upcoming", variant: "gold" },
    evaluation: { label: "Under Evaluation", variant: "warning" },
    closed: { label: "Closed", variant: "neutral" },
    awarded: { label: "Awarded", variant: "primary" },
  };
  const { label, variant } = config[status] ?? { label: status, variant: "neutral" };
  return <Badge variant={variant} dot>{label}</Badge>;
}

/** Semantic status badge for programs/projects */
export function StatusBadge({ status }: { status: Status }) {
  const config: Record<Status, { label: string; variant: BadgeVariant }> = {
    active: { label: "Active", variant: "success" },
    upcoming: { label: "Upcoming", variant: "gold" },
    closed: { label: "Closed", variant: "neutral" },
    archived: { label: "Archived", variant: "neutral" },
  };
  const { label, variant } = config[status] ?? { label: status, variant: "neutral" };
  return <Badge variant={variant} dot>{label}</Badge>;
}
