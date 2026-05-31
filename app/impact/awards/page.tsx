import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "WBF Champion Awards",
  description: "The WBF Champion Awards recognise outstanding grantee organisations and projects across the Western Balkans region.",
};

export default function AwardsPage() {
  return (
    <>
      <PageHero
        overline="Our Impact"
        title="WBF Champion Awards"
        description="Recognising outstanding contributions to regional cooperation, reconciliation, and European integration across the Western Balkans."
        variant="compact"
        breadcrumbs={[
          { label: "Our Impact", href: "/impact" },
          { label: "Champion Awards" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional max-w-2xl">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-gold-500" />
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
              Awards programme coming soon
            </h2>
            <p className="text-slate-500 leading-relaxed">
              The WBF Champion Awards programme will recognise the most impactful projects and organisations
              from each annual cycle. Details will be published here once the programme launches.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
