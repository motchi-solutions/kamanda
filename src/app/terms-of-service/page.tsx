import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/pages/legal/legal-placeholder";
import { getCurrentRegion } from "@/lib/region-server";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | Kamanda Management LLC" },
  description:
    "Terms of Service for Kamanda Management LLC. Content coming soon.",
  alternates: { canonical: "/terms-of-service" },
  robots: { index: false, follow: true },
};

export default async function LegalRoute() {
  const region = await getCurrentRegion();
  return <LegalPlaceholder title="Terms of Service" region={region} />;
}
