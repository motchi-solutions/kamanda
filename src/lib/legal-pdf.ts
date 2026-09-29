import PDFDocument from "pdfkit";
import { join } from "node:path";

import type { LegalDocument, LegalSection } from "@/lib/legal-content";

const COLORS = {
  carbon: "#1e1e1e",
  navy: "#1b3a66",
  muted: "#6b6b6b",
  gold: "#c9a45d",
};

const PAGE_MARGIN = 54;
const FOOTER_RESERVE = 64;
const BODY_OPTIONS = { lineGap: 3, align: "left" as const };

function contentWidth(document: PDFKit.PDFDocument) {
  return document.page.width - PAGE_MARGIN * 2;
}

function ensureSpace(document: PDFKit.PDFDocument, height: number) {
  if (document.y + height > document.page.height - FOOTER_RESERVE) {
    document.addPage();
  }
}

function addFooter(document: PDFKit.PDFDocument, page: number, total: number) {
  const { x, y } = document;
  const bottomMargin = document.page.margins.bottom;
  const footerY = document.page.height - 34;
  const width = contentWidth(document);

  document.save();
  // Fixed-height text plus a physical-page boundary prevents footer pagination.
  // Graphics save/restore does not restore PDFKit's cursor or margins.
  document.page.margins.bottom = 0;
  try {
    document
      .moveTo(PAGE_MARGIN, footerY - 12)
      .lineTo(PAGE_MARGIN + width, footerY - 12)
      .lineWidth(0.5)
      .strokeColor("#dedede")
      .stroke();
    document.font("Helvetica").fontSize(8).fillColor(COLORS.muted);
    const options = { width, height: 12, lineBreak: false };
    document.text("Kamanda Management LLC", PAGE_MARGIN, footerY, options);
    document.text(`Page ${page} of ${total}`, PAGE_MARGIN, footerY, {
      ...options,
      align: "right",
    });
  } finally {
    document.page.margins.bottom = bottomMargin;
    document.x = x;
    document.y = y;
    document.restore();
  }
}

function addHeader(document: PDFKit.PDFDocument, legalDocument: LegalDocument) {
  document.image(join(process.cwd(), "public/brand/kamanda-logo.png"), PAGE_MARGIN, 48, {
    fit: [42, 42],
  });
  document
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(COLORS.navy)
    .text("KAMANDA MANAGEMENT LLC", PAGE_MARGIN + 54, 64, {
      characterSpacing: 1.5,
      lineBreak: false,
    });
  document
    .moveTo(PAGE_MARGIN, 108)
    .lineTo(PAGE_MARGIN + contentWidth(document), 108)
    .lineWidth(1)
    .strokeColor(COLORS.gold)
    .stroke();
  document
    .font("Times-Roman")
    .fontSize(30)
    .fillColor(COLORS.carbon)
    .text(legalDocument.title, PAGE_MARGIN, 128, { width: contentWidth(document) });
  document
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(COLORS.muted)
    .text(`Effective Date: ${legalDocument.effectiveDate}`, PAGE_MARGIN, document.y + 12);
  document.y += 22;
}

function bodyHeight(document: PDFKit.PDFDocument, text: string, indent = 0) {
  document.font("Helvetica").fontSize(10.5);
  return document.heightOfString(text, {
    ...BODY_OPTIONS,
    width: contentWidth(document) - indent,
  });
}

function addParagraph(document: PDFKit.PDFDocument, text: string, gap = 9, bullet = false) {
  const indent = bullet ? 16 : 0;
  const height = bodyHeight(document, text, indent);
  const pageCapacity = document.page.height - PAGE_MARGIN - FOOTER_RESERVE;
  // Keep ordinary paragraphs/items intact; oversized text may flow across pages.
  ensureSpace(document, Math.min(height, pageCapacity));
  const y = document.y;
  if (bullet) {
    document.circle(PAGE_MARGIN + 5, y + 5, 1.6).fill(COLORS.gold);
  }
  document
    .font("Helvetica")
    .fontSize(10.5)
    .fillColor(COLORS.carbon)
    .text(text, PAGE_MARGIN + indent, y, {
      ...BODY_OPTIONS,
      width: contentWidth(document) - indent,
    });
  document.y += gap;
  document.x = PAGE_MARGIN;
}

function addSection(document: PDFKit.PDFDocument, section: LegalSection, index: number) {
  const heading = `${index + 1}. ${section.heading}`;
  const headingOptions = { width: contentWidth(document), lineGap: 1 };
  document.font("Times-Bold").fontSize(16);
  const headingHeight = document.heightOfString(heading, headingOptions);
  const firstText = section.paragraphs?.[0] ?? section.bullets?.[0] ?? section.afterBullets?.[0];
  const firstHeight = firstText
    ? bodyHeight(document, firstText, section.paragraphs?.length ? 0 : section.bullets?.length ? 16 : 0)
    : 0;
  const spacing = 12;
  const pageCapacity = document.page.height - PAGE_MARGIN - FOOTER_RESERVE;
  ensureSpace(document, Math.min(spacing + headingHeight + 8 + firstHeight, pageCapacity));
  if (document.y > PAGE_MARGIN) document.y += spacing;
  document
    .font("Times-Bold")
    .fontSize(16)
    .fillColor(COLORS.navy)
    .text(heading, PAGE_MARGIN, document.y, headingOptions);
  document.y += 8;

  section.paragraphs?.forEach((paragraph) => addParagraph(document, paragraph));
  section.bullets?.forEach((bullet) => addParagraph(document, bullet, 5, true));
  section.afterBullets?.forEach((paragraph) => addParagraph(document, paragraph, 7));
}

export function generateLegalPdf(legalDocument: LegalDocument): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const document = new PDFDocument({
      autoFirstPage: false,
      bufferPages: true,
      margins: {
        top: PAGE_MARGIN,
        bottom: FOOTER_RESERVE,
        left: PAGE_MARGIN,
        right: PAGE_MARGIN,
      },
      size: "A4",
      info: {
        Author: "Kamanda Management LLC",
        Creator: "Kamanda Management LLC",
        Title: legalDocument.title,
        Subject: `${legalDocument.title} - Kamanda Management LLC`,
      },
    });
    const chunks: Buffer[] = [];

    document.on("data", (chunk: Buffer) => chunks.push(chunk));
    document.on("error", reject);
    document.on("end", () => resolve(Buffer.concat(chunks)));

    document.addPage();
    addHeader(document, legalDocument);
    addParagraph(document, legalDocument.intro, 12);
    legalDocument.sections.forEach((section, index) => addSection(document, section, index));

    const pages = document.bufferedPageRange();
    for (let page = pages.start; page < pages.start + pages.count; page += 1) {
      document.switchToPage(page);
      addFooter(document, page - pages.start + 1, pages.count);
    }

    document.end();
  });
}
