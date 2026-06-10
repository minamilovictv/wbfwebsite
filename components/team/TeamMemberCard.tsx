"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Linkedin } from "lucide-react";
import { getImageUrl } from "@/lib/sanity/client";
import { TeamMemberModal } from "./TeamMemberModal";
import type { Person } from "@/types";

export function TeamMemberCard({ person }: { person: Person }) {
  const [open, setOpen] = useState(false);
  const photoUrl = getImageUrl(person.photo, { width: 300, height: 300 });
  const initials = person.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <>
      <div className="card p-5 flex flex-col items-center text-center group hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-col items-center focus-visible:outline-none"
          aria-label={`View profile of ${person.fullName}`}
          aria-haspopup="dialog"
        >
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-slate-100 mb-4 shrink-0 ring-2 ring-transparent group-hover:ring-brand-200 transition-all">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={person.photo?.alt ?? person.fullName}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                <span className="text-brand-600 font-display font-bold text-2xl">{initials}</span>
              </div>
            )}
          </div>

          <h3 className="font-semibold text-slate-900 text-sm group-hover:text-brand-700 transition-colors">
            {person.title ? `${person.title} ` : ""}{person.fullName}
          </h3>
          <p className="text-xs text-teal-600 font-medium mt-0.5">{person.role}</p>
          {person.country && (
            <p className="text-xs text-slate-400 mt-0.5">{person.country}</p>
          )}
        </button>

        <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="w-8 h-8 bg-brand-50 rounded-full flex items-center justify-center hover:bg-brand-100 transition-colors"
              aria-label={`Email ${person.fullName}`}
            >
              <Mail className="w-3.5 h-3.5 text-brand-600" />
            </a>
          )}
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-brand-50 rounded-full flex items-center justify-center hover:bg-brand-100 transition-colors"
              aria-label={`LinkedIn profile of ${person.fullName}`}
            >
              <Linkedin className="w-3.5 h-3.5 text-brand-600" />
            </a>
          )}
        </div>
      </div>

      {open && <TeamMemberModal person={person} onClose={() => setOpen(false)} />}
    </>
  );
}
