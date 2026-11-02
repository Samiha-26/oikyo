"use client";

import { useState, useEffect } from "react";
import { LuX, LuSave, LuCircleAlert } from "react-icons/lu";
import { EventItem } from "@/components/EventCard";

const categories = [
  "Winter Clothing",
  "Medical Relief",
  "Clean Environment",
  "Tree Planting",
  "Education & Youth",
  "Water Sanitation",
];

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  onSave: (updatedEvent: Partial<EventItem>) => Promise<void>;
}

export default function EditEventModal({
  isOpen,
  onClose,
  event,
  onSave,
}: EditEventModalProps) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split("T")[0];

  const [formData, setFormData] = useState<Partial<EventItem>>({
    title: "",
    category: "Winter Clothing",
    date: minDateString,
    location: "",
    volunteersNeeded: 25,
    description: "",
  });

  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        category: event.category || "Winter Clothing",
        date: event.date || minDateString,
        location: event.location || "",
        volunteersNeeded: event.volunteersNeeded || 25,
        description: event.description || "",
      });
      setError("");
    }
  }, [event, minDateString]);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title?.trim()) {
      setError("Event title cannot be empty.");
      return;
    }

    if (formData.date && new Date(formData.date) <= new Date()) {
      setError("Event date must strictly remain in the future.");
      return;
    }

    if ((formData.volunteersNeeded || 0) < (event.volunteersJoined || 0)) {
      setError(`Quota cannot be less than currently joined volunteers (${event.volunteersJoined || 0}).`);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch {
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-base-100 rounded-3xl border border-base-300 w-full max-w-lg p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-base-200 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              Coordinator Portal
            </span>
            <h3 className="font-serif text-xl font-bold text-base-content mt-0.5">
              Update Event Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle btn-sm text-base-content/60 hover:text-base-content"
          >
            <LuX className="text-lg" />
          </button>
        </div>

        {error && (
          <div className="alert alert-error text-xs font-semibold rounded-2xl flex items-center gap-2">
            <LuCircleAlert className="text-base shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
              Event Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input input-bordered w-full text-sm bg-base-200/40 rounded-xl"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                Action Sector
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="select select-bordered w-full text-sm bg-base-200/40 rounded-xl"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                Event Date
              </label>
              <input
                type="date"
                min={minDateString}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="input input-bordered w-full text-sm bg-base-200/40 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                Meeting Point
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input input-bordered w-full text-sm bg-base-200/40 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                Volunteer Quota
              </label>
              <input
                type="number"
                min={event.volunteersJoined || 1}
                max="500"
                value={formData.volunteersNeeded}
                onChange={(e) => setFormData({ ...formData, volunteersNeeded: Number(e.target.value) })}
                className="input input-bordered w-full text-sm bg-base-200/40 rounded-xl"
                required
              />
            </div>
          </div>

          <div>
            <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="textarea textarea-bordered w-full text-sm bg-base-200/40 rounded-xl"
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-base-200">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-sm font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary btn-sm px-6 font-semibold shadow-xs flex items-center gap-2 rounded-xl"
            >
              <LuSave className="text-sm" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
