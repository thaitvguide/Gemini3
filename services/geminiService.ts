import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

// Safely initialize AI only if key exists. 
// In a real environment this would be in process.env, but here we check first.
if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export async function generateComponentContent(prompt: string): Promise<string> {
  if (!ai) {
    console.warn("Gemini API Key not found. Returning mock data.");
    return "Gemini API Key not configured. This is mock content demonstrating where the AI response would appear.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a UI helper. Keep responses short, punchy, and suitable for a dashboard UI card description or title. Max 2 sentences.",
      }
    });
    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "Error generating content. Please check console.";
  }
}
