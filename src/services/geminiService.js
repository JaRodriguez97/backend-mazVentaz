import "dotenv/config";
import { env } from "process";

const API_KEY = env.API_KEY;
const GEMINI_ENDPOINT = `${env.URI_BASE}=${API_KEY}`;

/**
 * Envía un historial de mensajes a Gemini y obtiene una respuesta
 * @param {Array<{ role: 'user' | 'model', content: string }>} history
 * @returns {Promise<string>}
 */
export const getGeminiReply = async (history = []) => {
  const formattedHistory = history.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));

  const response = await fetch(GEMINI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: formattedHistory,
      generationConfig: {
        temperature: 0.7,
        topK: 32,
        topP: 1,
        maxOutputTokens: 256,
      },
    }),
  });

  const data = await response.json();

  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return reply;
};
