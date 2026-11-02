import Link from "next/link";
import { LuArrowLeft, LuSearch, LuHouse, LuCompass, LuSparkles, LuCalendar } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-base-200/40 flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="max-w-xl w-full text-center space-y-8 bg-base-100 rounded-3xl border border-base-300 p-8 sm:p-12 shadow-xs">
        
        {/* Error Badge & Icon */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-error/10 text-error text-xs font-bold uppercase tracking-wider">
            <LuCompass className="text-sm" />
            <span>Error 404 • Uncharted Route</span>
          </div>

          <div className="relative">
            <h1 className="font-serif text-7xl sm:text-8xl font-black text-base-content/20 tracking-tighter select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-base-content tracking-tight">
                Civic Route Not Found
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-base-content/75 leading-relaxed max-w-md mx-auto">
            The humanitarian operation or district page you are seeking may have been completed, archived, or moved to another ward.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="btn btn-primary w-full sm:w-auto px-6 font-semibold shadow-xs flex items-center justify-center gap-2 rounded-xl"
          >
            <LuHouse className="text-base" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/events"
            className="btn btn-outline border-base-300 hover:bg-base-200 w-full sm:w-auto px-6 font-semibold flex items-center justify-center gap-2 rounded-xl"
          >
            <LuCalendar className="text-base text-primary" />
            <span>Explore Active Drives</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-6 border-t border-base-200 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-base-content/50">
            Popular Action Sectors
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              "Winter Clothing Relief",
              "Medical Aid Camps",
              "Turag River Cleanup",
              "Coastal Mangrove Plantation",
            ].map((sector, i) => (
              <Link
                key={i}
                href="/events"
                className="badge badge-ghost hover:badge-primary text-xs font-medium py-3 px-3.5 transition-colors"
              >
                {sector}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
