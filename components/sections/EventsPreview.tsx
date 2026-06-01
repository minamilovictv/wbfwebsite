import Link from "next/link";
import { Calendar, MapPin, Video, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils/formatters";
import type { WBFEvent, EventType } from "@/types";
import { cn } from "@/lib/utils/cn";

const typeLabels: Record<EventType, string> = {
  conference: "Conference",
  workshop: "Workshop",
  webinar: "Webinar",
  "info-session": "Info Session",
  networking: "Networking",
  awards: "Awards",
  training: "Training",
};

function EventItem({ event }: { event: WBFEvent }) {
  if (!event.slug?.current) return null;

  const isOnline = event.mode === "online";
  const location = isOnline ? "Online" : [event.city, event.country].filter(Boolean).join(", ");

  return (
    <Link
      href={`/events/${event.slug.current}`}
      className="group flex gap-5 p-5 card-hover items-start"
    >
      {/* Date block */}
      <div className="shrink-0 w-16 text-center">
        <div className="bg-brand-900 text-white rounded-t-md px-2 py-1 text-xs font-bold uppercase tracking-wider">
          {formatDate(event.startDate, "MMM")}
        </div>
        <div className="border-x border-b border-slate-200 rounded-b-md px-2 py-2">
          <span className="text-2xl font-display font-bold text-slate-800 leading-none">
            {formatDate(event.startDate, "d")}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="neutral" size="sm">{typeLabels[event.type]}</Badge>
          {isOnline && (
            <Badge variant="teal" size="sm">
              <Video className="w-3 h-3" /> Online
            </Badge>
          )}
        </div>
        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-brand-600 transition-colors mb-1.5 text-balance">
          {event.title}
        </h3>
        {location && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="w-3 h-3 shrink-0" />
            {location}
          </div>
        )}
      </div>

      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-400 transition-colors shrink-0 mt-1" />
    </Link>
  );
}

interface EventsPreviewProps {
  events?: WBFEvent[];
}

export function EventsPreview({ events = [] }: EventsPreviewProps) {
  if (events.length === 0) return null;

  return (
    <section className="section-padding-sm bg-section-alt">
      <div className="container-institutional">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <SectionHeader
            overline="Events & Activities"
            title="Upcoming Events"
            description="Join us at conferences, workshops, info sessions and networking events across the region."
          />
          <div>
            <div className="space-y-2 mb-6">
              {events.map((e) => (
                <EventItem key={e._id} event={e} />
              ))}
            </div>
            <Link href="/events" className="btn-ghost btn-sm">
              All events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
