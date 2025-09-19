// services/speechService.js
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.transcribe = async (audioData, language = 'fr') => {
  const response = await openai.audio.transcriptions.create({
    file: audioData, // chemin fichier ou buffer
    model: "whisper-1",
    language
  });

  return { text: response.text, confidence: 0.95 };
};
