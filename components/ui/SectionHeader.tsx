import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  overline?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  dividerColor?: "teal" | "gold" | "white";
  className?: string;
}

export function SectionHeader({
  overline,
  title,
  description,
  align = "left",
  theme = "light",
  dividerColor = "teal",
  className,
}: SectionHeaderProps) {
  const textPrimary = theme === "dark" ? "text-white" : "text-slate-900";
  const textSecondary = theme === "dark" ? "text-slate-300" : "text-slate-600";
  const overlineColor =
    theme === "dark"
      ? "text-teal-400"
      : dividerColor === "gold"
      ? "text-gold-600"
      : "text-teal-600";

  const divider =
    dividerColor === "white"
      ? "bg-white/60"
      : dividerColor === "gold"
      ? "bg-gold-500"
      : "bg-teal-500";

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {overline && (
        <p className={cn("text-overline mb-3", overlineColor)}>{overline}</p>
      )}
      <div
        className={cn(
          "w-10 h-1 rounded-full mb-4",
          divider,
          align === "center" && "mx-auto"
        )}
      />
      <h2 className={cn("text-section-title text-balance", textPrimary)}>{title}</h2>
      {description && (
        <p className={cn("mt-4 text-body-lead max-w-2xl text-pretty", textSecondary, align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
