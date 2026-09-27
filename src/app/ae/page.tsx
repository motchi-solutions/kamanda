import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home/home-page";

export const metadata: Metadata = {
  title: "Kamanda Management LLC in the UAE",
  description:
    "Kamanda Management LLC delivers project management, construction support, technology and AI adoption, and business solutions across the UAE.",
  alternates: {
    canonical: "/ae",
  },
  openGraph: {
    locale: "en_AE",
    url: "/ae",
    title: "Kamanda Management LLC in the UAE",
    description:
      "Project management, construction support, technology and AI adoption, and business solutions across the UAE.",
    images: [
      {
        url: "/seo/og-dubai.png",
        width: 1200,
        height: 630,
        alt: "Kamanda Management LLC in the UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamanda Management LLC in the UAE",
    description:
      "Project management, construction support, technology and AI adoption, and business solutions across the UAE.",
    images: ["/seo/og-dubai.png"],
  },
};

export default function UnitedArabEmiratesPage() {
  return (
    <HomePage
      region="ae"
      heroImage="/images/hero-global.png"
      heroAlt="Dubai skyline"
      heroTitle="Management, Technology and Business Solutions"
      heroDescription="Kamanda Management LLC supports organizations across the UAE with project management, construction support, technology and AI adoption, and specialized business solutions."
    />
  );
}
