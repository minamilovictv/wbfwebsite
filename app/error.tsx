"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[App Error]", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="text-center max-w-lg px-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-display font-bold text-slate-900 mb-3">
          Something went wrong
        </h1>
        <p className="text-slate-500 mb-8 text-sm">
          An unexpected error occurred. Our team has been notified.
          {error.digest && (
            <span className="block mt-1 font-mono text-xs text-slate-400">
              Error ID: {error.digest}
            </span>
          )}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link href="/" className="btn-outline">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
