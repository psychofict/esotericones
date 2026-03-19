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
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <p className="text-[#E8385D] uppercase tracking-[0.3em] text-sm font-medium mb-4">
          Something went wrong
        </p>
        <h1 className="text-5xl font-bold text-foreground mb-4">Oops</h1>
        <p className="text-text-secondary text-lg mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#E8385D] text-white rounded-full font-medium hover:bg-[#FF4D73] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-border text-foreground rounded-full font-medium hover:bg-subtle/5 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
