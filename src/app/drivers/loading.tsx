export default function DriversLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-10">
          <div className="h-12 w-44 bg-zinc-800 rounded-lg animate-pulse mb-3" />
          <div className="h-5 w-96 bg-zinc-800/60 rounded animate-pulse" />
        </div>

        {/* Card grid skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden"
            >
              <div className="h-1 bg-zinc-700 animate-pulse" />
              <div className="h-52 sm:h-60 bg-zinc-800/40 animate-pulse" />
              <div className="p-4">
                <div className="h-6 w-32 bg-zinc-800 rounded animate-pulse mb-1" />
                <div className="h-4 w-20 bg-zinc-800/60 rounded animate-pulse mb-3" />
                <div className="h-4 w-28 bg-zinc-800/40 rounded animate-pulse mb-2" />
                <div className="h-3 w-full bg-zinc-800/30 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
