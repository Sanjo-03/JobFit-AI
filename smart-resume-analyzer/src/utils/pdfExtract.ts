// src/utils/pdfExtract.ts
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?worker"; // 👈 worker import

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfjsWorker();

export async function extractText(file: File): Promise<string> {
  const pdfData = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((s: any) => s.str).join(" ") + "\n";
  }
  return text;
}
