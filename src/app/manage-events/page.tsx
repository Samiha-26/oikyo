"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuCirclePlus, LuSquarePen, LuTrash2, LuCalendar, LuMapPin, LuUsers, LuSparkles, LuCircleAlert, LuCircleCheck } from "react-icons/lu";
import EditEventModal from "@/components/manage-events/EditEventModal";
import { EventItem } from "@/components/EventCard";
import { getAllEvents, updateEvent, deleteEvent } from "@/lib/events";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch {
      setMessage({ type: "error", text: "Failed to load events." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEdit = (event: EventItem) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveUpdate = async (updatedData: Partial<EventItem>) => {
    if (!editingEvent) return;
    const id = editingEvent._id || editingEvent.id || "";

    try {
      await updateEvent(id, updatedData);
      setEvents((prev) =>
        prev.map((e) => ((e._id === id || e.id === id) ? { ...e, ...updatedData } : e))
      );
      setMessage({ type: "success", text: "Event updated successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage({ type: "error", text: "Failed to update event." });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(`Are you sure you want to cancel and delete "${title}"? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e._id !== id && e.id !== id));
      setMessage({ type: "success", text: `"${title}" has been deleted.` });
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage({ type: "error", text: "Failed to delete event." });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setDeletingId(null);
    }
  };

  const totalMobilized = events.reduce((acc, curr) => acc + (curr.volunteersJoined || 0), 0);
  const totalSlots = events.reduce((acc, curr) => acc + (curr.volunteersNeeded || 0), 0);

  return (
    <div className="min-h-screen bg-base-200/30 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="bg-linear-to-r from-primary/10 via-base-100 to-primary/5 border border-base-300 rounded-3xl p-8 lg:p-10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <LuSparkles className="text-sm" />
              <span>Organizer Management Dashboard</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
              Manage Community Drives
            </h1>
            <p className="text-sm text-base-content/75 leading-relaxed">
              Review volunteer roster fulfillments, update rendezvous coordinates, and maintain ward-level transparency for your organized field operations.
            </p>
          </div>

          <Link
            href="/create-event"
            className="btn btn-primary px-6 font-semibold shadow-xs inline-flex items-center gap-2 shrink-0"
          >
            <LuCirclePlus className="text-lg" />
            <span>Organize New Drive</span>
          </Link>
        </div>

        {message && (
          <div
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-error"
            } text-xs font-semibold rounded-2xl flex items-center gap-2`}
          >
            {message.type === "success" ? (
              <LuCircleCheck className="text-base shrink-0" />
            ) : (
              <LuCircleAlert className="text-base shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-base-100 p-5 rounded-2xl border border-base-300 shadow-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-base-content/60">
              Active Drives Organized
            </div>
            <div className="font-serif text-3xl font-bold text-base-content mt-1">
              {events.length}
            </div>
          </div>

          <div className="bg-base-100 p-5 rounded-2xl border border-base-300 shadow-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-base-content/60">
              Volunteers Enlisted
            </div>
            <div className="font-serif text-3xl font-bold text-primary mt-1">
              {totalMobilized}
            </div>
          </div>

          <div className="bg-base-100 p-5 rounded-2xl border border-base-300 shadow-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-base-content/60">
              Overall Roster Fill Rate
            </div>
            <div className="font-serif text-3xl font-bold text-accent mt-1">
              {totalSlots > 0 ? Math.round((totalMobilized / totalSlots) * 100) : 0}%
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-3xl border border-base-300 overflow-hidden shadow-xs">
          {isLoading ? (
            <div className="p-16 text-center text-sm text-base-content/60">
              Loading organized drives...
            </div>
          ) : events.length === 0 ? (
            <div className="p-16 text-center max-w-md mx-auto space-y-4">
              <h3 className="font-serif text-xl font-bold text-base-content">
                No Community Drives Yet
              </h3>
              <p className="text-xs text-base-content/70">
                You haven&apos;t published any civic drives. Mobilize volunteers for a winter clothing distribution, medical camp, or environmental cleanup.
              </p>
              <Link href="/create-event" className="btn btn-primary btn-sm px-6 font-semibold">
                Start an Event
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full text-left">
                <thead>
                  <tr className="border-b border-base-200 text-xs text-base-content/70 uppercase">
                    <th className="py-4 px-6">Event Details</th>
                    <th className="py-4 px-4">Date & Location</th>
                    <th className="py-4 px-4">Volunteer Quota</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                  {events.map((event) => {
                    const id = event._id || event.id || "";
                    const joined = event.volunteersJoined || 0;
                    const needed = event.volunteersNeeded || 1;
                    const pct = Math.min(Math.round((joined / needed) * 100), 100);
                    const isFull = joined >= needed;

                    return (
                      <tr key={id} className="hover:bg-base-200/40 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3.5">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-base-200 shrink-0 border border-base-300">
                              <Image
                                src={event.image || "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=200&q=80"}
                                alt={event.title}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <Link
                                href={`/events/${id}`}
                                className="font-serif font-bold text-sm text-base-content hover:text-primary transition-colors line-clamp-1"
                              >
                                {event.title}
                              </Link>
                              <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary mt-0.5">
                                {event.category}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="text-xs font-semibold text-base-content flex items-center gap-1.5">
                            <LuCalendar className="text-primary text-xs shrink-0" />
                            <span>{event.date}</span>
                          </div>
                          <div className="text-[11px] text-base-content/60 flex items-center gap-1.5 mt-0.5 truncate max-w-[180px]">
                            <LuMapPin className="text-accent text-xs shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="space-y-1 w-32">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-base-content">{joined}/{needed}</span>
                              <span className="text-base-content/60">{pct}%</span>
                            </div>
                            <div className="w-full bg-base-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${isFull ? "bg-error" : pct >= 75 ? "bg-warning" : "bg-primary"}`}
                                style={{ width: `${pct}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          {isFull ? (
                            <span className="badge badge-error badge-xs font-bold uppercase tracking-wider">
                              Full
                            </span>
                          ) : (
                            <span className="badge badge-success badge-xs font-bold uppercase tracking-wider">
                              Active
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(event)}
                              className="btn btn-ghost btn-xs text-xs font-semibold gap-1.5 rounded-lg hover:bg-base-200"
                              title="Update Event"
                            >
                              <LuSquarePen className="text-sm text-primary" />
                              <span>Update</span>
                            </button>

                            <button
                              onClick={() => handleDelete(id, event.title)}
                              disabled={deletingId === id}
                              className="btn btn-ghost btn-xs text-xs font-semibold gap-1.5 text-error rounded-lg hover:bg-error/10"
                              title="Cancel & Delete Event"
                            >
                              <LuTrash2 className="text-sm" />
                              <span>{deletingId === id ? "..." : "Delete"}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      <EditEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={editingEvent}
        onSave={handleSaveUpdate}
      />
    </div>
  );
}
