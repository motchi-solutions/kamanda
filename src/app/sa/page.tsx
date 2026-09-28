import { socialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home/home-page";

export const metadata: Metadata = {
  title: { absolute: "Saudi Arabia | Kamanda Management LLC" },
  description:
    "Kamanda Management LLC delivers project management, construction support, technology and AI adoption, and business solutions in Saudi Arabia.",
  alternates: {
    canonical: "/sa",
  },
  ...socialMetadata({
    title: "Kamanda Management LLC in Saudi Arabia",
    description: "Kamanda Management LLC delivers project management, construction support, technology and AI adoption, and business solutions in Saudi Arabia.",
    path: "/sa",
    region: "sa",
  }),

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
