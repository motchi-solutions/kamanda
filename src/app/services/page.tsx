import type { Metadata } from "next";

import { ServicesPage } from "@/components/pages/services/services-page";
import { getCurrentRegion } from "@/lib/region-server";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Kamanda Management LLC services across technology and AI adoption, construction support, project management, and business solutions.",
  alternates: {
    canonical: "/services",
  },
};

export default async function ServicesRoute() {
  const region = await getCurrentRegion();

  return <ServicesPage region={region} />;
}
