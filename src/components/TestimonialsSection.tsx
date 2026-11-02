import Image from "next/image";
import { LuQuote, LuStar, LuShieldCheck, LuMapPin } from "react-icons/lu";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  district: string;
  quote: string;
  image: string;
  rating: number;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Dr. Farhana Yasmin",
    role: "Community Health Physician",
    location: "Rayer Bazar, Dhaka",
    district: "Dhaka",
    quote: "Mobilizing pediatric triage in informal settlements used to take dozens of phone calls. Through Oikyo, our medical volunteer roster was fully coordinated in under four hours with verified supplies.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    highlight: "18 Volunteers Mobilized",
  },
  {
    name: "Tanvir Ahmed",
    role: "Winter Relief Coordinator",
    location: "Tetulia Upazila, Panchagarh",
    district: "Panchagarh",
    quote: "When temperatures plummeted below 8°C in northern Bangladesh, transparent volunteer quota tracking ensured zero duplicate distributions and reached agrarian families who needed thermal blankets most.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    highlight: "350+ Thermal Kits Dispatched",
  },
  {
    name: "Nafis Imtiaz",
    role: "Urban Ecological Activist",
    location: "Chawkbazar Heritage Canal",
    district: "Dhaka",
    quote: "Our weekend canal cleanup went from a spontaneous social post to a fully organized environmental drive with safety briefings, equipment checks, and twenty dedicated university volunteers.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    highlight: "1.2 Tons Plastic Intercepted",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-base-100 border-b border-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <LuQuote className="text-sm" />
            <span>Voices from the Frontlines</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
            Trusted by Grassroots Organizers
          </h2>
          <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
            See how neighborhood leaders, physicians, and civic volunteers coordinate verified social relief across Bangladesh without political friction.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-base-200/40 rounded-3xl border border-base-300 p-8 flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Rating & Highlight */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-warning text-xs">
                    {[...Array(t.rating)].map((_, i) => (
                      <LuStar key={i} className="fill-warning" />
                    ))}
                  </div>
                  <span className="badge badge-primary badge-outline badge-xs font-bold">
                    {t.highlight}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-base-content/80 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-base-300/60 mt-6 flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-sm text-base-content truncate">
                      {t.name}
                    </span>
                    <LuShieldCheck className="text-primary text-xs shrink-0" title="Verified Organizer" />
                  </div>
                  <div className="text-[11px] text-base-content/60 truncate">
                    {t.role}
                  </div>
                  <div className="text-[10px] text-accent font-semibold flex items-center gap-1 mt-0.5">
                    <LuMapPin className="text-[10px] shrink-0" />
                    <span className="truncate">{t.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
