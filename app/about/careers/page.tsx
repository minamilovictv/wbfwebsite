import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Western Balkans Fund Secretariat — open positions and opportunities.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        overline="About"
        title="Careers"
        description="Join our team and help build a more connected Western Balkans."
        variant="compact"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Careers" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional max-w-2xl text-center py-12">
          <p className="text-slate-500 mb-2">No open positions at the moment.</p>
          <p className="text-sm text-slate-400">
            Check back regularly or send a speculative application to{" "}
            <a href="mailto:info@westernbalkansfund.org" className="text-brand-600 hover:underline">
              info@westernbalkansfund.org
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
