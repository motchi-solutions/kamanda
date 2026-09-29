import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/pages/legal/legal-document";
import { legalDocuments } from "@/lib/legal-content";
import { getCurrentRegion } from "@/lib/region-server";
import { socialMetadata } from "@/lib/social-metadata";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | Kamanda Management LLC" },
  description:
    "Terms of Service for Kamanda Management LLC.",
  alternates: { canonical: "/terms-of-service" },
  ...socialMetadata({
    title: "Terms of Service | Kamanda Management LLC",
    description: "Terms of Service for Kamanda Management LLC.",
    path: "/terms-of-service",
  }),
};

export default async function LegalRoute() {
  const region = await getCurrentRegion();
  return <LegalDocumentPage document={legalDocuments["terms-of-service"]} region={region} />;
}
