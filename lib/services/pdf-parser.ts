/**
 * PDF text extraction using pdf-parse v2.
 * Returns extracted text and a flag indicating whether useful text was found.
 */
export interface PdfParseResult {
  text: string;
  numPages: number;
  hasUsefulText: boolean;
}

export async function parsePdf(buffer: Buffer): Promise<PdfParseResult> {
  // pdf-parse v2 uses a class-based API
  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({});

  try {
    // Use dynamic import workaround for private methods
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = parser as any;
    await p.load(new Uint8Array(buffer));
    const info = await p.getInfo();
    const numPages = info?.pages ?? 0;

    // getText returns all text from the document
    const text = (await p.getText()).trim();
    const hasUsefulText = text.length > 20;

    return { text, numPages, hasUsefulText };
  } finally {
    parser.destroy();
  }
}
