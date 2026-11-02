'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { LuMapPin, LuChevronDown, LuCirclePlus, LuSlidersHorizontal, LuCalendarCheck, LuLogOut, LuSun, LuMoon } from "react-icons/lu";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [theme, setTheme] = useState("oikyo-light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("oikyo-theme") || "oikyo-light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "oikyo-light" ? "oikyo-dark" : "oikyo-light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("oikyo-theme", nextTheme);
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully!");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-base-100/90 backdrop-blur-md border-b border-base-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              ঐ
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-primary leading-none">
                Oikyo <span className="text-base font-normal text-base-content/70">(ঐক্য)</span>
              </span>
              <span className="text-[10px] font-semibold text-secondary tracking-wider uppercase mt-0.5">
                Bangladesh Grassroots Coalition
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-2 bg-base-200 px-3.5 py-1.5 rounded-full text-xs text-base-content">
            <LuMapPin className="text-primary text-sm shrink-0" />
            <span className="font-bold">Dhaka Metro:</span>
            <span className="text-base-content/70 truncate max-w-[190px]">
              Mirpur 10, Dhanmondi, Mohammadpur
            </span>
            <LuChevronDown className="text-xs text-secondary" />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
              pathname === "/" ? "bg-primary text-primary-content" : "text-base-content/80 hover:bg-base-200"
            }`}
          >
            Home
          </Link>
          <Link
            href="/events"
            className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
              pathname.startsWith("/events") ? "bg-primary text-primary-content" : "text-base-content/80 hover:bg-base-200"
            }`}
          >
            Upcoming Events
          </Link>
          <Link
            href="/impact-map"
            className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
              pathname === "/impact-map" ? "bg-primary text-primary-content" : "text-base-content/80 hover:bg-base-200"
            }`}
          >
            Impact Map
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm text-base-content"
            aria-label="Toggle theme"
          >
            {theme === "oikyo-light" ? <LuMoon className="text-base" /> : <LuSun className="text-base text-warning" />}
          </button>

          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-16 h-8 bg-base-300 animate-pulse rounded-lg"></div>
            </div>
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="tooltip tooltip-bottom flex items-center gap-2 p-1 rounded-full hover:bg-base-200 transition-colors cursor-pointer"
                data-tip={session.user.name || "Volunteer Account"}
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User avatar"}
                    width={36}
                    height={36}
                    unoptimized
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/30"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm">
                    {session.user.name?.charAt(0).toUpperCase() || "V"}
                  </div>
                )}
                <LuChevronDown className="text-xs text-base-content/60 hidden sm:block" />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content z-50 menu p-2 shadow-xl bg-base-100 rounded-2xl mt-3 w-60 border border-base-200"
              >
                <li className="menu-title px-3 py-2 border-b border-base-200">
                  <span className="text-xs text-base-content/60 font-normal">Signed in as</span>
                  <span className="text-sm font-bold text-base-content truncate">
                    {session.user.email}
                  </span>
                </li>

                <li className="mt-1">
                  <Link href="/create-event" className="flex items-center justify-between text-xs font-semibold py-2">
                    <span className="flex items-center gap-2">
                      <LuCirclePlus className="text-primary text-base" />
                      Create Event
                    </span>
                    <span className="badge badge-primary badge-xs">Private</span>
                  </Link>
                </li>
                <li>
                  <Link href="/manage-events" className="flex items-center justify-between text-xs font-semibold py-2">
                    <span className="flex items-center gap-2">
                      <LuSlidersHorizontal className="text-secondary text-base" />
                      Manage Events
                    </span>
                    <span className="badge badge-ghost badge-xs">Owner</span>
                  </Link>
                </li>
                <li>
                  <Link href="/joined-events" className="flex items-center justify-between text-xs font-semibold py-2">
                    <span className="flex items-center gap-2">
                      <LuCalendarCheck className="text-accent text-base" />
                      Joined Events
                    </span>
                    <span className="badge badge-accent badge-xs">Volunteer</span>
                  </Link>
                </li>

                <div className="divider my-1"></div>

                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-xs font-semibold text-error hover:bg-error/10 py-2"
                  >
                    <LuLogOut className="text-base" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="btn btn-ghost btn-sm text-xs font-bold text-primary hover:bg-base-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="btn btn-primary btn-sm text-xs font-bold shadow-sm"
              >
                Join Oikyo
              </Link>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
