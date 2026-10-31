
import { splitTextIntoChunks } from "../services/chunkService.js";

const samplePages = [
  {
    pageNumber: 1,
    text: "Artificial intelligence is a field of computer science. ".repeat(50),
  },
  {
    pageNumber: 2,
    text: "Machine learning enables computers to learn from data. ".repeat(50),
  },
];

const chunks = splitTextIntoChunks(samplePages);

console.log("Total chunks:", chunks.length);
console.log(JSON.stringify(chunks, null, 2));
