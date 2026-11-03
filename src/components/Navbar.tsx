'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import {
  LuSun,
  LuMoon,
  LuMenu,
  LuX,
  LuHouse,
  LuCalendar,
  LuMapPin,
  LuCirclePlus,
  LuSlidersHorizontal,
  LuCalendarCheck,
} from "react-icons/lu";
import UserAvatarDropdown from "@/components/UserAvatarDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [theme, setTheme] = useState("oikyo-light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("oikyo-theme") || "oikyo-light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === "oikyo-light" ? "oikyo-dark" : "oikyo-light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("oikyo-theme", nextTheme);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-base-100/90 backdrop-blur-md border-b border-base-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              ঐ
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-primary leading-none">
                Oikyo <span className="text-sm sm:text-base font-normal text-base-content/70">(ঐক্য)</span>
              </span>
              <span className="text-[10px] font-semibold text-secondary tracking-wider uppercase mt-0.5 hidden sm:block">
                Bangladesh Grassroots Coalition
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
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

        {/* Actions & Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-3">
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
          ) : session?.user ? (
            <UserAvatarDropdown user={session.user} />
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/signin"
                className="btn btn-ghost btn-xs sm:btn-sm text-xs font-bold text-primary hover:bg-base-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hidden sm:inline-flex btn btn-primary btn-sm text-xs font-bold shadow-sm"
              >
                Join Oikyo
              </Link>
            </div>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="btn btn-ghost btn-circle btn-sm md:hidden text-base-content"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? (
              <LuX className="text-xl" />
            ) : (
              <LuMenu className="text-xl" />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-base-200 bg-base-100/98 backdrop-blur-xl px-4 py-4 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                pathname === "/" ? "bg-primary text-primary-content" : "text-base-content/80 hover:bg-base-200"
              }`}
            >
              <LuHouse className="text-base" />
              <span>Home</span>
            </Link>
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                pathname.startsWith("/events") ? "bg-primary text-primary-content" : "text-base-content/80 hover:bg-base-200"
              }`}
            >
              <LuCalendar className="text-base" />
              <span>Upcoming Events</span>
            </Link>
            <Link
              href="/impact-map"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                pathname === "/impact-map" ? "bg-primary text-primary-content" : "text-base-content/80 hover:bg-base-200"
              }`}
            >
              <LuMapPin className="text-base" />
              <span>Impact Map</span>
            </Link>
          </nav>

          {/* Quick links for logged-in users on mobile */}
          {session?.user && (
            <div className="pt-2 border-t border-base-200 flex flex-col space-y-1">
              <span className="text-[11px] font-bold text-base-content/50 uppercase tracking-wider px-3.5 py-1">
                Organizer & Volunteer Hub
              </span>
              <Link
                href="/create-event"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 text-sm font-semibold rounded-xl text-base-content/80 hover:bg-base-200"
              >
                <span className="flex items-center gap-3">
                  <LuCirclePlus className="text-primary text-base" />
                  <span>Create Event</span>
                </span>
                <span className="badge badge-primary badge-xs font-bold">New</span>
              </Link>
              <Link
                href="/manage-events"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 text-sm font-semibold rounded-xl text-base-content/80 hover:bg-base-200"
              >
                <span className="flex items-center gap-3">
                  <LuSlidersHorizontal className="text-secondary text-base" />
                  <span>Manage Events</span>
                </span>
                <span className="badge badge-ghost badge-xs">Host</span>
              </Link>
              <Link
                href="/joined-events"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 text-sm font-semibold rounded-xl text-base-content/80 hover:bg-base-200"
              >
                <span className="flex items-center gap-3">
                  <LuCalendarCheck className="text-accent text-base" />
                  <span>Joined Events</span>
                </span>
                <span className="badge badge-accent badge-xs font-bold">Roster</span>
              </Link>
            </div>
          )}

          {/* Unauthenticated action buttons */}
          {!isPending && !session?.user && (
            <div className="pt-2 border-t border-base-200 grid grid-cols-2 gap-2">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-outline btn-sm font-bold w-full rounded-xl"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary btn-sm font-bold w-full rounded-xl shadow-xs"
              >
                Join Oikyo
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
