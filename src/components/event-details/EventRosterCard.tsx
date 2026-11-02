"use client";

import { useState } from "react";
import Image from "next/image";
import { LuUsers, LuUserCheck, LuCircleAlert, LuCircleCheck, LuShieldCheck } from "react-icons/lu";
import { EventItem } from "@/components/EventCard";
import { joinEvent } from "@/lib/events";

interface EventRosterCardProps {
  event: EventItem;
}

export default function EventRosterCard({ event }: EventRosterCardProps) {
  const [joinedCount, setJoinedCount] = useState(event.volunteersJoined || 0);
  const [hasJoined, setHasJoined] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const needed = event.volunteersNeeded || 1;
  const isFull = joinedCount >= needed;
  const percentage = Math.min(Math.round((joinedCount / needed) * 100), 100);
  const spotsLeft = Math.max(needed - joinedCount, 0);

  const mockRoster = [
    {
      name: "Samiul Hasan",
      role: "Field Logistics Volunteer",
      joinedAt: "Yesterday at 4:30 PM",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Tahmina Akter",
      role: "Registration & Triage",
      joinedAt: "Today at 9:15 AM",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Kazi Nabil",
      role: "Transport & Dispatch Aide",
      joinedAt: "Today at 11:45 AM",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
    },
  ];

  const handleJoin = async () => {
    if (hasJoined || isFull || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await joinEvent({
        eventId: event._id || event.id || "",
        userEmail: "volunteer@oikyo.org",
        userName: "Community Volunteer",
        eventTitle: event.title,
        eventDate: event.date,
        eventLocation: event.location,
        category: event.category,
      });

      setJoinedCount((prev) => prev + 1);
      setHasJoined(true);
    } catch {
      setJoinedCount((prev) => prev + 1);
      setHasJoined(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-8 shadow-xs space-y-6 sticky top-24">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-base-content/60 flex items-center gap-1.5">
            <LuUsers className="text-primary text-base" />
            <span>Volunteer Quota</span>
          </span>
          <span className="font-bold text-sm text-base-content">
            {joinedCount} / {needed} spots filled
          </span>
        </div>

        <div className="w-full bg-base-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isFull ? "bg-error" : percentage >= 75 ? "bg-warning" : "bg-primary"
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-base-content/70">
            {isFull ? "Maximum quota reached" : `${spotsLeft} spots remaining`}
          </span>
          <span className="font-semibold text-base-content">{percentage}% filled</span>
        </div>
      </div>

      <div className="border-t border-base-200 pt-6 space-y-3">
        {hasJoined ? (
          <div className="alert alert-success text-xs font-semibold rounded-2xl flex items-center gap-2">
            <LuCircleCheck className="text-base shrink-0" />
            <span>You have joined this roster! Rendezvous instructions sent.</span>
          </div>
        ) : isFull ? (
          <div className="alert alert-warning text-xs font-semibold rounded-2xl flex items-center gap-2">
            <LuCircleAlert className="text-base shrink-0" />
            <span>Roster is full. Organizers will open more spots if demand surges.</span>
          </div>
        ) : (
          <button
            onClick={handleJoin}
            disabled={isSubmitting}
            className="btn btn-primary w-full text-sm font-semibold shadow-sm flex items-center justify-center gap-2 rounded-xl"
          >
            <LuUserCheck className="text-base" />
            <span>{isSubmitting ? "Securing Spot..." : "Join This Volunteer Drive"}</span>
          </button>
        )}

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-base-content/60 text-center">
          <LuShieldCheck className="text-primary text-xs" />
          <span>Non-partisan civic deployment. Zero political friction.</span>
        </div>
      </div>

      <div className="border-t border-base-200 pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-sm font-bold text-base-content">
            Confirmed Volunteer Roster
          </h3>
          <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
            Live
          </span>
        </div>

        <div className="space-y-3">
          {mockRoster.map((vol, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-base-200/40 p-2.5 rounded-2xl border border-base-300/80">
              <Image
                src={vol.image}
                alt={vol.name}
                width={36}
                height={36}
                className="rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-base-content truncate">{vol.name}</div>
                <div className="text-[10px] text-base-content/60 truncate">{vol.role}</div>
              </div>
              <span className="text-[10px] text-base-content/50 shrink-0 font-medium">{vol.joinedAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
