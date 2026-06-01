import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch, getImageUrl } from "@/lib/sanity/client";
import { eventBySlugQuery } from "@/lib/sanity/queries";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatDatetime, toPlainText } from "@/lib/utils/formatters";
import {
  Calendar, MapPin, Video, Users, Clock, ExternalLink,
  ArrowLeft, Download, ChevronRight,
} from "lucide-react";
import type { WBFEvent, EventType } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const typeLabels: Record<EventType, string> = {
  conference: "Conference",
  workshop: "Workshop",
  webinar: "Webinar",
  "info-session": "Info Session",
  networking: "Networking",
  awards: "Awards",
  training: "Training",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const event = await sanityFetch<WBFEvent | null>(eventBySlugQuery, { slug }, { revalidate: 1800 });
    if (!event) return {};
    return {
      title: event.title,
      description: event.shortDescription,
    };
  } catch {
    return {};
  }
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  let event: WBFEvent | null = null;

  try {
    event = await sanityFetch<WBFEvent | null>(eventBySlugQuery, { slug }, {
      revalidate: 1800,
      tags: [`event:${slug}`],
    });
  } catch {
    notFound();
  }

  if (!event) notFound();

  const coverUrl = getImageUrl(event.coverImage, { width: 1200, height: 500 });
  const isOnline = event.mode === "online";
  const isPast = event.startDate ? new Date(event.startDate) < new Date() : false;
  const location = isOnline ? "Online" : [event.location, event.city, event.country].filter(Boolean).join(", ");

  return (
    <article className="bg-white">
      {coverUrl && (
        <div className="relative h-72 lg:h-96 overflow-hidden">
          <Image src={coverUrl} alt={event.title} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      <div className="container-institutional py-10">
        <Breadcrumb
          items={[
            { label: "Events", href: "/events" },
            { label: event.title },
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="neutral">{typeLabels[event.type]}</Badge>
              {isOnline && <Badge variant="teal">Online</Badge>}
              {isPast && <Badge variant="neutral">Past Event</Badge>}
            </div>

            <h1 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4 text-balance">
              {event.title}
            </h1>

            {event.shortDescription && (
              <p className="text-lg text-slate-600 leading-relaxed mb-8">{event.shortDescription}</p>
            )}

            {event.description && (
              <div className="prose prose-slate max-w-none mb-8">
                <p>{toPlainText(event.description)}</p>
              </div>
            )}

            {/* Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Agenda</h2>
                <div className="space-y-2">
                  {event.agenda.map((item) => (
                    <div
                      key={item._key}
                      className={`flex gap-4 p-4 rounded-lg border ${
                        item.type === "keynote"
                          ? "bg-brand-50 border-brand-200"
                          : item.type === "break"
                          ? "bg-slate-50 border-slate-100 opacity-70"
                          : "bg-white border-slate-100"
                      }`}
                    >
                      <div className="w-20 shrink-0 text-xs font-mono text-slate-500 pt-0.5">{item.time}</div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-800 text-sm">{item.title}</div>
                        {item.description && <div className="text-xs text-slate-500 mt-0.5">{item.description}</div>}
                        {item.speaker && <div className="text-xs text-brand-600 mt-1 font-medium">{item.speaker}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Speakers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.speakers.map((speaker) => {
                    const photoUrl = getImageUrl(speaker.photo, { width: 120, height: 120 });
                    return (
                      <div key={speaker._id} className="flex items-start gap-3 card p-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden shrink-0">
                          {photoUrl ? (
                            <Image src={photoUrl} alt={speaker.fullName} width={48} height={48} className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-brand-100 text-brand-600 font-bold text-sm">
                              {speaker.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-sm">{speaker.fullName}</div>
                          <div className="text-xs text-slate-500">{speaker.role}</div>
                          {speaker.title && <div className="text-xs text-slate-400">{speaker.title}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Documents */}
            {event.documents && event.documents.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Documents</h2>
                <div className="space-y-2">
                  {event.documents.map((doc) => (
                    <a
                      key={doc._key}
                      href={doc.file?.asset?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-brand-300 hover:bg-brand-50 transition-colors group"
                    >
                      <Download className="w-4 h-4 text-brand-500 shrink-0" />
                      <span className="text-sm text-slate-700 group-hover:text-brand-700">{doc.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <Link href="/events" className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Events
            </Link>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Register CTA */}
            {!isPast && event.registrationUrl && (
              <div className="bg-teal-600 rounded-lg p-6 text-white">
                <h3 className="font-display font-bold text-lg mb-2">Register Now</h3>
                {event.registrationDeadline && (
                  <p className="text-teal-100 text-xs mb-3">
                    Registration closes: {formatDate(event.registrationDeadline)}
                  </p>
                )}
                {event.capacity && (
                  <p className="text-teal-100 text-xs mb-4">
                    Capacity: {event.capacity} participants
                  </p>
                )}
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white text-teal-700 font-semibold py-3 rounded-sm hover:bg-teal-50 transition-colors text-sm"
                >
                  Register <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Event info */}
            <div className="card p-5 space-y-4">
              <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wide">Event Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 mb-0.5">Date</div>
                    <div className="font-medium text-slate-800">
                      {formatDate(event.startDate)}
                      {event.endDate && event.endDate !== event.startDate && (
                        <> – {formatDate(event.endDate)}</>
                      )}
                    </div>
                  </div>
                </div>
                {location && (
                  <div className="flex items-start gap-2">
                    {isOnline ? <Video className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" /> : <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />}
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">Location</div>
                      <div className="font-medium text-slate-800">{location}</div>
                    </div>
                  </div>
                )}
                {event.onlineLink && (
                  <div className="flex items-start gap-2">
                    <Video className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">Online Link</div>
                      <a href={event.onlineLink} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 text-xs">
                        Join Online →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {event.program?.slug?.current && (
              <Link
                href={`/programs/${event.program.slug.current}`}
                className="flex items-center justify-between p-4 bg-brand-50 border border-brand-100 rounded-lg group"
              >
                <div>
                  <div className="text-xs text-brand-500 mb-0.5">Related Program</div>
                  <div className="text-sm font-semibold text-brand-800">{event.program.title}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-400 group-hover:text-brand-600 transition-colors" />
              </Link>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
