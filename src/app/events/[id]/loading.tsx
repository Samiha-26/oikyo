export default function EventDetailsLoading() {
  return (
    <div className="min-h-screen bg-base-200/30 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Details Skeleton */}
          <div className="lg:col-span-8 bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-10 shadow-xs space-y-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="h-6 w-28 bg-base-300 skeleton rounded-full"></div>
              <div className="h-4 w-36 bg-base-300 skeleton rounded-md"></div>
            </div>

            <div className="space-y-2">
              <div className="h-9 w-4/5 bg-base-300 skeleton rounded-xl"></div>
              <div className="h-9 w-3/5 bg-base-300 skeleton rounded-xl"></div>
            </div>

            <div className="relative aspect-16/9 w-full bg-base-300 skeleton rounded-2xl"></div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-base-200 skeleton rounded-2xl p-4"></div>
              ))}
            </div>

            <div className="space-y-3 pt-4">
              <div className="h-5 w-40 bg-base-300 skeleton rounded-md"></div>
              <div className="h-4 w-full bg-base-300 skeleton rounded-md"></div>
              <div className="h-4 w-5/6 bg-base-300 skeleton rounded-md"></div>
              <div className="h-4 w-2/3 bg-base-300 skeleton rounded-md"></div>
            </div>
          </div>

          {/* Roster Card Skeleton */}
          <div className="lg:col-span-4 bg-base-100 rounded-3xl border border-base-300 p-6 sm:p-8 shadow-xs space-y-6 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-4 w-28 bg-base-300 skeleton rounded-md"></div>
              <div className="h-4 w-16 bg-base-300 skeleton rounded-md"></div>
            </div>
            <div className="h-3 w-full bg-base-300 skeleton rounded-full"></div>
            <div className="h-12 w-full bg-base-300 skeleton rounded-xl"></div>
            <div className="pt-4 space-y-3 border-t border-base-200">
              <div className="h-4 w-32 bg-base-300 skeleton rounded-md"></div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-base-200 skeleton rounded-2xl"></div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
