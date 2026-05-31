import { SectionHeader } from "@/components/ui/SectionHeader";
import { Users, DollarSign, Globe2, FileCheck, Building2, Handshake } from "lucide-react";

const stats = [
  {
    value: "€42M+",
    label: "Grants Awarded",
    description: "Total funding disbursed since 2017",
    icon: DollarSign,
    color: "text-gold-500",
    bg: "bg-gold-50",
  },
  {
    value: "2,480+",
    label: "Projects Funded",
    description: "Across all programmes and sectors",
    icon: FileCheck,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    value: "6",
    label: "Member States",
    description: "Western Balkans economies covered",
    icon: Globe2,
    color: "text-brand-600",
    bg: "bg-brand-50",
  },
  {
    value: "340,000+",
    label: "Beneficiaries",
    description: "Individuals reached by WBF projects",
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    value: "1,200+",
    label: "Partner Organizations",
    description: "CSOs, universities, public bodies",
    icon: Handshake,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    value: "38",
    label: "Active Programmes",
    description: "Running across all focus areas",
    icon: Building2,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

export function ImpactStats() {
  return (
    <section className="section-padding bg-white">
      <div className="container-institutional">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <SectionHeader
              overline="Our Impact"
              title="Driving Regional Cooperation Since 2017"
              description="Through targeted grants, mobility support, and strategic partnerships, the Western Balkans Fund has catalysed meaningful change across the region."
              dividerColor="teal"
            />
            <div className="mt-8 p-6 bg-gradient-to-br from-brand-900 to-brand-700 rounded-lg text-white">
              <p className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-2">
                WBF Mission
              </p>
              <blockquote className="font-display text-xl font-medium leading-relaxed italic">
                &ldquo;To promote regional cooperation, mutual understanding, and the European
                perspective of the Western Balkans.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Right — stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stats.map(({ value, label, description, icon: Icon, color, bg }) => (
              <div
                key={label}
                className="card p-5 group hover:shadow-card-hover transition-shadow duration-200"
              >
                <div className={`w-10 h-10 rounded-md ${bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div className={`text-2xl font-display font-bold ${color} leading-none mb-1`}>
                  {value}
                </div>
                <div className="text-sm font-semibold text-slate-800 mb-0.5">{label}</div>
                <div className="text-xs text-slate-500 leading-snug">{description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
