import EventCardSkeleton from "@/components/EventCardSkeleton";

export default function EventsLoading() {
  return (
    <div className="min-h-screen bg-base-200/30 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner Skeleton */}
        <div className="bg-base-100 border border-base-300 rounded-3xl p-8 lg:p-10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-pulse">
          <div className="space-y-3 max-w-2xl w-full">
            <div className="h-6 w-36 bg-base-300 skeleton rounded-full"></div>
            <div className="h-10 w-3/4 bg-base-300 skeleton rounded-xl"></div>
            <div className="h-4 w-full bg-base-300 skeleton rounded-md"></div>
          </div>
          <div className="h-12 w-44 bg-base-300 skeleton rounded-xl shrink-0"></div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="bg-base-100 p-4 sm:p-6 rounded-3xl border border-base-300 shadow-xs space-y-4">
          <div className="h-12 w-full bg-base-300 skeleton rounded-2xl"></div>
          <div className="flex gap-2 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-24 bg-base-300 skeleton rounded-full shrink-0"></div>
            ))}
          </div>
        </div>

        {/* 6 Grid Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <EventCardSkeleton key={idx} />
          ))}
        </div>

      </div>
    </div>
  );
}
