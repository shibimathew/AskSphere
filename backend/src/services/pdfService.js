
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractPdfText = async (fileBuffer) => {
  try {
    const pdfData = new Uint8Array(fileBuffer);

    const pdf = await pdfjsLib.getDocument({
      data: pdfData,
    }).promise;

    const pages = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str)
        .join(" ")
        .trim();

      pages.push({
        pageNumber,
        text: pageText,
      });
    }

    const cleanedPages = pages.filter(
      (page) => page.text.length > 0
    );

    return {
      totalPages: pdf.numPages,
      pages: cleanedPages,
      fullText: cleanedPages
        .map((page) => page.text)
        .join("\n\n"),
    };
  } catch (error) {
    console.error("PDF extraction error:", error.message);
    throw new Error("Unable to extract text from PDF");
  }
};
