import type { Metadata } from "next";

import { AboutPage } from "@/components/pages/about/about-page";
import { getCurrentRegion } from "@/lib/region-server";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Kamanda Management LLC and our practical approach to management, technology, and business support.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutRoute() {
  const region = await getCurrentRegion();

  return <AboutPage region={region} />;
}
