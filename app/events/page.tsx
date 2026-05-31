import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { eventsListQuery } from "@/lib/sanity/queries";
import { PageHero } from "@/components/ui/PageHero";
import { EventCard } from "@/components/events/EventCard";
import type { WBFEvent } from "@/types";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events from the Western Balkans Fund.",
};

export default async function EventsPage() {
  let events: WBFEvent[] = [];

  try {
    events = await sanityFetch<WBFEvent[]>(eventsListQuery, {}, {
      revalidate: 1800,
      tags: ["events"],
    });
  } catch {}

  const now = new Date().toISOString();
  const upcoming = events.filter((e) => e.startDate >= now);
  const past = events.filter((e) => e.startDate < now);

  return (
    <>
      <PageHero
        overline="Events"
        title="Events & Activities"
        description="Conferences, workshops, info sessions and networking events across the Western Balkans."
        variant="compact"
        breadcrumbs={[{ label: "Events" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          {upcoming.length > 0 && (
            <div className="mb-14">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">
                Upcoming Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((e) => <EventCard key={e._id} event={e} />)}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 text-slate-600">
                Past Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
                {past.slice(0, 9).map((e) => <EventCard key={e._id} event={e} />)}
              </div>
            </div>
          )}

          {events.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-medium text-slate-600">No events scheduled</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
