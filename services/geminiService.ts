
import { GoogleGenAI } from "@google/genai";

export const generateImage = async (prompt: string): Promise<string | null> => {
  // Initialize the client directly, assuming the API key is available in the environment as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return base64ImageBytes;
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    // Re-throw the error so the UI component can catch it and display a message.
    throw new Error("Failed to generate image with Gemini API.");
  }
};
