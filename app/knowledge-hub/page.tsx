import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { BookOpen, FileText, Newspaper, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Hub",
  description: "A growing library of resources, reports, and guidance from the Western Balkans Fund.",
};

const upcoming = [
  { icon: FileText, title: "Reports & Publications", description: "Research, evaluations, and strategic documents from WBF and its partners." },
  { icon: Newspaper, title: "Guides & Toolkits", description: "Practical resources for applicants and grantees — from proposal writing to reporting." },
  { icon: BookOpen, title: "Regional Knowledge Base", description: "Curated insights on regional cooperation, civil society, and youth mobility." },
];

export default function KnowledgeHubPage() {
  return (
    <>
      <PageHero
        overline="Resources"
        title="Knowledge Hub"
        description="A central home for WBF reports, guides, and resources — coming soon."
        variant="compact"
        breadcrumbs={[{ label: "Knowledge Hub" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional max-w-3xl">
          <div className="text-center py-10">
            <div className="w-14 h-14 mx-auto mb-5 bg-brand-50 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-brand-600" />
            </div>
            <h2 className="text-section-title text-slate-900 mb-3">Coming Soon</h2>
            <p className="text-slate-500 leading-relaxed max-w-xl mx-auto">
              The WBF Knowledge Hub will bring together reports, publications, guides, and other
              resources in one place. In the meantime, explore our existing{" "}
              <Link href="/about/accountability" className="text-brand-600 hover:underline">
                Accountability
              </Link>{" "}
              section or browse the latest{" "}
              <Link href="/news" className="text-brand-600 hover:underline">
                News & Events
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
            {upcoming.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card p-5 text-center">
                <div className="w-10 h-10 bg-brand-50 rounded-md flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-slate-900 text-[15px] mb-1.5">{title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/" className="btn-outline">
              Return Home <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
