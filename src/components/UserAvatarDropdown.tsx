"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuChevronDown, LuCirclePlus, LuSlidersHorizontal, LuCalendarCheck, LuLogOut } from "react-icons/lu";
import { authClient } from "@/lib/auth-client";

interface UserAvatarDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function UserAvatarDropdown({ user }: UserAvatarDropdownProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const closeDropdown = () => {
    const elem = document.activeElement as HTMLElement | null;
    elem?.blur();
  };

  const handleSignOut = async () => {
    closeDropdown();
    setIsSigningOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/signin");
            router.refresh();
          },
        },
      });
    } catch {
      router.push("/signin");
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  };

  const displayName = user.name || "Volunteer Coordinator";
  const displayEmail = user.email || "volunteer@oikyo.org";
  const initial = displayName.charAt(0).toUpperCase() || "O";

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="tooltip tooltip-bottom flex items-center gap-2 p-1 rounded-full hover:bg-base-200 transition-colors cursor-pointer"
        data-tip={displayName}
      >
        <div className="relative">
          {user.image ? (
            <Image
              src={user.image}
              alt={displayName}
              width={38}
              height={38}
              unoptimized
              className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/30"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm shadow-xs">
              {initial}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success ring-2 ring-base-100"></span>
        </div>
        <LuChevronDown className="text-xs text-base-content/60 hidden sm:block" />
      </div>

      <ul
        tabIndex={0}
        onClick={closeDropdown}
        className="dropdown-content z-50 menu p-2.5 shadow-xl bg-base-100 rounded-2xl mt-3 w-64 border border-base-200 space-y-1"
      >
        <li className="menu-title px-3 py-2 border-b border-base-200">
          <span className="text-[11px] text-base-content/60 font-medium">Signed in as</span>
          <span className="text-sm font-bold text-base-content truncate mt-0.5">
            {displayEmail}
          </span>
        </li>

        <li className="pt-1">
          <Link
            href="/create-event"
            onClick={closeDropdown}
            className="flex items-center justify-between text-xs font-semibold py-2 rounded-xl"
          >
            <span className="flex items-center gap-2">
              <LuCirclePlus className="text-primary text-base" />
              <span>Create Event</span>
            </span>
            <span className="badge badge-primary badge-xs font-bold">New</span>
          </Link>
        </li>

        <li>
          <Link
            href="/manage-events"
            onClick={closeDropdown}
            className="flex items-center justify-between text-xs font-semibold py-2 rounded-xl"
          >
            <span className="flex items-center gap-2">
              <LuSlidersHorizontal className="text-secondary text-base" />
              <span>Manage Events</span>
            </span>
            <span className="badge badge-ghost badge-xs">Host</span>
          </Link>
        </li>

        <li>
          <Link
            href="/joined-events"
            onClick={closeDropdown}
            className="flex items-center justify-between text-xs font-semibold py-2 rounded-xl"
          >
            <span className="flex items-center gap-2">
              <LuCalendarCheck className="text-accent text-base" />
              <span>Joined Events</span>
            </span>
            <span className="badge badge-accent badge-xs font-bold">Roster</span>
          </Link>
        </li>

        <div className="divider my-1"></div>

        <li>
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex items-center gap-2 text-xs font-semibold text-error hover:bg-error/10 py-2 rounded-xl"
          >
            <LuLogOut className="text-base" />
            <span>{isSigningOut ? "Logging out..." : "Logout"}</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
