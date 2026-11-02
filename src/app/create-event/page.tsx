"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LuCirclePlus, LuCalendar, LuMapPin, LuUsers, LuImage, LuFileText, LuArrowLeft, LuCircleCheck, LuCircleAlert } from "react-icons/lu";
import EventPreviewCard from "@/components/create-event/EventPreviewCard";
import { addEvent } from "@/lib/events";

const categories = [
  "Winter Clothing",
  "Medical Relief",
  "Clean Environment",
  "Tree Planting",
  "Education & Youth",
  "Water Sanitation",
];

const districts = [
  "Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh",
  "Panchagarh", "Kurigram", "Satkhira", "Moulvibazar", "Sunamganj", "Cox's Bazar", "Bandarban",
  "Bogura", "Dinajpur", "Jessore", "Kushtia", "Comilla", "Noakhali", "Feni", "Tangail", "Gazipur"
];

export default function CreateEventPage() {
  const router = useRouter();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    title: "",
    category: "Winter Clothing",
    date: minDateString,
    location: "",
    district: "Dhaka",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    volunteersNeeded: 25,
    description: "",
    creatorName: "Community Organizer",
    creatorEmail: "organizer@oikyo.org",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isStrictlyFutureDate = (dateStr: string) => {
    if (!dateStr) return false;
    const selected = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected > today;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "volunteersNeeded" ? Number(value) : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Please provide an event title.");
      return;
    }

    if (!isStrictlyFutureDate(formData.date)) {
      setError("Event date must strictly be in the future (tomorrow or later).");
      return;
    }

    if (!formData.location.trim()) {
      setError("Please specify the exact meeting point or distribution address.");
      return;
    }

    if (formData.volunteersNeeded < 1) {
      setError("Target volunteer quota must be at least 1 person.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please provide mission details and logistics instructions for volunteers.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        volunteersJoined: 0,
        status: "active",
        createdAt: new Date().toISOString(),
      };

      await addEvent(payload);
      setSuccess(true);
      setTimeout(() => {
        router.push("/events");
      }, 1500);
    } catch {
      setError("Failed to create event. Please verify server connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200/30 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex items-center justify-between">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-bold text-base-content/70 hover:text-primary transition-colors"
          >
            <LuArrowLeft className="text-sm" />
            <span>Back to Upcoming Drives</span>
          </Link>
          <span className="text-xs text-base-content/60 font-medium">Ward & District Field Organizing</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="space-y-2 border-b border-base-200 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <LuCirclePlus className="text-sm" />
                <span>Grassroots Event Creation</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-base-content tracking-tight">
                Organize a Community Service Drive
              </h1>
              <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
                Coordinate winter clothing dispatch, medical camps, or cleanups with verified ward-level transparency. All fields update the live preview beside your form.
              </p>
            </div>

            {error && (
              <div className="alert alert-error text-xs font-semibold rounded-2xl flex items-center gap-2">
                <LuCircleAlert className="text-base shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="alert alert-success text-xs font-semibold rounded-2xl flex items-center gap-2">
                <LuCircleCheck className="text-base shrink-0" />
                <span>Drive registered successfully! Redirecting to upcoming events roster...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. North Bengal Cold-Wave Blanket Distribution"
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
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered w-full text-sm bg-base-200/40 rounded-xl"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                    District
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="select select-bordered w-full text-sm bg-base-200/40 rounded-xl"
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80 flex items-center justify-between">
                    <span>Event Date</span>
                    <span className="text-[10px] text-primary lowercase font-medium">must be future</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      min={minDateString}
                      value={formData.date}
                      onChange={handleChange}
                      className="input input-bordered w-full text-sm bg-base-200/40 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                    Volunteer Quota Needed
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="volunteersNeeded"
                      min="1"
                      max="500"
                      value={formData.volunteersNeeded}
                      onChange={handleChange}
                      className="input input-bordered w-full text-sm bg-base-200/40 rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                  Meeting Point & Address
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Tetulia Upazila Complex Ground, Panchagarh"
                  className="input input-bordered w-full text-sm bg-base-200/40 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                  Cover Photo URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="input input-bordered w-full text-sm bg-base-200/40 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                  Detailed Mission & Logistics Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Explain who the relief beneficiaries are, what volunteers should bring, and exact safety protocols..."
                  className="textarea textarea-bordered w-full text-sm bg-base-200/40 rounded-xl"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-base-200 pt-6">
                <div>
                  <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                    Lead Organizer Name
                  </label>
                  <input
                    type="text"
                    name="creatorName"
                    value={formData.creatorName}
                    onChange={handleChange}
                    className="input input-bordered w-full text-sm bg-base-200/40 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                    Lead Organizer Email
                  </label>
                  <input
                    type="email"
                    name="creatorEmail"
                    value={formData.creatorEmail}
                    onChange={handleChange}
                    className="input input-bordered w-full text-sm bg-base-200/40 rounded-xl"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full text-sm font-semibold shadow-sm flex items-center justify-center gap-2 rounded-xl mt-4"
              >
                <LuCirclePlus className="text-base" />
                <span>{isSubmitting ? "Publishing Event..." : "Publish Civic Action Drive"}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5">
            <EventPreviewCard data={formData} />
          </div>

        </div>
      </div>
    </div>
  );
}
