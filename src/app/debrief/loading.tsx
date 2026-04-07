export default function DebriefLoading() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-16 pb-16 animate-pulse">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-4 w-24 bg-zinc-800 rounded mb-4" />
        <div className="h-10 w-56 bg-zinc-800 rounded mb-3" />
        <div className="h-5 w-96 bg-zinc-800/60 rounded mb-12" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="mb-8">
            <div className="h-6 w-40 bg-zinc-800 rounded mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="h-24 bg-zinc-900 border border-zinc-800 rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
