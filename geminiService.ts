import { GoogleGenAI, Type } from "@google/genai";
import { SearchMode, GroundingChunk } from '../types';

// Initialize Gemini Client
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const performIntelligenceSearch = async (
  query: string,
  mode: SearchMode // Kept for compatibility, but logic is now unified
): Promise<{ text: string; dork?: string; sources?: GroundingChunk[] }> => {
  const ai = getClient();
  
  // UNIFIED "ALL-IN-ONE" INTELLIGENCE MODEL
  // We use the Pro model for complex reasoning + tools
  const modelName = 'gemini-3-pro-preview';
  
  // Enable Google Search to find live deep web info/files
  const tools = [{ googleSearch: {} }];

  const systemInstruction = `
    You are "NEXUS 2.0", an elite Autonomous OSINT Engine.
    
    USER GOAL: The user wants to find EVERYTHING related to the target:
    1. Exposed files (PDF, XLS, DOC, ENV, SQL, LOG, BAK).
    2. "Confidential" or "Internal" documents leaked to the public web.
    3. Deep web mentions, pastebin dumps, or obscure forum discussions.
    4. Downloadable assets.

    YOUR EXECUTION PLAN:
    
    PHASE 1: ADVANCED DORK GENERATION
    - Generate 3-5 high-level Google Dorks specifically tailored to the target to find sensitive files.
    - Focus on: 'intitle:"index of"', 'filetype:env', 'filetype:sql', '"confidential"', 'site:target'.
    - Format these in a specific "DORKS" section.

    PHASE 2: DEEP WEB ANALYSIS (Using Google Search Tool)
    - Use your search tool to find live links, news of breaches, or public reports involving the target.
    - Look for subdomains or associated entities.

    PHASE 3: SYNTHESIS
    - Combine the Dorks and the Search Results into a tactical report.
    - List potential "Downloads" or "Files" found via search.
    
    SAFETY PROTOCOLS:
    - You are an ETHICAL research tool.
    - DO NOT generate fake PII (CPFs, CC numbers).
    - DO NOT provide instructions for active exploitation (SQLi, XSS).
    - Focus strictly on DISCOVERY of publicly exposed assets (OSINT).
    
    OUTPUT FORMAT:
    - Use Markdown.
    - distinct sections: 💀 EXPOSED ASSETS (Dorks), 🕵️ DEEP ANALYSIS, 📂 POTENTIAL FILES.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: query,
      config: {
        systemInstruction,
        tools,
        safetySettings: [
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
        ]
      }
    });

    const text = response.text || "No intelligence data retrieved.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // Extract the "primary" dork for the quick-copy button if one exists in code blocks
    let dork = undefined;
    const codeBlockMatch = text.match(/```(?:text|bash)?\n([\s\S]*?)\n```/);
    if (codeBlockMatch) {
        // Take the first line of code as the "Main Dork"
        dork = codeBlockMatch[1].split('\n')[0]; 
    }

    return { text, dork, sources };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Intelligence gathering failed. Ensure API Key is valid.");
  }
};