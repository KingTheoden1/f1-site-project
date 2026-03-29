export default function CircuitsLoading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center space-y-4">
            <div className="h-5 w-32 bg-zinc-800 rounded-full mx-auto animate-pulse" />
            <div className="h-10 w-64 bg-zinc-800 rounded-lg mx-auto animate-pulse" />
            <div className="h-5 w-80 bg-zinc-800 rounded-lg mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-8 justify-center">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-8 w-24 bg-zinc-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4"
            >
              <div className="flex justify-between">
                <div className="h-5 w-14 bg-zinc-800 rounded animate-pulse" />
                <div className="h-5 w-16 bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="h-6 w-48 bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-36 bg-zinc-800 rounded animate-pulse" />
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((j) => (
                  <div
                    key={j}
                    className="h-12 bg-zinc-800 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
