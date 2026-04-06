export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      {/* Header skeleton */}
      <div className="mb-10">
        <div className="h-4 w-32 bg-zinc-800 rounded mb-3" />
        <div className="h-8 w-64 bg-zinc-800 rounded mb-2" />
        <div className="h-4 w-48 bg-zinc-800 rounded" />
      </div>

      {/* Session cards skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-32"
          />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-6 py-4 border-b border-zinc-800/50"
          >
            <div className="h-4 w-6 bg-zinc-800 rounded" />
            <div className="h-4 w-8 bg-zinc-800 rounded" />
            <div className="h-4 w-32 bg-zinc-800 rounded" />
            <div className="h-4 w-28 bg-zinc-800 rounded" />
            <div className="ml-auto h-4 w-16 bg-zinc-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
