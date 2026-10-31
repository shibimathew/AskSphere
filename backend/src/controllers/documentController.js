
import fs from "fs/promises";
import { extractPdfText } from "../services/pdfService.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF document",
      });
    }

    // Read the uploaded PDF
    const fileBuffer = await fs.readFile(req.file.path);

    // Extract text and page numbers
    const extractedData = await extractPdfText(fileBuffer);

    if (!extractedData.fullText.trim()) {
      await fs.unlink(req.file.path).catch(() => {});

      return res.status(422).json({
        success: false,
        message: "No readable text found in this PDF",
      });
    }

    return res.status(201).json({
      success: true,
      message: "PDF uploaded and text extracted successfully",

      document: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        totalPages: extractedData.totalPages,
        extractedPages: extractedData.pages.length,
        pages: extractedData.pages,
        fullText: extractedData.fullText,
      },
    });

  } catch (error) {
    console.error("Document processing error:", error);

    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    return res.status(500).json({
      success: false,
      message: "Failed to process PDF document",
    });
  }
};
