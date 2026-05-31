import Link from "next/link";
import {
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

const footerLinks = {
  about: {
    title: "About WBF",
    links: [
      { label: "About the Fund", href: "/about" },
      { label: "Governance", href: "/about/governance" },
      { label: "Team", href: "/about/team" },
      { label: "Member States", href: "/about/member-states" },
      { label: "Strategic Plan", href: "/about/strategic-plan" },
    ],
  },
  programs: {
    title: "Programs",
    links: [
      { label: "All Programs", href: "/programs" },
      { label: "Regional Cooperation", href: "/programs?pillar=regional-cooperation" },
      { label: "Youth Mobility", href: "/programs?pillar=youth-mobility" },
      { label: "Civil Society", href: "/programs?pillar=civil-society" },
      { label: "Environment", href: "/programs?pillar=environment" },
    ],
  },
  grants: {
    title: "Grants",
    links: [
      { label: "Open Calls", href: "/grants/open-calls" },
      { label: "How to Apply", href: "/grants/how-to-apply" },
      { label: "Eligibility", href: "/grants/eligibility" },
      { label: "Grant Database", href: "/grants/database" },
      { label: "Apply Now", href: "/apply" },
    ],
  },
  media: {
    title: "News & Media",
    links: [
      { label: "News", href: "/news" },
      { label: "Press Releases", href: "/news/press" },
      { label: "Publications", href: "/news/publications" },
      { label: "Events", href: "/events" },
      { label: "Partners", href: "/partners" },
    ],
  },
};

const socials = [
  { label: "Twitter / X", href: "https://twitter.com/westernbalkansfund", Icon: Twitter },
  { label: "Facebook", href: "https://facebook.com/westernbalkansfund", Icon: Facebook },
  { label: "LinkedIn", href: "https://linkedin.com/company/westernbalkansfund", Icon: Linkedin },
  { label: "YouTube", href: "https://youtube.com/westernbalkansfund", Icon: Youtube },
  { label: "Instagram", href: "https://instagram.com/westernbalkansfund", Icon: Instagram },
];

const memberStates = [
  { code: "AL", name: "Albania", flag: "🇦🇱" },
  { code: "BA", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { code: "XK", name: "Kosovo*", flag: "🇽🇰" },
  { code: "MK", name: "North Macedonia", flag: "🇲🇰" },
  { code: "ME", name: "Montenegro", flag: "🇲🇪" },
  { code: "RS", name: "Serbia", flag: "🇷🇸" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 text-slate-300" role="contentinfo">
      {/* Member States Band */}
      <div className="border-b border-brand-800">
        <div className="container-institutional py-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0">
              Member States
            </span>
            <div className="flex flex-wrap gap-4">
              {memberStates.map((s) => (
                <span key={s.code} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span>{s.flag}</span>
                  <span>{s.name}</span>
                </span>
              ))}
            </div>
            <span className="text-2xs text-slate-600 ml-auto hidden lg:block">
              *This designation is without prejudice to positions on status, and is in line with UNSC 1244/1999 and the ICJ Opinion on the Kosovo declaration of independence.
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-institutional py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center">
                <span className="text-white font-display font-bold text-base">WBF</span>
              </div>
              <div>
                <div className="text-white font-display font-bold text-sm leading-tight">
                  Western Balkans Fund
                </div>
                <div className="text-teal-400 text-xs font-semibold tracking-wider uppercase">
                  Regional Cooperation
                </div>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              The Western Balkans Fund promotes regional cooperation and people-to-people
              connectivity across the six Western Balkans economies.
            </p>

            {/* Contact */}
            <div className="space-y-2 text-sm mb-6">
              <a href="mailto:info@westernbalkansfund.org" className="flex items-start gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-teal-500" />
                info@westernbalkansfund.org
              </a>
              <a href="tel:+381112222333" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 shrink-0 text-teal-500" />
                +381 11 222 2333
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-teal-500" />
                <span>Vladimira Popovića 6, Belgrade 11070, Serbia</span>
              </span>
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-white/15 rounded-sm flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-800">
        <div className="container-institutional py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>© {currentYear} Western Balkans Fund. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link href="/legal/privacy-policy" className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/terms-of-use" className="hover:text-slate-300 transition-colors">
                Terms of Use
              </Link>
              <Link href="/legal/cookie-policy" className="hover:text-slate-300 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="hover:text-slate-300 transition-colors">
                Accessibility
              </Link>
              <a
                href="https://studio.westernbalkansfund.org"
                className="hover:text-slate-300 transition-colors flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                CMS Admin <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
