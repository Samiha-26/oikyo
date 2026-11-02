import type { Metadata } from "next";
import Link from "next/link";
import { LuArrowLeft, LuCalendarX } from "react-icons/lu";
import EventHeader from "@/components/event-details/EventHeader";
import EventRosterCard from "@/components/event-details/EventRosterCard";
import { getEventById } from "@/lib/events";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) {
    return {
      title: "Event Not Found | Oikyo",
    };
  }
  return {
    title: `${event.title} | Oikyo Civic Action`,
    description: event.description,
  };
}

export default async function EventDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="bg-base-100 rounded-3xl border border-base-300 p-10 text-center max-w-md shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center mx-auto mb-4 text-base-content/50 text-2xl">
            <LuCalendarX />
          </div>
          <h2 className="font-serif text-2xl font-bold text-base-content mb-2">
            Event Not Found
          </h2>
          <p className="text-sm text-base-content/70 leading-relaxed mb-6">
            The humanitarian drive you are looking for may have been completed, archived, or removed by its coordinator.
          </p>
          <Link
            href="/events"
            className="btn btn-primary btn-sm px-6 font-semibold inline-flex items-center gap-2 rounded-xl"
          >
            <LuArrowLeft className="text-sm" />
            <span>Browse Active Events</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/30 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <EventHeader event={event} />
          </div>

          <div className="lg:col-span-4">
            <EventRosterCard event={event} />
          </div>
        </div>
      </div>
    </div>
  );
}
