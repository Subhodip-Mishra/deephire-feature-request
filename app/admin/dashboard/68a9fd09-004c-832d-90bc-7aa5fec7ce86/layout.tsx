// app/layout.tsx (Next.js 13+ App Router)
// OR components/Layout.tsx if you're in Pages Router

import React from "react";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          inter.className,
          "h-full bg-neutral-950 text-neutral-200 antialiased"
        )}
      >
        <div className="flex h-screen flex-col">
          {/* Top Navbar */}
          <header className="h-14 border-b border-neutral-800 bg-neutral-900 px-6 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-white">Deephireai feature-request</h1>
            <div className="flex items-center gap-3">
              <button className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm text-neutral-200">
                Settings
              </button>
              <button className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm text-white">
                Logout
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-neutral-950">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>

          {/* Footer */}
          <footer className="h-12 border-t border-neutral-800 bg-neutral-900 flex items-center justify-center text-sm text-neutral-400">
            © {new Date().getFullYear()} Deephireai feature-reqeust. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
