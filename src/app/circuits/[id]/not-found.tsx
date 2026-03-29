import Link from "next/link";

export default function CircuitNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-white mb-2">Circuit Not Found</h1>
      <p className="text-zinc-500 mb-6">
        The circuit you&apos;re looking for doesn&apos;t exist on the 2026
        calendar.
      </p>
      <Link
        href="/circuits"
        className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
      >
        Back to Track Atlas
      </Link>
    </div>
  );
}
