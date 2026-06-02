import { Download } from "lucide-react";
import type { Document } from "@/types";

interface Props {
  documents?: Document[];
  heading?: string;
}

export function ProgramDocuments({ documents, heading }: Props) {
  const docs = (documents ?? []).filter((d) => d?.file?.asset?.url);
  if (docs.length === 0) return null;

  return (
    <section className="bg-white pb-12" id="documents">
      <div className="container-institutional">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-600 mb-5">
          {heading ?? "Document Depository"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {docs.map((doc) => (
            <a
              key={doc._key}
              href={doc.file.asset.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-5 flex items-center gap-4 hover:-translate-y-0.5 transition-transform cursor-pointer group"
            >
              <div className="w-11 h-11 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                <Download className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-800 group-hover:text-brand-700 transition-colors leading-snug">
                  {doc.title}
                </div>
                {doc.subtitle && (
                  <div className="text-xs text-slate-400 mt-0.5">{doc.subtitle}</div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
