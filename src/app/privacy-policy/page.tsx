import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/pages/legal/legal-document";
import { legalDocuments } from "@/lib/legal-content";
import { getCurrentRegion } from "@/lib/region-server";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Kamanda Management LLC" },
  description:
    "Privacy Policy for Kamanda Management LLC.",
  alternates: { canonical: "/privacy-policy" },
};

export default async function LegalRoute() {
  const region = await getCurrentRegion();
  return <LegalDocumentPage document={legalDocuments["privacy-policy"]} region={region} />;
}
