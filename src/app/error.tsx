"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <p className="text-[#F39C12] uppercase tracking-[0.3em] text-sm font-medium mb-4">
          Something went wrong
        </p>
        <h1 className="text-5xl font-bold text-[#1A1A2E] mb-4">Oops</h1>
        <p className="text-[#1A1A2E]/60 text-lg mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#2E86DE] text-white rounded-full font-medium hover:bg-[#1B5E8A] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-200 text-[#1A1A2E] rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
