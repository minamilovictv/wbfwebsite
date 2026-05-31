import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, CheckCircle2, Clock, FileText, Mail, Search, Send, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Apply",
  description: "Step-by-step guidance for applying to Western Balkans Fund grants.",
};

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Find the Right Grant",
    desc: "Browse open calls on our grants page. Filter by country, type, and eligible applicant to find grants relevant to your organisation and objectives.",
    cta: { label: "Browse Open Calls", href: "/grants/open-calls" },
  },
  {
    step: "02",
    icon: CheckCircle2,
    title: "Check Eligibility",
    desc: "Read the Grant Guidelines carefully. Confirm your organisation type, country of registration, and project scope match the eligibility criteria.",
    cta: { label: "Eligibility Guide", href: "/grants/eligibility" },
  },
  {
    step: "03",
    icon: Users,
    title: "Find Partners (if required)",
    desc: "Many WBF grants require consortium applications with partners from at least two member states. Use our Partnership Platform to find suitable co-applicants.",
    cta: { label: "Partnership Platform", href: "/partners" },
  },
  {
    step: "04",
    icon: FileText,
    title: "Prepare Your Application",
    desc: "Download the Application Form and Budget Template from the grant page. Complete all mandatory sections. Ensure all supporting documents are gathered.",
    cta: null,
  },
  {
    step: "05",
    icon: Send,
    title: "Submit via OGMS",
    desc: "All applications are submitted through our Online Grant Management System (OGMS). Create an account, complete your application, and submit before the deadline.",
    cta: { label: "Open OGMS Portal", href: "/apply", external: true },
  },
  {
    step: "06",
    icon: Clock,
    title: "Await Evaluation",
    desc: "Applications are assessed by an independent panel against published criteria. You will be notified of the result by email and through your OGMS account.",
    cta: null,
  },
];

const tips = [
  "Read the Guidelines fully before starting — each call has specific requirements.",
  "Apply early: technical issues near the deadline will not be accepted as excuses for late submission.",
  "Budget must be co-financed if required — confirm your co-financing sources before applying.",
  "All documents should be in English unless the call specifies otherwise.",
  "Contact the WBF National Focal Point in your country for pre-application advice.",
];

export default function HowToApplyPage() {
  return (
    <>
      <PageHero
        overline="Grants"
        title="How to Apply"
        description="Follow these six steps to successfully apply for a Western Balkans Fund grant."
        breadcrumbs={[
          { label: "Grants", href: "/grants" },
          { label: "How to Apply" },
        ]}
      />

      {/* Steps */}
      <section className="section-padding bg-white">
        <div className="container-institutional max-w-4xl">
          <div className="space-y-6">
            {steps.map(({ step, icon: Icon, title, desc, cta }) => (
              <div key={step} className="flex gap-6 group">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-brand-900 flex items-center justify-center text-white font-display font-bold text-lg">
                    {step}
                  </div>
                  <div className="flex-1 w-0.5 bg-slate-200 my-2" />
                </div>
                <div className="card p-6 flex-1 mb-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Icon className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{desc}</p>
                  {cta && (
                    <Link
                      href={cta.href}
                      className="inline-flex items-center gap-1 text-sm text-brand-600 font-medium hover:text-brand-700"
                    >
                      {cta.label} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="section-padding-sm bg-section-alt">
        <div className="container-institutional max-w-4xl">
          <SectionHeader
            overline="Pro Tips"
            title="Common Application Mistakes to Avoid"
            className="mb-8"
          />
          <ul className="space-y-3">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding-sm bg-white">
        <div className="container-institutional max-w-4xl">
          <div className="bg-brand-900 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h3 className="text-xl font-display font-bold mb-2">Need Help?</h3>
              <p className="text-slate-300 text-sm">
                Our grants team is available to answer your questions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="mailto:grants@westernbalkansfund.org"
                className="btn-secondary btn-sm"
              >
                <Mail className="w-4 h-4" />
                Email Grants Team
              </a>
              <Link href="/contact" className="btn-outline border-white/30 text-white hover:bg-white/10 hover:text-white btn-sm">
                Contact Form
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
