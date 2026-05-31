import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ArrowRight, ExternalLink, FileText, Lock, Monitor, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Apply for Grants",
  description: "Submit your Western Balkans Fund grant application through our Online Grant Management System (OGMS).",
};

const steps = [
  {
    n: "1",
    title: "Find an Open Call",
    desc: "Browse current open grant calls and confirm your eligibility.",
    href: "/grants/open-calls",
    cta: "View Open Calls",
  },
  {
    n: "2",
    title: "Read the Guidelines",
    desc: "Download and carefully review the Grant Guidelines and Application Form.",
    href: "/grants/how-to-apply",
    cta: "How to Apply",
  },
  {
    n: "3",
    title: "Register on OGMS",
    desc: "Create an account on the Online Grant Management System to submit your application.",
    href: process.env.NEXT_PUBLIC_SITE_URL + "/ogms" ?? "#",
    cta: "Go to OGMS Portal",
    external: true,
  },
];

const features = [
  { icon: Monitor, title: "Online Submission", desc: "Submit all application documents through a single secure portal." },
  { icon: Lock, title: "Secure & Encrypted", desc: "All data is protected with industry-standard encryption." },
  { icon: Users, title: "Consortium Support", desc: "Manage multi-partner applications with role-based access." },
  { icon: FileText, title: "Document Tracking", desc: "Track the status of your application in real time." },
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        overline="Apply"
        title="Application Portal"
        description="All Western Balkans Fund grant applications are submitted through the Online Grant Management System (OGMS)."
        breadcrumbs={[{ label: "Apply" }]}
      />

      {/* Steps */}
      <section className="section-padding bg-white">
        <div className="container-institutional max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {steps.map(({ n, title, desc, href, cta, external }) => (
              <div key={n} className="card p-6 flex flex-col">
                <div className="w-10 h-10 bg-brand-900 rounded-lg flex items-center justify-center text-white font-bold font-display text-xl mb-4">
                  {n}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 mb-4 flex-1">{desc}</p>
                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 text-sm text-brand-600 font-medium hover:text-brand-700"
                >
                  {cta}
                  {external ? <ExternalLink className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </Link>
              </div>
            ))}
          </div>

          {/* OGMS Portal CTA */}
          <div className="bg-gradient-brand rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-display font-bold mb-3">
              Ready to Submit Your Application?
            </h2>
            <p className="text-white/80 mb-6 text-sm max-w-md mx-auto">
              Access the OGMS portal to create an account and start your application.
              Have your organisation registration documents ready.
            </p>
            <a
              href="https://ogms.westernbalkansfund.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-8 py-3 rounded-sm hover:bg-slate-50 transition-colors text-sm"
            >
              <Monitor className="w-5 h-5" />
              Open OGMS Portal
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-white/50 text-xs mt-4">
              New to OGMS? Register your organisation to get started.
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-brand-600" />
                </div>
                <h4 className="text-sm font-semibold text-slate-800 mb-1">{title}</h4>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
