import Image from "next/image";
import { LuCalendar, LuMapPin, LuUsers, LuSparkles, LuShieldCheck } from "react-icons/lu";

interface PreviewData {
  title: string;
  category: string;
  date: string;
  location: string;
  district: string;
  image: string;
  volunteersNeeded: number;
  description: string;
  creatorName: string;
}

interface EventPreviewCardProps {
  data: PreviewData;
}

export default function EventPreviewCard({ data }: EventPreviewCardProps) {
  const displayTitle = data.title.trim() || "Your Event Title Will Appear Here";
  const displayCategory = data.category || "Winter Clothing";
  const displayDate = data.date || "YYYY-MM-DD";
  const displayLocation = data.location.trim() || (data.district ? `${data.district}, Bangladesh` : "Event Location");
  const displayDescription =
    data.description.trim() ||
    "Provide clear context about your humanitarian drive: meeting locations, recipient communities, and volunteer duties.";
  const displayImage =
    data.image.trim() ||
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80";
  const displayQuota = Number(data.volunteersNeeded) || 25;
  const displayCreator = data.creatorName.trim() || "Community Organizer";

  return (
    <div className="bg-base-100 rounded-3xl border border-base-300 p-6 shadow-xs space-y-4 sticky top-24">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          <LuSparkles className="text-sm" />
          <span>Live Card Preview</span>
        </div>
        <span className="text-[11px] text-base-content/60 font-medium">Updates in real-time</span>
      </div>

      <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden shadow-xs flex flex-col justify-between">
        <div>
          <div className="relative aspect-16/9 w-full overflow-hidden bg-base-200">
            <Image
              src={displayImage}
              alt={displayTitle}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-base-100/90 backdrop-blur-md px-3 py-1 rounded-full border border-base-300/80 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="text-[11px] font-bold tracking-wide uppercase text-base-content">
                {displayCategory}
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 text-xs text-base-content/70 mb-2">
              <span className="flex items-center gap-1.5 font-medium">
                <LuCalendar className="text-primary text-sm shrink-0" />
                <span>{displayDate}</span>
              </span>
              <span className="text-base-content/30">•</span>
              <span className="flex items-center gap-1.5 font-medium truncate">
                <LuMapPin className="text-accent text-sm shrink-0" />
                <span className="truncate">{displayLocation}</span>
              </span>
            </div>

            <h3 className="font-serif text-lg font-bold text-base-content leading-snug line-clamp-2 mb-2">
              {displayTitle}
            </h3>

            <p className="text-xs text-base-content/75 line-clamp-2 leading-relaxed mb-4">
              {displayDescription}
            </p>

            <div className="space-y-1.5 pt-3 border-t border-base-200">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-base-content/70 font-medium">
                  <LuUsers className="text-primary text-sm" />
                  <span>Target Volunteer Quota</span>
                </span>
                <span className="font-bold text-base-content">
                  0/{displayQuota} <span className="font-normal text-base-content/60">(0%)</span>
                </span>
              </div>
              <div className="w-full bg-base-200 rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full w-[4%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-base-200/80">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
              {displayCreator.charAt(0)}
            </div>
            <span className="text-xs font-semibold text-base-content/80 flex items-center gap-1">
              <span className="truncate max-w-[120px]">{displayCreator}</span>
              <LuShieldCheck className="text-primary text-xs shrink-0" />
            </span>
          </div>

          <span className="badge badge-primary badge-outline badge-xs font-semibold px-2">
            Pending Dispatch
          </span>
        </div>
      </div>
    </div>
  );
}
