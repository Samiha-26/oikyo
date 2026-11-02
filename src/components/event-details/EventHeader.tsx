"use client";

import Link from "next/link";
import Image from "next/image";
import { LuCalendar, LuClock, LuMapPin, LuShieldCheck, LuArrowLeft, LuShare2 } from "react-icons/lu";
import { EventItem } from "@/components/EventCard";

interface EventHeaderProps {
  event: EventItem;
}

export default function EventHeader({ event }: EventHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-xs font-bold text-base-content/70 hover:text-primary transition-colors"
        >
          <LuArrowLeft className="text-sm" />
          <span>Back to Upcoming Drives</span>
        </Link>

        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              navigator.clipboard?.writeText(window.location.href);
            }
          }}
          className="btn btn-ghost btn-xs text-xs font-semibold gap-1.5 rounded-xl text-base-content/70 hover:text-base-content"
          title="Copy link to clipboard"
        >
          <LuShare2 className="text-sm" />
          <span>Share Drive</span>
        </button>
      </div>

      <div className="relative aspect-21/9 w-full rounded-3xl overflow-hidden border border-base-300 shadow-md bg-base-200">
        <Image
          src={event.image || "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"}
          alt={event.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="badge badge-primary font-bold uppercase tracking-wider text-xs px-3 py-1">
              {event.category}
            </span>
            {event.district && (
              <span className="badge badge-neutral/80 backdrop-blur-md text-white font-semibold text-xs px-3 py-1 border-white/20">
                {event.district} District
              </span>
            )}
            <span className="badge badge-success font-semibold text-xs px-3 py-1">
              Verified Relief Operation
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-base-100 rounded-2xl border border-base-300 p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0">
            <LuCalendar />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-base-content/60">
              Scheduled Date
            </div>
            <div className="font-semibold text-sm text-base-content mt-0.5">
              {event.date}
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-2xl border border-base-300 p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl shrink-0">
            <LuClock />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-base-content/60">
              Rendezvous Time
            </div>
            <div className="font-semibold text-sm text-base-content mt-0.5">
              08:30 AM (Briefing & Dispatch)
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-2xl border border-base-300 p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center text-xl shrink-0">
            <LuMapPin />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-wider text-base-content/60">
              Meeting Point
            </div>
            <div className="font-semibold text-sm text-base-content truncate mt-0.5">
              {event.location}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-base-content mb-3">
            About This Humanitarian Drive
          </h2>
          <p className="text-base text-base-content/80 leading-relaxed whitespace-pre-line">
            {event.description}
          </p>
        </div>

        <div className="border-t border-base-200 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {event.creatorImage ? (
              <Image
                src={event.creatorImage}
                alt={event.creatorName}
                width={48}
                height={48}
                className="rounded-2xl object-cover border border-base-300"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-lg font-bold border border-base-300">
                {event.creatorName?.charAt(0) || "O"}
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5 font-serif font-bold text-base text-base-content">
                <span>{event.creatorName}</span>
                <LuShieldCheck className="text-primary text-base" title="Verified Community Organizer" />
              </div>
              <div className="text-xs text-base-content/60">
                Lead District Field Coordinator • {event.creatorEmail || "verified@oikyo.org"}
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-success/10 text-success text-xs font-bold px-3 py-1.5 rounded-xl border border-success/20">
            <span>Verified Organizer Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
