
const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 150;

export const splitTextIntoChunks = (pages) => {
  const chunks = [];

  for (const page of pages) {
    const text = page.text.trim();

    if (!text) continue;

    let start = 0;
    let chunkIndex = 0;

    while (start < text.length) {
      let end = Math.min(start + CHUNK_SIZE, text.length);

      // Prefer ending at a word boundary
      if (end < text.length) {
        const lastSpace = text.lastIndexOf(" ", end);

        if (lastSpace > start) {
          end = lastSpace;
        }
      }

      const chunkText = text.slice(start, end).trim();

      if (chunkText) {
        chunks.push({
          chunkId: `${page.pageNumber}-${chunkIndex}`,
          pageNumber: page.pageNumber,
          chunkIndex,
          text: chunkText,
        });

        chunkIndex++;
      }

      if (end >= text.length) break;

      // Move forward while retaining overlapping text
      start = Math.max(start + 1, end - CHUNK_OVERLAP);
    }
  }

  return chunks;
};
