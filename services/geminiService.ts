
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { NftMetadata } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash-preview-04-17';

const systemInstruction = `You are an expert NFT metadata creator. Your task is to generate creative and compelling content for a new NFT. You must respond ONLY with a valid JSON object that adheres strictly to the requested schema. Do not include any markdown, commentary, or any other text outside of the JSON object.`;

const buildPrompt = (keywords: string): string => {
    return `
    Based on the provided image and keywords, generate NFT metadata.
    Keywords: "${keywords || 'None provided'}"
    
    Generate a JSON object with this exact structure:
    {
      "name": "string (A short, catchy name)",
      "description": "string (An engaging paragraph, 2-3 sentences)",
      "traits": [ { "trait_type": "string", "value": "string" } ],
      "lore": "string (A short, imaginative backstory)"
    }

    The "traits" array should contain between 2 and 5 trait objects.
    `;
};


export const generateNftDescription = async (
    keywords: string,
    imageBase64: string | null,
    mimeType: string | null
): Promise<NftMetadata> => {
    const prompt = buildPrompt(keywords);
    
    const contents = [];
    if (imageBase64 && mimeType) {
        contents.push({
            inlineData: {
                mimeType: mimeType,
                data: imageBase64,
            },
        });
    }
    contents.push({ text: prompt });

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: { parts: contents },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                temperature: 0.5, // Lowered for more predictable, structured output
                topP: 0.95
            },
        });

        let jsonStr = response.text.trim();
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
            jsonStr = match[2].trim();
        }

        try {
            const parsedData = JSON.parse(jsonStr) as NftMetadata;
            if (!parsedData.name || !parsedData.description || !parsedData.traits || !parsedData.lore) {
                throw new Error("Generated JSON is missing required fields.");
            }
            return parsedData;
        } catch (e) {
            console.error("Failed to parse JSON response:", jsonStr);
            throw new Error("The AI returned an invalid data format. Please try again.");
        }
    } catch (e) {
        console.error("Error calling Gemini API:", e);
        if (e instanceof Error) {
            throw new Error(`Gemini API Error: ${e.message}`);
        }
        throw new Error("An unexpected error occurred while communicating with the Gemini API.");
    }
};
