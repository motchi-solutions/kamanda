import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home/home-page";

export const metadata: Metadata = {
  title: "Home",

  description:
    "Kamanda Management LLC delivers project management, construction support, technology and AI adoption, and specialized business solutions.",

  alternates: {
    canonical: "/",
  },
};

export default function Home() {
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
