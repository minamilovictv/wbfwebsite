import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getImageUrl } from "@/lib/sanity/client";
import { formatCurrency, getCountryFlag, getCountryName } from "@/lib/utils/formatters";
import type { Project } from "@/types";

const statusConfig = {
  ongoing: { label: "Ongoing", variant: "success" as const },
  completed: { label: "Completed", variant: "neutral" as const },
  suspended: { label: "Suspended", variant: "warning" as const },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  if (!project.slug?.current) return null;

  const imageUrl = getImageUrl(project.coverImage, { width: 600, height: 340 });
  const status = statusConfig[project.status] ?? { label: project.status, variant: "neutral" as const };

  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className="group card-hover overflow-hidden flex flex-col"
    >
      <div className="relative h-44 bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.coverImage?.alt ?? project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
        )}
        <div className="absolute top-3 left-3">
          <Badge variant={status.variant} dot size="sm">{status.label}</Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {project.program && (
          <p className="text-xs text-teal-600 font-semibold uppercase tracking-wide mb-1.5">
            {project.program.title}
          </p>
        )}
        <h3 className="text-card-title group-hover:text-brand-600 transition-colors mb-2 text-balance flex-1">
          {project.title}
        </h3>
        <p className="text-[13px] text-slate-500 leading-relaxed mb-3 line-clamp-3">{project.shortDescription}</p>

        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3 mt-auto">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span className="flex gap-0.5">
              {(project.countries ?? []).slice(0, 3).map((c) => (
                <span key={c}>{getCountryFlag(c)}</span>
              ))}
            </span>
          </div>
          <span className="font-semibold text-slate-700">
            {formatCurrency(project.grantAmount, project.currency)}
          </span>
        </div>

        <div className="mt-3 text-xs font-medium text-brand-500 flex items-center gap-1 group-hover:gap-1.5 transition-all">
          View project <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
