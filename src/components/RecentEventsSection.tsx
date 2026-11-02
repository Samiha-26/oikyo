import Link from "next/link";
import { LuArrowRight, LuSparkles } from "react-icons/lu";
import EventCard from "@/components/EventCard";
import { getRecentEvents } from "@/lib/events";

export default async function RecentEventsSection() {
  const recentEvents = await getRecentEvents();

  return (
    <section className="py-20 bg-base-200/40 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <LuSparkles className="text-sm" />
              <span>Verified Grassroots Mobilization</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
              Upcoming Civic Action Drives
            </h2>
            <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
              Explore 6 prioritized field operations requiring volunteer hands and logistics coordination. All drives feature strict quota limits and zero overhead.
            </p>
          </div>

          <Link
            href="/events"
            className="btn btn-outline btn-primary btn-sm px-5 flex items-center gap-2 self-start md:self-auto shrink-0 shadow-xs"
          >
            <span>Browse All Events</span>
            <LuArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentEvents.map((event) => (
            <EventCard key={event._id || event.id} event={event} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/events"
            className="btn btn-primary px-8 font-semibold shadow-xs inline-flex items-center gap-2"
          >
            <span>Explore All 64-District Drives</span>
            <LuArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
}
