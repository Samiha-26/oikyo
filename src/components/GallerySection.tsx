import Image from "next/image";
import { LuCamera, LuMapPin, LuHeart } from "react-icons/lu";

export default function GallerySection() {
  const photos = [
    {
      src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
      title: "Night Warmth Distribution",
      location: "Mirpur 10 Roundabout, Dhaka",
      tag: "Winter Relief",
      span: "md:col-span-2 md:row-span-2",
      height: "h-80 md:h-full",
    },
    {
      src: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
      title: "Pediatric Health Checkup",
      location: "Rayer Bazar, Dhaka",
      tag: "Free Medical Camp",
      span: "col-span-1",
      height: "h-64",
    },
    {
      src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
      title: "Mangrove Sapling Planting",
      location: "Shyamnagar, Satkhira",
      tag: "Climate Resilience",
      span: "col-span-1",
      height: "h-64",
    },
    {
      src: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80",
      title: "Canal Plastic Interception",
      location: "Ashulia Beribadh, Dhaka",
      tag: "Clean Water",
      span: "col-span-1",
      height: "h-64",
    },
    {
      src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
      title: "School Supplies & Warm Vests",
      location: "Sreemangal, Moulvibazar",
      tag: "Youth & Education",
      span: "col-span-1",
      height: "h-64",
    },
  ];

  return (
    <section className="py-20 bg-base-200/50 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <LuCamera className="text-sm" />
              <span>Documented Field Operations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
              Civic Action in the Field
            </h2>
            <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
              Every completed event includes photographic audit logs submitted by verified local coordinators, ensuring 100% accountability to volunteers and supporters.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-base-content/70 bg-base-100 px-4 py-2 rounded-xl border border-base-300 shadow-2xs self-start md:self-auto">
            <LuHeart className="text-error" />
            <span>Over 350+ Documented Field Missions</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl overflow-hidden border border-base-300 bg-base-300/40 shadow-xs ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5 text-white transition-opacity duration-300">
                <span className="inline-block self-start text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full mb-2">
                  {item.tag}
                </span>
                <h3 className="font-serif text-lg font-bold leading-snug">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-white/80 mt-1">
                  <LuMapPin className="text-accent text-xs shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
