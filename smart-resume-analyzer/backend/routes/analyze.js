// backend/routes/analyze.js
import express from "express";
import { openai } from "../openaiClient.js"; // Correct import extension

const router = express.Router();

router.post("/analyze", async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: "Missing resume or job description" });
  }

  // --- MODIFIED PROMPT FOR JSON OUTPUT ---
  const prompt = `You are a Smart Resume Analyzer. Compare the provided resume and job description. Provide a match score out of 100, and detailed feedback including strengths, areas for improvement, and key mismatches.

Format your entire response as a JSON object with the following structure:

{
  "matchScore": number,
  "feedback": {
    "overall": string,
    "strengths": string[],
    "areasForImprovement": string[],
    "keyMismatches": string[]
  },
  "suggestedImprovementsForTechRoles": string[]
}

The "overall" feedback should be a summary sentence. Each item in "strengths", "areasForImprovement", "keyMismatches", and "suggestedImprovementsForTechRoles" should be a concise string representing a single point. Ensure all strings are plain text, no markdown formatting. Do not include any questions or calls to action.

Resume:
${resumeText}

Job Description:
${jobDescription}`;
// --- END MODIFIED PROMPT ---

  try {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free", // Your chosen model
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" } // <--- CRITICAL: Tell OpenAI to return JSON
    });

    const content = response.choices[0].message?.content || "{}"; // Default to empty JSON object
    // Parse the JSON string received from OpenAI
    const analysisData = JSON.parse(content);
    res.json({ analysis: analysisData }); // Send the parsed JSON object to the frontend
  } catch (err) {
    console.error("OpenAI error:", err.message, err.stack);
    // Attempt to parse OpenAI's error response if it's JSON
    let errorMessage = "Failed to analyze resume.";
    if (err.response && err.response.data && err.response.data.error) {
        errorMessage += ` Details: ${err.response.data.error.message}`;
    } else {
        errorMessage += ` Details: ${err.message}`;
    }
    res.status(500).json({ error: errorMessage });
  }
});

export default router;