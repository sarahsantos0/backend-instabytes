import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

export default async function gerarDescComGemini(imageBuffer) {
    const prompt = "Gere uma descrição em português do brasil para a seguinte imagem";

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/jpg",
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Descrição não disponivel.";
    } catch (error) {
        console.error("Erro ao obter descrição:", error.message, error);
        throw new Error("Erro ao obter a descrição do Gemini");
    }
}