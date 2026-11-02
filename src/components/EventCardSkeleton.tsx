export default function EventCardSkeleton() {
  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden shadow-xs flex flex-col justify-between animate-pulse">
      <div>
        <div className="relative aspect-16/9 w-full bg-base-300 skeleton rounded-none"></div>

        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-24 bg-base-300 skeleton rounded-md"></div>
            <div className="h-4 w-2 bg-base-300 skeleton rounded-full"></div>
            <div className="h-4 w-32 bg-base-300 skeleton rounded-md"></div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="h-5 w-full bg-base-300 skeleton rounded-md"></div>
            <div className="h-5 w-4/5 bg-base-300 skeleton rounded-md"></div>
          </div>

          <div className="space-y-1 pt-1">
            <div className="h-3.5 w-full bg-base-300 skeleton rounded-md"></div>
            <div className="h-3.5 w-2/3 bg-base-300 skeleton rounded-md"></div>
          </div>

          <div className="pt-2 space-y-1.5">
            <div className="flex justify-between items-center">
              <div className="h-3 w-28 bg-base-300 skeleton rounded-md"></div>
              <div className="h-3 w-10 bg-base-300 skeleton rounded-md"></div>
            </div>
            <div className="w-full bg-base-300 skeleton rounded-full h-2"></div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-base-200 mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-base-300 skeleton shrink-0"></div>
          <div className="h-3.5 w-24 bg-base-300 skeleton rounded-md"></div>
        </div>
        <div className="h-7 w-20 bg-base-300 skeleton rounded-lg"></div>
      </div>
    </div>
  );
}
