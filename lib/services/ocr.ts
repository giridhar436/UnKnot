/**
 * OCR abstraction layer.
 * Currently uses Fireworks AI Vision as the default provider.
 * Easy to swap by implementing a new OCRProvider and changing the env var.
 */

export interface OCRProvider {
  extractText(imageUrl: string): Promise<string>;
}

/**
 * Fireworks AI Vision-based OCR.
 * Uses a vision model to extract text from images.
 */
class FireworksVisionOCR implements OCRProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async extractText(imageUrl: string): Promise<string> {
    const response = await fetch(
      "https://api.fireworks.ai/inference/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "accounts/fireworks/models/qwen3p7-plus",
          messages: [
            {
              role: "system",
              content:
                "You are an OCR engine. Extract all readable text from the image. Return only the raw text, no commentary.",
            },
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: { url: imageUrl },
                },
                {
                  type: "text",
                  text: "Extract all text from this image. Return only the raw text content.",
                },
              ],
            },
          ],
          max_tokens: 4096,
          temperature: 0,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Fireworks Vision OCR failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || "";
  }
}

let _provider: OCRProvider | null = null;

export function getOCRProvider(): OCRProvider {
  if (_provider) return _provider;

  const apiKey = process.env.FIREWORKS_API_KEY;
  if (!apiKey) {
    throw new Error("FIREWORKS_API_KEY is required for OCR");
  }

  // Default to Fireworks Vision OCR
  _provider = new FireworksVisionOCR(apiKey);
  return _provider;
}

export async function extractTextFromImage(imageUrl: string): Promise<string> {
  const provider = getOCRProvider();
  return provider.extractText(imageUrl);
}
