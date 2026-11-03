"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  LuUser,
  LuMail,
  LuImage,
  LuShieldCheck,
  LuSave,
  LuArrowLeft,
  LuCalendar,
  LuTicket,
  LuSparkles,
} from "react-icons/lu";
import { authClient } from "@/lib/auth-client";
import { getMyEvents, getMyJoinedEvents } from "@/lib/events";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending: isSessionLoading } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [stats, setStats] = useState({ organizedCount: 0, joinedCount: 0 });

  useEffect(() => {
    if (!isSessionLoading && !session?.user) {
      router.push("/signin");
    }
  }, [session, isSessionLoading, router]);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
      setEmail(session.user.email || "");

      if (session.user.email) {
        Promise.all([
          getMyEvents(session.user.email),
          getMyJoinedEvents(session.user.email),
        ]).then(([created, joined]) => {
          setStats({
            organizedCount: Array.isArray(created) ? created.length : 0,
            joinedCount: Array.isArray(joined) ? joined.length : 0,
          });
        });
      }
    }
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      Swal.fire({
        title: "Name Required",
        text: "Please enter your display name.",
        icon: "warning",
      });
      return;
    }

    setIsSaving(true);
    try {
      await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      await Swal.fire({
        title: "Profile Updated! 🎉",
        text: "Your name and profile picture have been updated successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      router.refresh();
    } catch {
      Swal.fire({
        title: "Update Failed",
        text: "Could not update your profile. Please try again.",
        icon: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const initial = (name || "Volunteer").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-base-200/30 py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-bold text-base-content/70 hover:text-primary transition-colors"
          >
            <LuArrowLeft className="text-sm" />
            <span>Back to Upcoming Drives</span>
          </Link>
          <span className="text-xs text-base-content/60 font-medium">Volunteer Identity & Credentials</span>
        </div>

        {/* Profile Card */}
        <div className="bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-10 shadow-xs space-y-8">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-base-200">
            <div className="relative">
              {image ? (
                <Image
                  src={image}
                  alt={name || "User Avatar"}
                  width={96}
                  height={96}
                  unoptimized
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/20 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-3xl shadow-md">
                  {initial}
                </div>
              )}
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-success ring-4 ring-base-100" title="Active"></span>
            </div>

            <div className="text-center sm:text-left space-y-1.5 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <LuShieldCheck className="text-sm" />
                <span>Verified Grassroots Member</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-base-content tracking-tight truncate">
                {name || "Community Volunteer"}
              </h1>
              <p className="text-xs text-base-content/60 truncate flex items-center justify-center sm:justify-start gap-1.5">
                <LuMail className="text-xs text-primary" />
                <span>{email || "volunteer@oikyo.org"}</span>
              </p>
            </div>
          </div>

          {/* Activity Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-base-200/50 p-5 rounded-2xl border border-base-300 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0">
                <LuCalendar />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-base-content/60">
                  Organized Drives
                </div>
                <div className="font-serif text-2xl font-bold text-base-content">
                  {stats.organizedCount} Initiatives
                </div>
              </div>
            </div>

            <div className="bg-base-200/50 p-5 rounded-2xl border border-base-300 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-success/10 text-success flex items-center justify-center text-xl shrink-0">
                <LuTicket />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-base-content/60">
                  Joined Missions
                </div>
                <div className="font-serif text-2xl font-bold text-base-content">
                  {stats.joinedCount} Deployments
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleUpdate} className="space-y-6 pt-4">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-base-content flex items-center gap-2">
                <LuSparkles className="text-primary text-base" />
                <span>Update Profile Credentials</span>
              </h3>
              <p className="text-xs text-base-content/60">
                Keep your volunteer contact information and field identification current.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {/* Name */}
              <div className="form-control space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                  <LuUser className="text-primary text-xs" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="input input-bordered w-full rounded-2xl text-sm focus:input-primary"
                />
              </div>

              {/* Photo URL */}
              <div className="form-control space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                  <LuImage className="text-primary text-xs" />
                  <span>Profile Photo URL</span>
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="input input-bordered w-full rounded-2xl text-sm focus:input-primary font-mono text-xs"
                />
                <span className="text-[11px] text-base-content/50">
                  Paste any valid image URL (e.g. Unsplash, GitHub avatar, or Imgur).
                </span>
              </div>

              {/* Email (Readonly) */}
              <div className="form-control space-y-1.5 opacity-75">
                <label className="text-xs font-bold uppercase tracking-wider text-base-content/70 flex items-center gap-1.5">
                  <LuMail className="text-primary text-xs" />
                  <span>Verified Email Address</span>
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="input input-bordered w-full rounded-2xl text-sm bg-base-200 cursor-not-allowed"
                />
                <span className="text-[11px] text-base-content/50">
                  Email address is linked to your authentication credentials.
                </span>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving || isSessionLoading}
                className="btn btn-primary px-8 font-semibold shadow-xs flex items-center gap-2 rounded-2xl"
              >
                <LuSave className="text-base" />
                <span>{isSaving ? "Saving Changes..." : "Save Profile Changes"}</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
