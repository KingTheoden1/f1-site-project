export default function CircuitDetailLoading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse mb-6" />
          <div className="space-y-3">
            <div className="h-8 w-72 bg-zinc-800 rounded animate-pulse" />
            <div className="h-5 w-48 bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-36 bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-2"
            >
              <div className="h-3 w-12 bg-zinc-800 rounded animate-pulse" />
              <div className="h-6 w-16 bg-zinc-800 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Text sections skeleton */}
        {[1, 2].map((i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-48 bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-zinc-800 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
