import Link from "next/link";
import { LuCalendar, LuMapPin, LuClock, LuArrowRight, LuTicket, LuCircleX, LuShieldCheck } from "react-icons/lu";

export interface JoinedEventItem {
  _id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  category: string;
  joinedAt?: string;
  userEmail?: string;
  userName?: string;
}

interface JoinedEventCardProps {
  item: JoinedEventItem;
  onCancel: (id: string, title: string) => void;
  isCancelling: boolean;
}

export default function JoinedEventCard({ item, onCancel, isCancelling }: JoinedEventCardProps) {
  return (
    <div className="bg-base-100 rounded-3xl border border-base-300 p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-5">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="badge badge-primary font-bold uppercase tracking-wider text-[11px] px-3 py-1">
            {item.category || "Community Service"}
          </span>

          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-success bg-success/10 px-2.5 py-1 rounded-full border border-success/20">
            <LuShieldCheck className="text-sm" />
            <span>Confirmed Spot</span>
          </div>
        </div>

        <div>
          <Link
            href={`/events/${item.eventId || item._id}`}
            className="font-serif text-xl font-bold text-base-content hover:text-primary transition-colors leading-snug line-clamp-2 block"
          >
            {item.eventTitle}
          </Link>
          <div className="text-[11px] text-base-content/60 mt-1">
            Enlisted into active roster {item.joinedAt ? `on ${new Date(item.joinedAt).toLocaleDateString()}` : "recently"}
          </div>
        </div>

        <div className="space-y-2.5 bg-base-200/50 p-4 rounded-2xl border border-base-300/80 text-xs">
          <div className="flex items-center gap-2 text-base-content">
            <LuCalendar className="text-primary text-sm shrink-0" />
            <span className="font-semibold">{item.eventDate}</span>
          </div>

          <div className="flex items-center gap-2 text-base-content/80">
            <LuClock className="text-accent text-sm shrink-0" />
            <span>08:30 AM Briefing & Distribution</span>
          </div>

          <div className="flex items-center gap-2 text-base-content/80 truncate">
            <LuMapPin className="text-secondary text-sm shrink-0" />
            <span className="truncate">{item.eventLocation}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-base-200 pt-4 gap-3">
        <Link
          href={`/events/${item.eventId || item._id}`}
          className="btn btn-outline btn-sm font-semibold text-xs flex items-center gap-1.5 rounded-xl flex-1"
        >
          <span>View Mission Details</span>
          <LuArrowRight className="text-xs" />
        </Link>

        <button
          onClick={() => onCancel(item._id, item.eventTitle)}
          disabled={isCancelling}
          className="btn btn-ghost btn-sm text-xs font-semibold text-error hover:bg-error/10 rounded-xl px-3"
          title="Release spot for another volunteer"
        >
          <LuCircleX className="text-sm" />
          <span className="hidden sm:inline">Cancel Spot</span>
        </button>
      </div>
    </div>
  );
}
