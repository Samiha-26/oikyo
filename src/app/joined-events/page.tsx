"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { LuTicket, LuCalendar, LuShieldCheck, LuArrowRight } from "react-icons/lu";
import JoinedEventCard, { JoinedEventItem } from "@/components/joined-events/JoinedEventCard";
import { getMyJoinedEvents, deleteJoinedEvent } from "@/lib/events";
import { authClient } from "@/lib/auth-client";

export default function JoinedEventsPage() {
  const router = useRouter();
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const [joinedEvents, setJoinedEvents] = useState<JoinedEventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      loadJoined(session.user.email);
    } else if (!isSessionLoading) {
      router.push("/signin");
    }
  }, [session, isSessionLoading, router]);

  const loadJoined = async (email: string) => {
    setIsLoading(true);
    try {
      const data = await getMyJoinedEvents(email);
      const sorted = Array.isArray(data)
        ? [...data].sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
        : [];
      setJoinedEvents(sorted);
    } catch {
      setJoinedEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSpot = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: "Release Volunteer Spot?",
      text: `Are you sure you want to cancel your participation in "${title}"? This spot will be opened for other volunteers.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, release spot",
      cancelButtonText: "Keep spot",
    });

    if (!result.isConfirmed) return;

    setCancellingId(id);
    try {
      await deleteJoinedEvent(id);
      setJoinedEvents((prev) => prev.filter((item) => item._id !== id));
      Swal.fire({
        title: "Spot Released",
        text: `You have released your spot for "${title}".`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to release the spot. Please try again.",
        icon: "error",
      });
    } finally {
      setCancellingId(null);
    }
  };

  const sortedEvents = [...joinedEvents].sort(
    (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
  );

  return (
    <div className="min-h-screen bg-base-200/30 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="bg-linear-to-r from-success/10 via-base-100 to-primary/10 border border-base-300 rounded-3xl p-8 lg:p-10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-bold uppercase tracking-wider">
              <LuTicket className="text-sm" />
              <span>Volunteer Mission Passport</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
              My Joined Volunteer Drives
            </h1>
            <p className="text-sm text-base-content/75 leading-relaxed">
              Track your confirmed community relief commitments. All operations are sorted chronologically with meeting points and briefing schedules.
            </p>
          </div>

          <Link
            href="/events"
            className="btn btn-primary px-6 font-semibold shadow-xs inline-flex items-center gap-2 shrink-0"
          >
            <span>Explore More Drives</span>
            <LuArrowRight className="text-sm" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-base-100 p-5 rounded-2xl border border-base-300 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0">
              <LuTicket />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-base-content/60">
                Committed Missions
              </div>
              <div className="font-serif text-2xl font-bold text-base-content">
                {sortedEvents.length} Drives
              </div>
            </div>
          </div>

          <div className="bg-base-100 p-5 rounded-2xl border border-base-300 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center text-xl shrink-0">
              <LuCalendar />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-base-content/60">
                Next Scheduled Field Day
              </div>
              <div className="font-serif text-2xl font-bold text-base-content">
                {sortedEvents[0]?.eventDate || "None Upcoming"}
              </div>
            </div>
          </div>

          <div className="bg-base-100 p-5 rounded-2xl border border-base-300 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-success/10 text-success flex items-center justify-center text-xl shrink-0">
              <LuShieldCheck />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-base-content/60">
                Volunteer Standing
              </div>
              <div className="font-serif text-2xl font-bold text-success">
                100% Reliable
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="p-16 text-center text-sm text-base-content/60 bg-base-100 rounded-3xl border border-base-300">
            Loading confirmed volunteer drives...
          </div>
        ) : sortedEvents.length === 0 ? (
          <div className="bg-base-100 rounded-3xl border border-base-300 p-12 text-center max-w-lg mx-auto shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center mx-auto text-base-content/50 text-2xl">
              <LuTicket />
            </div>
            <h3 className="font-serif text-xl font-bold text-base-content">
              No Joined Drives Yet
            </h3>
            <p className="text-xs text-base-content/70 leading-relaxed">
              You haven&apos;t joined any community service operations. Browse active 64-district initiatives and enlist your support today.
            </p>
            <Link href="/events" className="btn btn-primary btn-sm px-6 font-semibold">
              Browse Upcoming Drives
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((item) => (
              <JoinedEventCard
                key={item._id}
                item={item}
                onCancel={handleCancelSpot}
                isCancelling={cancellingId === item._id}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
