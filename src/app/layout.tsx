import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "F1 Pulse — Live F1 Data & Insights",
  description:
    "Your Formula 1 companion. Live race data, championship standings, circuit breakdowns, and strategy insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">F1</span>
              </div>
              <span className="text-sm text-zinc-500">
                F1 Pulse — Not affiliated with Formula 1
              </span>
            </div>
            <p className="text-xs text-zinc-600">
              Data provided by Jolpica API
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
