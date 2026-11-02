import Link from "next/link";
import { LuArrowRight, LuSparkles } from "react-icons/lu";
import EventCard, { EventItem } from "@/components/EventCard";

const recentEvents: EventItem[] = [
  {
    _id: "6724a1b8c001a1a1a1000001",
    title: "North Bengal Cold-Wave Blanket & Thermal Clothing Relief",
    description: "Emergency thermal gear, heavy blankets, and sweaters for vulnerable agrarian families and day-laborers enduring sub-10°C cold waves.",
    category: "Winter Clothing",
    date: "2026-11-18",
    location: "Tetulia Upazila Complex, Panchagarh",
    district: "Panchagarh",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    volunteersNeeded: 35,
    volunteersJoined: 28,
    creatorName: "Tanvir Ahmed",
    creatorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  },
  {
    _id: "6724a1b8c001a1a1a1000002",
    title: "Rayer Bazar Informal Settlement Free Pediatric Health Camp",
    description: "Distributing basic antibiotics, oral rehydration salts, skin ointments, and medical checkups for under-12 children.",
    category: "Medical Relief",
    date: "2026-11-20",
    location: "Community Center, Rayer Bazar, Dhaka",
    district: "Dhaka",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    volunteersNeeded: 20,
    volunteersJoined: 18,
    creatorName: "Dr. Farhana Yasmin",
    creatorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
  },
  {
    _id: "6724a1b8c001a1a1a1000003",
    title: "Turag River Bank Cleanliness & Plastic Interception Drive",
    description: "Community-driven cleanup along the Turag embankment to intercept single-use plastics and hazardous nylon mesh before flood overflow.",
    category: "Clean Environment",
    date: "2026-11-23",
    location: "Ashulia Beribadh Point, Dhaka",
    district: "Dhaka",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
    volunteersNeeded: 50,
    volunteersJoined: 42,
    creatorName: "Asif Mahmud",
    creatorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  },
  {
    _id: "6724a1b8c001a1a1a1000004",
    title: "Coastal Mangrove & Tidal Salinity Barrier Sapling Planting",
    description: "Planting 1,500 native mangrove saplings along vulnerable riverbanks to combat tidal surge erosion and soil salinization.",
    category: "Tree Planting",
    date: "2026-11-26",
    location: "Shyamnagar Embankment, Satkhira",
    district: "Satkhira",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    volunteersNeeded: 40,
    volunteersJoined: 40,
    creatorName: "Rashidul Islam",
    creatorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  },
  {
    _id: "6724a1b8c001a1a1a1000005",
    title: "Tea Garden Labor Community School Supplies & Warm Vest Dispatch",
    description: "Equipping 200 young primary school students with notebooks, winter vests, backpacks, and solar study lamps.",
    category: "Education & Youth",
    date: "2026-11-29",
    location: "Finlay Tea Division Ground, Sreemangal",
    district: "Moulvibazar",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    volunteersNeeded: 25,
    volunteersJoined: 15,
    creatorName: "Meherun Nesa",
    creatorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
  },
  {
    _id: "6724a1b8c001a1a1a1000006",
    title: "Old Dhaka Heritage Canal Debris Clearance & Bio-Enzyme Treatment",
    description: "Youth volunteer brigade removing urban plastic debris and introducing organic water treatment to clear foul drainage channels.",
    category: "Water Sanitation",
    date: "2026-12-02",
    location: "Chawkbazar Canal Culvert, Dhaka",
    district: "Dhaka",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    volunteersNeeded: 30,
    volunteersJoined: 19,
    creatorName: "Nafis Imtiaz",
    creatorImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
  },
];

export default function RecentEventsSection() {
  return (
    <section className="py-20 bg-base-200/40 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <LuSparkles className="text-sm" />
              <span>Verified Grassroots Mobilization</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
              Upcoming Civic Action Drives
            </h2>
            <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
              Explore 6 prioritized field operations requiring volunteer hands and logistics coordination. All drives feature strict quota limits and zero overhead.
            </p>
          </div>

          <Link
            href="/events"
            className="btn btn-outline btn-primary btn-sm px-5 flex items-center gap-2 self-start md:self-auto shrink-0 shadow-xs"
          >
            <span>Browse All Events</span>
            <LuArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/events"
            className="btn btn-primary px-8 font-semibold shadow-xs inline-flex items-center gap-2"
          >
            <span>Explore All 64-District Drives</span>
            <LuArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
}
