import { socialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home/home-page";

export const metadata: Metadata = {
  title: { absolute: "UAE | Kamanda Management LLC" },
  description:
    "Kamanda Management LLC delivers project management, construction support, technology and AI adoption, and business solutions across the UAE.",
  alternates: {
    canonical: "/ae",
  },
  ...socialMetadata({
    title: "Kamanda Management LLC in the UAE",
    description: "Kamanda Management LLC delivers project management, construction support, technology and AI adoption, and business solutions across the UAE.",
    path: "/ae",
    region: "ae",
  }),

};

export default function UnitedArabEmiratesPage() {
  return (
    <HomePage
      region="ae"
      heroImage="/images/hero-global.png"
      heroAlt="Dubai skyline"
    />
  );
}
