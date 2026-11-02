import Link from "next/link";
import Image from "next/image";
import { LuArrowRight, LuCirclePlus, LuPackage, LuFlag, LuClock, LuShieldCheck } from "react-icons/lu";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-base-200/60 py-16 lg:py-24 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2.5 bg-base-100 px-4 py-2 rounded-full border border-base-300 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Dhaka & 64 Districts Active
            </span>
            <span className="text-base-content/30 text-xs">/</span>
            <span className="text-xs text-base-content/70">
              Winter Cold-Wave Mobilization
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-base-content leading-[1.12]">
            Empowering Civic Solidarity Across Every Ward & District.
          </h1>

          <p className="text-base sm:text-lg text-base-content/75 max-w-2xl leading-relaxed">
            Oikyo (ঐক্য) connects neighborhood volunteer coalitions to direct humanitarian logistics: delivering winter warmth to tea-garden laborers, setting up free slum dispensaries, and stewarding urban green corridors without political friction.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/events"
              className="btn btn-primary text-sm font-semibold px-6 shadow-sm flex items-center gap-2"
            >
              <span>Explore Upcoming Events</span>
              <LuArrowRight className="text-base" />
            </Link>
            <Link
              href="/create-event"
              className="btn btn-outline text-sm font-semibold px-6 flex items-center gap-2"
            >
              <LuCirclePlus className="text-base" />
              <span>Organize a Community Drive</span>
            </Link>
          </div>

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-base-300">
            <div className="bg-base-100 p-4 rounded-2xl border border-base-300 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg">
                <LuPackage />
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-base-content tracking-tight">28,450+</div>
                <div className="text-[11px] font-semibold text-base-content/60 uppercase tracking-wider">Units Distributed</div>
              </div>
            </div>

            <div className="bg-base-100 p-4 rounded-2xl border border-base-300 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-lg">
                <LuFlag />
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-base-content tracking-tight">154</div>
                <div className="text-[11px] font-semibold text-base-content/60 uppercase tracking-wider">Active Drives</div>
              </div>
            </div>

            <div className="bg-base-100 p-4 rounded-2xl border border-base-300 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center text-lg">
                <LuClock />
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-base-content tracking-tight">14,200+</div>
                <div className="text-[11px] font-semibold text-base-content/60 uppercase tracking-wider">Volunteer Hours</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-base-300 bg-base-100">
            <Image
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
              alt="Community volunteers packing winter relief supplies"
              width={800}
              height={500}
              className="w-full h-[400px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-accent badge-sm font-bold uppercase tracking-wider">
                  Active In Mirpur
                </span>
                <span className="text-xs text-white/80">Batch #402 Cold Dispatch</span>
              </div>
              <h3 className="font-serif text-lg font-bold leading-snug">
                Roving Night Thermal Patrols for Street Dwellers
              </h3>
              <p className="text-xs text-white/80 mt-1">
                Dispatched nightly from Mirpur 10 roundabout to Gabtoli terminal perimeter.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 bg-base-100 p-4 rounded-2xl shadow-lg border border-base-300 hidden sm:flex items-center gap-3.5 max-w-xs">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 text-xl">
              <LuShieldCheck />
            </div>
            <div className="text-xs">
              <span className="font-bold text-base-content block">Zero Duplicate Relief</span>
              <span className="text-base-content/70">Geo-verified delivery prevents overlapped donations across wards.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
