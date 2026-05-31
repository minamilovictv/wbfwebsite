import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Breadcrumb } from "./Breadcrumb";
import type { BreadcrumbItem, SanityImage } from "@/types";
import { getImageUrl } from "@/lib/sanity/client";

interface PageHeroProps {
  overline?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  coverImage?: SanityImage | null;
  children?: React.ReactNode;
  variant?: "default" | "compact" | "tall";
  theme?: "dark" | "brand" | "image";
}

export function PageHero({
  overline,
  title,
  description,
  breadcrumbs,
  coverImage,
  children,
  variant = "default",
  theme = "dark",
}: PageHeroProps) {
  const imageUrl = coverImage ? getImageUrl(coverImage, { width: 1600, height: 600, quality: 85 }) : null;

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variant === "compact" ? "py-12 lg:py-16" : variant === "tall" ? "py-24 lg:py-36" : "py-16 lg:py-24",
        !imageUrl && theme === "brand" && "bg-section-brand",
        !imageUrl && theme === "dark" && "bg-brand-900",
      )}
    >
      {/* Background image */}
      {imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt={coverImage?.alt ?? ""}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/70 to-brand-900/40" />
        </>
      )}

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative container-institutional">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb items={breadcrumbs} variant="light" className="mb-6" />
        )}

        <div className="max-w-3xl">
          {overline && (
            <p className="text-overline text-teal-400 mb-4">{overline}</p>
          )}
          <h1 className="text-hero text-white text-balance mb-4">{title}</h1>
          {description && (
            <p className="text-lg text-slate-300 leading-relaxed text-pretty max-w-2xl">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
