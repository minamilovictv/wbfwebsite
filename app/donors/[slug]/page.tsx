import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";

export const revalidate = 0;

interface DonorInfo {
  name: string;
  flag?: string;
  description: string;
}

// Placeholder donor pages — content about cooperation, projects, funding
// support, and impact will be added per donor later.
const DONORS: Record<string, DonorInfo> = {
  "european-union": {
    name: "European Union",
    flag: "🇪🇺",
    description:
      "The European Union is a key donor of the Western Balkans Fund, supporting regional cooperation and civil society across the Western Balkans.",
  },
  switzerland: {
    name: "Switzerland",
    flag: "🇨🇭",
    description:
      "Switzerland supports WBF's regional cooperation programmes through the Swiss Agency for Development and Cooperation (SDC).",
  },
  japan: {
    name: "Japan",
    flag: "🇯🇵",
    description:
      "Japan funds WBF's Advocacy & Networking Events programme and the LeadBalkans platform through the Japanese Government.",
  },
  germany: {
    name: "Germany",
    flag: "🇩🇪",
    description:
      "Germany supports WBF's civil society and democratic governance programmes through GIZ and the German Federal Foreign Office.",
  },
  "visegrad-fund": {
    name: "Visegrad Fund",
    flag: "🔷",
    description:
      "The Visegrad Fund is WBF's partner in the Visegrad Fellowship programme, connecting Western Balkans youth with the V4 countries of Central Europe.",
  },
  "open-society-foundations": {
    name: "Open Society Foundations",
    flag: "◆",
    description:
      "Open Society Foundations support WBF's civil society strengthening and independent media initiatives across the Western Balkans.",
  },
};

// Slugs used by existing CMS partner documents that map to the same donors.
const SLUG_ALIASES: Record<string, string> = {
  europeanunion: "european-union",
  "european-union-ipa-iii": "european-union",
  "switzerland-seco-sdc": "switzerland",
};

const upcomingTopics = [
  {
    title: "Our Cooperation",
    desc: "How this donor and the Western Balkans Fund work together across the region.",
  },
  {
    title: "Supported Projects",
    desc: "Projects and programmes made possible through this donor's support.",
  },
  {
    title: "Funding Support",
    desc: "An overview of the funding instruments and contributions provided.",
  },
  {
    title: "Impact",
    desc: "Results and impact achieved through our joint work across the Western Balkans.",
  },
];

function donorFromSlug(slug: string): DonorInfo {
  const known = DONORS[SLUG_ALIASES[slug] ?? slug];
  if (known) return known;
  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    name,
    description: `${name} supports the work of the Western Balkans Fund across the region.`,
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(DONORS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const donor = donorFromSlug(slug);
  return {
    title: `${donor.name} — Donors & Partners`,
    description: donor.description,
  };
}

export default async function DonorPage({ params }: PageProps) {
  const { slug } = await params;
  const donor = donorFromSlug(slug);

  return (
    <>
      <PageHero
        overline="Donors & Partners"
        title={donor.name}
        description={donor.description}
        variant="compact"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Donors & Partners", href: "/about/donors-partners" },
          { label: donor.name },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-institutional">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-base text-slate-600 leading-relaxed">
              Detailed information about our cooperation with {donor.name} — including joint
              projects, funding support, and the impact achieved together — will be published here
              soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-12">
            {upcomingTopics.map(({ title, desc }) => (
              <div key={title} className="card p-6">
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/about/donors-partners"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              ← All Donors & Partners
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
