import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/pages/legal/legal-placeholder";
import { getCurrentRegion } from "@/lib/region-server";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Kamanda Management LLC" },
  description:
    "Privacy Policy for Kamanda Management LLC. Content coming soon.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default async function LegalRoute() {
  const region = await getCurrentRegion();
  return <LegalPlaceholder title="Privacy Policy" region={region} />;
}
