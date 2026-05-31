import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="text-center max-w-lg px-4">
        <div className="text-8xl font-display font-bold text-slate-100 leading-none mb-4 select-none">
          404
        </div>
        <div className="w-12 h-1 bg-teal-500 rounded-full mx-auto mb-6" />
        <h1 className="text-2xl font-display font-bold text-slate-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-500 mb-8">
          The page you are looking for does not exist or has been moved.
          Try searching or return to the homepage.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/grants/open-calls" className="btn-outline">
            View Open Calls
          </Link>
        </div>
      </div>
    </div>
  );
}
