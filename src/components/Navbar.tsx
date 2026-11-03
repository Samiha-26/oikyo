'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { LuSun, LuMoon } from "react-icons/lu";
import UserAvatarDropdown from "@/components/UserAvatarDropdown";

export default function Navbar() {
  const pathname = usePathname();
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
          ) : session?.user ? (
            <UserAvatarDropdown user={session.user} />
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
