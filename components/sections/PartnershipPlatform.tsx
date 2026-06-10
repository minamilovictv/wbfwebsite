import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Users, Network, Lightbulb, Globe, ArrowUpRight } from "lucide-react";

// Drop the provided screenshot at public/images/partnership-platform.png
// (or .jpg / .webp) and it will replace the placeholder automatically.
const IMAGE_CANDIDATES = [
  "/images/partnership-platform.png",
  "/images/partnership-platform.jpg",
  "/images/partnership-platform.webp",
];

const benefits = [
  { icon: Users, label: "Find project partners" },
  { icon: Network, label: "Build regional consortiums" },
  { icon: Lightbulb, label: "Develop joint project ideas" },
  { icon: Globe, label: "Strengthen cross-border cooperation" },
];

function findPlatformImage(): string | null {
  for (const candidate of IMAGE_CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), "public", candidate))) {
      return candidate;
    }
  }
  return null;
}

export function PartnershipPlatform() {
  const imageSrc = findPlatformImage();

  return (
    <section className="section-padding bg-gradient-section" id="partnership-platform">
      <div className="container-institutional">
        <a
          href="https://wbfpartnership.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block card overflow-hidden hover:shadow-institutional-lg transition-shadow"
          aria-label="Visit the WBF Partnership Platform"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Text */}
            <div className="p-8 lg:p-14">
              <p className="text-overline text-brand-600 mb-3">WBF Partnership Platform</p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-5">
                Build Stronger Regional Partnerships
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-7">
                The Western Balkans Fund Partnership Platform helps organizations across the region
                connect with potential partners, develop consortiums, and prepare stronger project
                applications. Whether you are looking for new collaborators or seeking expertise
                for a regional initiative, the platform provides a dedicated space to build
                meaningful partnerships.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {benefits.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-brand-50 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-brand-600" strokeWidth={1.8} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{label}</span>
                  </div>
                ))}
              </div>

              <span className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white font-semibold text-sm rounded-sm group-hover:bg-brand-600 transition-colors">
                Visit the Partnership Platform
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            {/* Visual */}
            <div className="relative h-full min-h-[320px] lg:min-h-[480px] bg-gradient-brand p-8 lg:p-12 flex items-center justify-center">
              <div className="w-full max-w-[520px] rounded-lg overflow-hidden shadow-institutional-lg group-hover:scale-[1.02] transition-transform duration-300">
                {/* Browser frame */}
                <div className="flex items-center gap-2 bg-slate-800 px-4 py-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 flex-1 bg-slate-700 rounded-sm px-3 py-1 text-[11px] text-slate-300 truncate">
                    wbfpartnership.com
                  </span>
                </div>
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt="Preview of the WBF Partnership Platform"
                    width={1040}
                    height={650}
                    className="w-full h-auto bg-white"
                  />
                ) : (
                  <div className="bg-white p-6">
                    <div className="h-3 w-2/5 bg-brand-100 rounded-full mb-5" />
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {["Partner Search", "Open Calls"].map((label) => (
                        <div key={label} className="border border-slate-200 rounded-lg p-3.5">
                          <div className="w-7 h-7 rounded-sm bg-brand-50 mb-2.5" />
                          <div className="text-[11px] font-semibold text-slate-700 mb-1.5">{label}</div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full mb-1" />
                          <div className="h-1.5 w-3/4 bg-slate-100 rounded-full" />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2.5 border border-slate-200 rounded-lg p-3">
                      <div className="flex -space-x-1.5">
                        {["bg-brand-300", "bg-teal-300", "bg-gold-300"].map((c) => (
                          <span key={c} className={`w-6 h-6 rounded-full border-2 border-white ${c}`} />
                        ))}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Organizations across the Western Balkans
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
