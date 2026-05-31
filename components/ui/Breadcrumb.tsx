import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { BreadcrumbItem } from "@/types";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "default" | "light";
}

export function Breadcrumb({ items, className, variant = "default" }: BreadcrumbProps) {
  const textColor = variant === "light" ? "text-white/70" : "text-slate-500";
  const activeColor = variant === "light" ? "text-white" : "text-slate-800";
  const hoverColor = variant === "light" ? "hover:text-white" : "hover:text-brand-600";
  const separatorColor = variant === "light" ? "text-white/40" : "text-slate-300";

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        <li>
          <Link
            href="/"
            aria-label="Home"
            className={cn(textColor, hoverColor, "transition-colors flex items-center")}
          >
            <Home className="w-3.5 h-3.5" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <ChevronRight className={cn("w-3.5 h-3.5 shrink-0", separatorColor)} />
            {item.href ? (
              <Link
                href={item.href}
                className={cn(textColor, hoverColor, "transition-colors")}
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn(activeColor, "font-medium")} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
