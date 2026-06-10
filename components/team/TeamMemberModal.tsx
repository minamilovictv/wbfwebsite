"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, Mail, Linkedin } from "lucide-react";
import { getImageUrl } from "@/lib/sanity/client";
import type { Person, BioBlock, BioSpan } from "@/types";

// ── Minimal Portable Text renderer (paragraphs, headings, lists, marks, links) ──

function renderSpan(span: BioSpan, block: BioBlock, key: number) {
  let node: React.ReactNode = span.text ?? "";
  for (const mark of span.marks ?? []) {
    if (mark === "strong") node = <strong>{node}</strong>;
    else if (mark === "em") node = <em>{node}</em>;
    else if (mark === "underline") node = <u>{node}</u>;
    else {
      const def = block.markDefs?.find((d) => d._key === mark);
      if (def?._type === "link" && def.href) {
        node = (
          <a
            href={def.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 underline underline-offset-2 hover:text-brand-800"
          >
            {node}
          </a>
        );
      }
    }
  }
  return <span key={span._key ?? key}>{node}</span>;
}

function renderBlockContent(block: BioBlock) {
  return (block.children ?? []).map((span, i) => renderSpan(span, block, i));
}

function RichBio({ blocks }: { blocks: BioBlock[] }) {
  const out: React.ReactNode[] = [];
  let list: { type: string; items: React.ReactNode[] } | null = null;

  const flushList = () => {
    if (!list) return;
    const key = `list-${out.length}`;
    out.push(
      list.type === "number" ? (
        <ol key={key} className="list-decimal pl-5 space-y-1.5">{list.items}</ol>
      ) : (
        <ul key={key} className="list-disc pl-5 space-y-1.5">{list.items}</ul>
      ),
    );
    list = null;
  };

  blocks.forEach((block, i) => {
    if (block._type !== "block") return;
    const key = block._key ?? `block-${i}`;

    if (block.listItem) {
      if (!list || list.type !== block.listItem) {
        flushList();
        list = { type: block.listItem, items: [] };
      }
      list.items.push(<li key={key}>{renderBlockContent(block)}</li>);
      return;
    }
    flushList();

    if (block.style === "h4") {
      out.push(
        <h4 key={key} className="font-display text-base font-bold text-slate-900 pt-2">
          {renderBlockContent(block)}
        </h4>,
      );
    } else if (block.style === "blockquote") {
      out.push(
        <blockquote key={key} className="border-l-2 border-brand-200 pl-4 italic text-slate-500">
          {renderBlockContent(block)}
        </blockquote>,
      );
    } else {
      out.push(<p key={key}>{renderBlockContent(block)}</p>);
    }
  });
  flushList();

  return <div className="space-y-3.5 text-slate-600 leading-relaxed text-[15px]">{out}</div>;
}

// ── Modal ──────────────────────────────────────────────────────────────────

interface Props {
  person: Person;
  onClose: () => void;
}

export function TeamMemberModal({ person, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const photoUrl = getImageUrl(person.photo, { width: 640, height: 640 });
  const hasRichBio = (person.biography?.length ?? 0) > 0;
  const initials = person.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Profile of ${person.fullName}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-slide-up focus:outline-none"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>

        {/* Profile header */}
        <div className="bg-gradient-brand px-6 pt-10 pb-8 lg:px-10 text-center rounded-t-xl">
          <div className="relative w-32 h-32 lg:w-36 lg:h-36 mx-auto rounded-full overflow-hidden ring-4 ring-white/25 bg-slate-100 mb-5">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={person.photo?.alt ?? person.fullName}
                fill
                className="object-cover"
                sizes="144px"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                <span className="text-brand-600 font-display font-bold text-4xl">{initials}</span>
              </div>
            )}
          </div>

          <h2 className="font-display text-2xl font-bold text-white text-balance">
            {person.title ? `${person.title} ` : ""}{person.fullName}
          </h2>
          <p className="text-sm font-medium text-teal-200 mt-1">{person.role}</p>
          {person.department && (
            <p className="text-xs text-white/55 mt-1">{person.department}</p>
          )}

          {(person.email || person.linkedin) && (
            <div className="flex justify-center gap-2.5 mt-5">
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-brand-800 text-[13px] font-semibold rounded-sm hover:bg-slate-100 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </a>
              )}
              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/12 border border-white/30 text-white text-[13px] font-semibold rounded-sm hover:bg-white/20 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>

        {/* Biography */}
        <div className="px-6 py-7 lg:px-10 lg:py-8">
          {hasRichBio ? (
            <RichBio blocks={person.biography!} />
          ) : person.bio ? (
            <p className="text-slate-600 leading-relaxed text-[15px] whitespace-pre-line">
              {person.bio}
            </p>
          ) : (
            <p className="text-sm text-slate-400 italic text-center">
              Biography coming soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
