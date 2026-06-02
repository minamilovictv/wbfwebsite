import type { CountryCode } from "@/types";

type PortableTextSpan = { _type?: string; text?: string };
type PortableTextBlock = { _type?: string; children?: PortableTextSpan[]; style?: string };

export function toPlainText(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value
      .map((block: PortableTextBlock) => {
        if (!block || typeof block !== "object") return "";
        if (!Array.isArray(block.children)) return "";
        return block.children.map((c) => c?.text ?? "").join("");
      })
      .filter(Boolean)
      .join("\n\n");
  }
  return "";
}

export function formatDate(dateString: string, pattern?: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    if (pattern === "dd MMM yyyy" || pattern === "d MMM yyyy") {
      return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    }
    if (pattern === "MMM") {
      return date.toLocaleDateString("en-GB", { month: "short" });
    }
    if (pattern === "d") {
      return String(date.getDate());
    }
    if (pattern === "d MMM yyyy, HH:mm") {
      return (
        date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) +
        ", " +
        date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
      );
    }
    // default: "d MMMM yyyy"
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
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
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days} days ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  } catch {
    return dateString;
  }
}

export function formatCurrency(amount: number, currency: "EUR" | "USD" = "EUR"): string {
  if (amount >= 1_000_000) {
    return `${currency === "EUR" ? "€" : "$"}${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `${currency === "EUR" ? "€" : "$"}${(amount / 1_000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
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

// Legacy long-form country codes used by some Sanity documents.
const COUNTRY_ALIASES: Record<string, CountryCode> = {
  albania: "AL",
  bih: "BA",
  "bosnia-and-herzegovina": "BA",
  "bosnia-herzegovina": "BA",
  kosovo: "XK",
  "north-macedonia": "MK",
  macedonia: "MK",
  montenegro: "ME",
  serbia: "RS",
};

export function normalizeCountryCode(value: string | undefined | null): CountryCode | null {
  if (!value) return null;
  if (value in COUNTRY_NAMES) return value as CountryCode;
  const mapped = COUNTRY_ALIASES[value.toLowerCase()];
  return mapped ?? null;
}

export function getCountryName(code: string): string {
  const iso = normalizeCountryCode(code);
  return iso ? COUNTRY_NAMES[iso] : code;
}

export function getCountryFlag(code: string): string {
  const iso = normalizeCountryCode(code);
  return iso ? COUNTRY_FLAGS[iso] : "";
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
  const target = new Date(dateString);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
