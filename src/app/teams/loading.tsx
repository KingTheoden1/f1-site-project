export default function TeamsLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-10">
          <div className="h-12 w-40 bg-zinc-800 rounded-lg animate-pulse mb-3" />
          <div className="h-5 w-96 bg-zinc-800/60 rounded animate-pulse" />
        </div>

        {/* Team card skeletons */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
            >
              <div className="h-1 bg-zinc-700 animate-pulse" />
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-8 bg-zinc-800 rounded animate-pulse" />
                    <div>
                      <div className="h-6 w-32 bg-zinc-800 rounded animate-pulse mb-1" />
                      <div className="h-4 w-56 bg-zinc-800/60 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-8 w-16 bg-zinc-800 rounded animate-pulse mb-1" />
                    <div className="h-3 w-12 bg-zinc-800/60 rounded animate-pulse" />
                  </div>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full mb-5 animate-pulse" />
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="h-16 bg-zinc-800/40 rounded-lg animate-pulse" />
                  <div className="h-16 bg-zinc-800/40 rounded-lg animate-pulse" />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div
                      key={j}
                      className={`h-16 bg-zinc-800/30 rounded-lg animate-pulse ${
                        j === 3 ? "hidden sm:block" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
