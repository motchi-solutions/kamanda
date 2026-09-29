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
const CONTENT_WIDTH = 504;

function addFooter(document: PDFKit.PDFDocument) {
  const footerY = document.page.height - 34;

  document
    .save()
    .font("Helvetica")
    .fontSize(8)
    .fillColor(COLORS.muted)
    .text("Kamanda Management LLC", PAGE_MARGIN, footerY, {
      width: CONTENT_WIDTH,
      lineBreak: false,
    });
  document.restore();
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
    .lineTo(PAGE_MARGIN + CONTENT_WIDTH, 108)
    .lineWidth(1)
    .strokeColor(COLORS.gold)
    .stroke();
  document
    .font("Times-Roman")
    .fontSize(30)
    .fillColor(COLORS.carbon)
    .text(legalDocument.title, PAGE_MARGIN, 128, { width: CONTENT_WIDTH });
  document
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(COLORS.muted)
    .text(`Effective Date: ${legalDocument.effectiveDate}`, PAGE_MARGIN, 170);
  document.y = 212;
}

function addParagraph(document: PDFKit.PDFDocument, text: string, gap = 9) {
  document
    .font("Helvetica")
    .fontSize(10.5)
    .fillColor(COLORS.carbon)
    .text(text, {
      width: CONTENT_WIDTH,
      lineGap: 3,
      paragraphGap: gap,
      align: "left",
    });
}

function addSection(document: PDFKit.PDFDocument, section: LegalSection, index: number) {
  document.moveDown(1.25);
  document
    .font("Times-Bold")
    .fontSize(17)
    .fillColor(COLORS.navy)
    .text(`${index + 1}. ${section.heading}`, {
      width: CONTENT_WIDTH,
      paragraphGap: 9,
      lineGap: 1,
    });

  section.paragraphs?.forEach((paragraph) => addParagraph(document, paragraph));

  if (section.bullets?.length) {
    document
      .font("Helvetica")
      .fontSize(10.5)
      .fillColor(COLORS.carbon)
      .list(section.bullets, {
        bulletIndent: 6,
        textIndent: 16,
        listType: "bullet",
        width: CONTENT_WIDTH,
        lineGap: 3,
        paragraphGap: 5,
      });
  }

  section.afterBullets?.forEach((paragraph) => addParagraph(document, paragraph, 7));
}

export function generateLegalPdf(legalDocument: LegalDocument): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const document = new PDFDocument({
      autoFirstPage: false,
      bufferPages: true,
      margins: {
        top: PAGE_MARGIN,
        bottom: 90,
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
      addFooter(document);
      document
        .font("Helvetica")
        .fontSize(8)
        .fillColor(COLORS.muted)
        .text(`${page + 1} / ${pages.count}`, PAGE_MARGIN + CONTENT_WIDTH - 38, document.page.height - 34, {
          width: 38,
          align: "right",
          lineBreak: false,
        });
    }

    document.end();
  });
}
