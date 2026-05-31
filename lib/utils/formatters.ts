import { format, formatDistanceToNow, parseISO, isValid } from "date-fns";
import type { CountryCode } from "@/types";

export function formatDate(dateString: string, pattern = "d MMMM yyyy"): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return dateString;
    return format(date, pattern);
  } catch {
    return dateString;
  }
}

export function formatDateShort(dateString: string): string {
  return formatDate(dateString, "dd MMM yyyy");
}

export function formatDatetime(dateString: string): string {
  return formatDate(dateString, "d MMM yyyy, HH:mm");
}

export function formatRelativeDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return dateString;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return dateString;
  }
}

export function formatCurrency(amount: number, currency: "EUR" | "USD" = "EUR"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    notation: amount >= 1_000_000 ? "compact" : "standard",
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatCompact(n: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(n);
}

export const COUNTRY_NAMES: Record<CountryCode, string> = {
  AL: "Albania",
  BA: "Bosnia and Herzegovina",
  XK: "Kosovo*",
  MK: "North Macedonia",
  ME: "Montenegro",
  RS: "Serbia",
};

export const COUNTRY_FLAGS: Record<CountryCode, string> = {
  AL: "🇦🇱",
  BA: "🇧🇦",
  XK: "🇽🇰",
  MK: "🇲🇰",
  ME: "🇲🇪",
  RS: "🇷🇸",
};

export function getCountryName(code: CountryCode): string {
  return COUNTRY_NAMES[code] ?? code;
}

export function getCountryFlag(code: CountryCode): string {
  return COUNTRY_FLAGS[code] ?? "";
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function daysUntil(dateString: string): number {
  const target = parseISO(dateString);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
