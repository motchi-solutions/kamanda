import { socialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home/home-page";

export const metadata: Metadata = {
  title: { absolute: "Home | Kamanda Management LLC" },

  description:
    "Kamanda Management LLC delivers project management, construction support, technology and AI adoption, and specialized business solutions.",

  alternates: {
    canonical: "/",
  },
  ...socialMetadata({
    title: "Kamanda Management LLC",
    description: "Kamanda Management LLC delivers project management, construction support, technology and AI adoption, and specialized business solutions.",
    path: "/",
    region: "default",
  }),
};

export default function Home() {
  return (
    <HomePage
      region="ae"
      heroImage="/images/hero-global.png"
      heroAlt="Dubai skyline"
    />
  );
}
