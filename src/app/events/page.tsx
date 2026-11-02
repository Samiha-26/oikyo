import type { Metadata } from "next";
import Link from "next/link";
import { LuCirclePlus, LuSparkles } from "react-icons/lu";
import EventsExplorer from "@/components/events/EventsExplorer";
import { getAllEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Upcoming Events | Oikyo Grassroots Coalition",
  description: "Explore and join verified grassroots civic drives, winter relief, medical camps, and environmental initiatives across Bangladesh.",
};

export default async function EventsPage() {
  const events = await getAllEvents();

  return (
    <div className="min-h-screen bg-base-200/30 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="bg-linear-to-r from-primary/10 via-base-100 to-accent/10 border border-base-300 rounded-3xl p-8 lg:p-10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <LuSparkles className="text-sm" />
              <span>Verified Civic Logistics</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content tracking-tight">
              Upcoming Civic Action Drives
            </h1>
            <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
              Explore community-led volunteer operations across all 64 districts. View live roster capacity, meeting points, and join with zero overhead. Past drives are automatically archived.
            </p>
          </div>

          <Link
            href="/create-event"
            className="btn btn-primary px-6 font-semibold shadow-xs inline-flex items-center gap-2 shrink-0"
          >
            <LuCirclePlus className="text-lg" />
            <span>Organize a Drive</span>
          </Link>
        </div>

        <EventsExplorer initialEvents={events} />

      </div>
    </div>
  );
}
