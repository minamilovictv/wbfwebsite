import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Video } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getImageUrl } from "@/lib/sanity/client";
import { formatDate } from "@/lib/utils/formatters";
import type { WBFEvent, EventType } from "@/types";

const typeLabels: Record<EventType, string> = {
  conference: "Conference",
  workshop: "Workshop",
  webinar: "Webinar",
  "info-session": "Info Session",
  networking: "Networking",
  awards: "Awards",
  training: "Training",
};

export function EventCard({ event }: { event: WBFEvent }) {
  const imageUrl = getImageUrl(event.coverImage, { width: 600, height: 340 });
  const isOnline = event.mode === "online";
  const location = isOnline ? "Online" : [event.city, event.country].filter(Boolean).join(", ");

  return (
    <Link
      href={`/events/${event.slug.current}`}
      className="group card-hover overflow-hidden flex flex-col"
    >
      <div className="relative h-40 bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-teal-700" />
        )}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant="neutral" size="sm">{typeLabels[event.type]}</Badge>
          {isOnline && <Badge variant="teal" size="sm">Online</Badge>}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-card-title group-hover:text-brand-600 transition-colors mb-3 text-balance flex-1">
          {event.title}
        </h3>
        <div className="space-y-1.5 text-xs text-slate-500 mt-auto">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            {formatDate(event.startDate, "d MMM yyyy")}
            {event.endDate && event.endDate !== event.startDate && ` – ${formatDate(event.endDate, "d MMM yyyy")}`}
          </div>
          {location && (
            <div className="flex items-center gap-1.5">
              {isOnline ? <Video className="w-3.5 h-3.5 shrink-0" /> : <MapPin className="w-3.5 h-3.5 shrink-0" />}
              {location}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
