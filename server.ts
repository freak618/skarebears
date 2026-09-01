import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

// Middleware for parsing JSON bodies
app.use(express.json({ limit: '10mb' }));

// Initialize Gemini
const genAI = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
        headers: {
            'User-Agent': 'aistudio-build',
        }
    }
});

// API routes
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const response = await genAI.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1',
        outputMimeType: 'image/png',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return res.json({ imageUrl: `data:image/png;base64,${base64ImageBytes}` });
    }

    throw new Error("No image was generated. This might be due to a safety filter.");
  } catch (error: any) {
    console.error("Gemini Generate Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate image" });
  }
});

app.post("/api/transparent", async (req, res) => {
  try {
    const { base64Image } = req.body;
    if (!base64Image) {
      return res.status(400).json({ error: "base64Image is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const prompt = "Carefully and precisely remove the background from this image, making it fully transparent. The output must be a PNG with an alpha channel. The subject is a complex 3D horror toy character. Do not alter the subject itself. Preserve all edge details, loose fur, smoke, and lighting effects attached to the character. Do not add any new elements.";

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: 'image/png',
      },
    };

    const textPart = {
      text: prompt,
    };

    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash-image', // Recommended for general image editing
      contents: { parts: [imagePart, textPart] },
      config: {
        responseModalities: [ "IMAGE", "TEXT" ],
      },
    });

    if (response && response.candidates && response.candidates.length > 0 && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          return res.json({ imageUrl: `data:image/png;base64,${base64ImageBytes}` });
        }
      }
    }

    throw new Error("No transparent image was generated.");
  } catch (error: any) {
    console.error("Gemini Transparent Error:", error);
    res.status(500).json({ error: error.message || "Failed to process image" });
  }
});

// Vite middleware setup
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
