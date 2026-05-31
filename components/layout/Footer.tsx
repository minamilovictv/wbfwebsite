import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white/55" role="contentinfo">
      <div className="container-institutional">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 py-14 border-b border-white/7">

          {/* Brand */}
          <div>
            <div className="font-display text-[17px] font-semibold text-white mb-3">
              Western Balkans Fund
            </div>
            <p className="text-[13px] leading-relaxed mb-5 max-w-[30ch]">
              Dedicated to promoting reconciliation, strengthening regional cooperation, and
              fostering closer ties among the Contracting Parties of the Western Balkans.
            </p>
            <div className="flex gap-2">
              {[
                { label: "Instagram",  char: "in" },
                { label: "Facebook",   char: "fb" },
                { label: "LinkedIn",   char: "li" },
                { label: "X / Twitter", char: "𝕏" },
              ].map(({ label, char }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 bg-white/6 hover:bg-white/12 rounded-sm flex items-center justify-center text-[12px] text-white/45 hover:text-white transition-all"
                >
                  {char}
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/30 mb-3.5">
              Programs
            </h4>
            {[
              { label: "GGI Grants",           href: "/programs/ggi" },
              { label: "Matching Grants",      href: "/programs/matching-grants" },
              { label: "Move Grants",          href: "/programs/move-grants" },
              { label: "ERC Grants",           href: "/programs/erc-grants" },
              { label: "Gender Equality Fund", href: "/programs/gender-equality-fund" },
              { label: "Visegrad Fellowship",  href: "/programs/visegrad-fellowship" },
              { label: "Summer School",        href: "/programs/summer-school" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="block text-[13px] text-white/55 hover:text-white mb-2 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* About WBF */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/30 mb-3.5">
              About WBF
            </h4>
            {[
              { label: "Who We Are",       href: "/about" },
              { label: "Governance",       href: "/about/governance" },
              { label: "Our Team",         href: "/about/team" },
              { label: "Donors & Partners",href: "/about/donors-partners" },
              { label: "Accountability",   href: "/about/accountability" },
              { label: "Careers",          href: "/about/careers" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="block text-[13px] text-white/55 hover:text-white mb-2 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/30 mb-3.5">
              Resources
            </h4>
            {[
              { label: "Application Guidelines", href: "/grants/how-to-apply" },
              { label: "Annual Reports",         href: "/about/accountability" },
              { label: "Newsletters",            href: "/news" },
              { label: "WBF Statutes",           href: "/about/governance" },
              { label: "Financial Statements",   href: "/about/accountability" },
              { label: "FAQ",                    href: "/grants/how-to-apply#faq" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="block text-[13px] text-white/55 hover:text-white mb-2 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Platforms + Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/30 mb-3.5">
              Platforms
            </h4>
            <a
              href="https://wbfportal.org"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[13px] text-white/55 hover:text-white mb-2 transition-colors"
            >
              OGMS — Apply Online ↗
            </a>
            <a
              href="https://wbfpartnership.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[13px] text-white/55 hover:text-white mb-2 transition-colors"
            >
              Partnership Platform ↗
            </a>
            <Link href="/projects" className="block text-[13px] text-white/55 hover:text-white mb-2 transition-colors">
              Projects Database ↗
            </Link>
            <Link href="/impact" className="block text-[13px] text-white/55 hover:text-white mb-2 transition-colors">
              Data Portal ↗
            </Link>

            <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/30 mb-3.5 mt-4">
              Contact
            </h4>
            <a
              href="mailto:info@westernbalkansfund.org"
              className="block text-[13px] text-white/55 hover:text-white mb-2 transition-colors"
            >
              info@westernbalkansfund.org
            </a>
            <span className="block text-[13px] text-white/55">
              Skopje, North Macedonia
            </span>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-[18px] text-[12px] text-white/28">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#003399] text-[#FFCC00] text-[11px] font-bold px-2.5 py-0.5 rounded-sm tracking-[0.03em]">
              EU ★
            </span>
            <span>Co-funded by the European Union · EU/WBF Joint Action Phase III</span>
          </div>
          <span>© {new Date().getFullYear()} Western Balkans Fund · All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
