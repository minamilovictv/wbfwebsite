import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Western Balkans Fund Secretariat.",
};

const contacts = [
  {
    icon: Mail,
    label: "General Inquiries",
    value: "info@westernbalkansfund.org",
    href: "mailto:info@westernbalkansfund.org",
  },
  {
    icon: Mail,
    label: "Grants & Applications",
    value: "grants@westernbalkansfund.org",
    href: "mailto:grants@westernbalkansfund.org",
  },
  {
    icon: Mail,
    label: "Media & Communications",
    value: "media@westernbalkansfund.org",
    href: "mailto:media@westernbalkansfund.org",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+355 42 400420",
    href: "tel:+35542400420",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Rruga “Skënderbeg” No. 8, Kati IV, Ap. 35/36, Tirana, Albania",
    href: null,
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Monday–Friday, 09:00–17:00 CET",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        overline="Get in Touch"
        title="Contact Us"
        description="We're here to help. Reach out to the Secretariat for any inquiries about grants, programmes, or partnership opportunities."
        variant="compact"
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold text-slate-900 mb-4">
                  Secretariat Contacts
                </h2>
                <div className="space-y-4">
                  {contacts.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-brand-50 rounded-md flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-brand-600" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                          {label}
                        </div>
                        {href ? (
                          <a href={href} className="text-sm text-slate-800 hover:text-brand-600 transition-colors">
                            {value}
                          </a>
                        ) : (
                          <span className="text-sm text-slate-800">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-lg overflow-hidden border border-slate-200 h-64 bg-slate-100 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Interactive map</p>
                  <p className="text-xs">Tirana, Albania</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-display font-bold text-slate-900 mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
