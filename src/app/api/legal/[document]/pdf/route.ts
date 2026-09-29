import { getLegalDocument } from "@/lib/legal-content";
import { generateLegalPdf } from "@/lib/legal-pdf";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ document: string }> },
) {
  const { document: slug } = await params;
  const document = getLegalDocument(slug);

  if (!document) {
    return new Response("Not Found", { status: 404 });
  }

  const pdf = await generateLegalPdf(document);

  return new Response(pdf as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${document.filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
