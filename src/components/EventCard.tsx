import Link from "next/link";
import Image from "next/image";
import { LuCalendar, LuMapPin, LuUsers, LuArrowRight, LuShieldCheck } from "react-icons/lu";

export interface EventItem {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  district?: string;
  image: string;
  volunteersNeeded: number;
  volunteersJoined: number;
  creatorName: string;
  creatorEmail?: string;
  creatorImage?: string;
  status?: string;
}

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  const eventId = event._id || event.id || "";
  const total = event.volunteersNeeded || 1;
  const joined = event.volunteersJoined || 0;
  const percentage = Math.min(Math.round((joined / total) * 100), 100);
  const isFull = joined >= total;

  return (
    <article className="group bg-base-100 rounded-2xl border border-base-300 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative aspect-16/9 w-full overflow-hidden bg-base-200">
          <Image
            src={event.image || "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-base-100/90 backdrop-blur-md px-3 py-1 rounded-full border border-base-300/80 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="text-[11px] font-bold tracking-wide uppercase text-base-content">
              {event.category}
            </span>
          </div>

          {isFull && (
            <div className="absolute top-3 right-3 bg-error/90 text-error-content text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              Roster Full
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-base-content/70 mb-2.5">
            <span className="flex items-center gap-1.5 font-medium">
              <LuCalendar className="text-primary text-sm shrink-0" />
              <span>{event.date}</span>
            </span>
            <span className="text-base-content/30">•</span>
            <span className="flex items-center gap-1.5 font-medium truncate">
              <LuMapPin className="text-accent text-sm shrink-0" />
              <span className="truncate">{event.location}</span>
            </span>
          </div>

          <Link href={`/events/${eventId}`}>
            <h3 className="font-serif text-lg font-bold text-base-content group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
              {event.title}
            </h3>
          </Link>

          <p className="text-xs text-base-content/75 line-clamp-2 leading-relaxed mb-4">
            {event.description}
          </p>

          <div className="space-y-1.5 pt-3 border-t border-base-200">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-base-content/70 font-medium">
                <LuUsers className="text-primary text-sm" />
                <span>Volunteer Quota</span>
              </span>
              <span className="font-bold text-base-content">
                {joined}/{total} <span className="font-normal text-base-content/60">({percentage}%)</span>
              </span>
            </div>
            <div className="w-full bg-base-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentage >= 100 ? "bg-error" : percentage >= 75 ? "bg-warning" : "bg-primary"
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-base-200/80 mt-auto">
        <div className="flex items-center gap-2">
          {event.creatorImage ? (
            <Image
              src={event.creatorImage}
              alt={event.creatorName}
              width={26}
              height={26}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
              {event.creatorName?.charAt(0) || "O"}
            </div>
          )}
          <span className="text-xs font-semibold text-base-content/80 flex items-center gap-1">
            <span className="truncate max-w-[110px]">{event.creatorName}</span>
            <LuShieldCheck className="text-primary text-xs shrink-0" />
          </span>
        </div>

        <Link
          href={`/events/${eventId}`}
          className="btn btn-primary btn-xs px-3 font-semibold gap-1.5 shadow-2xs"
        >
          <span>View Event</span>
          <LuArrowRight className="text-xs" />
        </Link>
      </div>
    </article>
  );
}
