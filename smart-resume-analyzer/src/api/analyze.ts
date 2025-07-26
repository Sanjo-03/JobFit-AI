// src/api/analyze.ts
export async function analyzeResume(resumeText: string, jobDescription: string) {
  const response = await fetch("http://localhost:3001/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeText, jobDescription }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze resume");
  }

  const data = await response.json();
  return data.analysis;
}
