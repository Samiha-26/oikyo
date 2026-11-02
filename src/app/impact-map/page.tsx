import type { Metadata } from "next";
import Link from "next/link";
import { LuTrophy, LuFlame, LuArrowRight, LuCirclePlus } from "react-icons/lu";
import DistrictImpactMap from "@/components/impact/DistrictImpactMap";
import DivisionLeaderboard from "@/components/impact/DivisionLeaderboard";

export const metadata: Metadata = {
  title: "Impact Tracker & Leaderboard | Oikyo Grassroots Coalition",
  description: "Track verified humanitarian relief distribution, volunteer hours, and division rankings across all 64 districts in Bangladesh.",
};

export default function ImpactMapPage() {
  return (
    <div className="min-h-screen bg-base-200/30 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="bg-linear-to-r from-accent/10 via-base-100 to-primary/10 border border-base-300 rounded-3xl p-8 lg:p-10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
              <LuFlame className="text-sm" />
              <span>National Civic Ledger</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content tracking-tight">
              Impact Tracker & Division Leaderboard
            </h1>
            <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
              Real-time audit of field operations across Bangladesh. Inspect district-level volunteer mobilization, packages delivered, and verified grassroots coordination hubs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/events"
              className="btn btn-outline btn-sm px-5 font-semibold"
            >
              <span>Explore Events</span>
              <LuArrowRight className="text-sm" />
            </Link>
            <Link
              href="/create-event"
              className="btn btn-primary btn-sm px-5 font-semibold shadow-xs inline-flex items-center gap-2"
            >
              <LuCirclePlus className="text-base" />
              <span>Organize a Drive</span>
            </Link>
          </div>
        </div>

        <DistrictImpactMap />

        <DivisionLeaderboard />

      </div>
    </div>
  );
}
