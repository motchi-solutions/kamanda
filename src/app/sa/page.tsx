import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home/home-page";

export const metadata: Metadata = {
  title: "Kamanda Management LLC in Saudi Arabia",
  description:
    "Kamanda Management LLC delivers project management, construction support, technology and AI adoption, and business solutions in Saudi Arabia.",
  alternates: {
    canonical: "/sa",
  },
  openGraph: {
    locale: "en_SA",
    url: "/sa",
    title: "Kamanda Management LLC in Saudi Arabia",
    description:
      "Project management, construction support, technology and AI adoption, and business solutions in Saudi Arabia.",
    images: [
      {
        url: "/seo/og-riyadh.png",
        width: 1200,
        height: 630,
        alt: "Kamanda Management LLC in Saudi Arabia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamanda Management LLC in Saudi Arabia",
    description:
      "Project management, construction support, technology and AI adoption, and business solutions in Saudi Arabia.",
    images: ["/seo/og-riyadh.png"],
  },
};

export default function SaudiArabiaPage() {
  return (
    <HomePage
      region="sa"
      heroImage="/images/hero-ksa.png"
      heroAlt="Riyadh skyline"
    />
  );
}
