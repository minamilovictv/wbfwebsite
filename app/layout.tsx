import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.westernbalkansfund.org"),
  title: {
    default: "Western Balkans Fund — Regional Cooperation & Grants",
    template: "%s | Western Balkans Fund",
  },
  description:
    "The Western Balkans Fund promotes regional cooperation, mobility and people-to-people connectivity across Albania, Bosnia and Herzegovina, Kosovo, North Macedonia, Montenegro, and Serbia.",
  keywords: [
    "Western Balkans Fund",
    "WBF",
    "regional cooperation",
    "grants",
    "Western Balkans",
    "Albania",
    "Bosnia",
    "Kosovo",
    "North Macedonia",
    "Montenegro",
    "Serbia",
    "civil society",
    "youth mobility",
  ],
  authors: [{ name: "Western Balkans Fund" }],
  creator: "Western Balkans Fund",
  publisher: "Western Balkans Fund",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Western Balkans Fund",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Western Balkans Fund",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@westernbalkansfund",
    creator: "@westernbalkansfund",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "sr-RS": "/sr",
      "mk-MK": "/mk",
      "sq-AL": "/sq",
      "bs-BA": "/bs",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#003366" },
    { media: "(prefers-color-scheme: dark)", color: "#003366" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <TopBar />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
