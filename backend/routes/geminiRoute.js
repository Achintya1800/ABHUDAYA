import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

router.post("/chat", async (req, res) => {
    try {
        const { detectedText } = req.body;

        if (!detectedText) {
            return res.status(400).json({ error: "detectedText is required" });
        }

        console.log("Detected text:", detectedText);

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_FOR_ISL_CHATBOT);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `You are an AI assistant powering an Indian Sign Language (ISL) chatbot. Your primary goal is to help users, who communicate via ISL, understand and access relevant Indian government welfare schemes.

Context:
The user has signed a word ${detectedText}.
You are part of a larger platform that helps users find, verify eligibility for, and apply to Indian government schemes.
Information must be current and up-to-date to the best of your knowledge cutoff.

Your Task:

Based on the provided textual keyword(s) (${detectedText}), you need to interpret the correct word as there may be some mistakes in the signed word.
Examples:

G9O → Goa

hapy → happy

od1gy → Odisha

womwn → woman

eductaion → education

disabilty → disability

housng → housing

farmer loan → farmer loan

widow support → widow support

skill training → skill training

Use common-sense and spelling-correction logic to interpret the user intent.

Interpret User Intent:
Determine what information the user is likely seeking about Indian government welfare schemes related to the keyword(s). For example:

"WOMAN" → schemes for women's empowerment, financial aid, health programs.

"FARMER" → crop insurance, subsidies, loans.

"EDUCATION" → scholarships or student loans.

Provide Relevant Information:
Generate a concise response (~50 words) that includes:

A brief overview of relevant scheme types OR

Key eligibility criteria OR

Core benefits OR

General application guidance (e.g., "visit our schemes page", "contact your local CSC").

Links:
Use these links in the response:

CSC Locator: http://localhost:3000/csc

All Schemes: http://localhost:3000/schemes

Language & Tone:
Use simple, clear, and direct language.
Tone must be helpful, empathetic, and supportive.
Ensure the response is directly useful to the user.

Input:
A single keyword or short phrase (e.g., "DISABILITY", "EDUCATION", "PENSION", "HOUSING", "FARMER LOAN", "WIDOW SUPPORT", "SKILL TRAINING", etc).

Output:
A concise, informative, ~50-word response about relevant Indian government schemes, tailored to the keyword.
Include links to:

http://localhost:3000/schemes (for general info)

http://localhost:3000/csc (for nearest help center)

Example Response:
Input Keyword: HOUSING
Response: "For housing, schemes like PMAY offer financial aid to build or buy a home. Eligibility depends on income and family size. Visit our schemes page or check your nearest CSC for help applying`;

        const result = await model.generateContent(prompt);
        const responseText = result?.response.candidates[0].content.parts[0].text;

        console.log("Gemini API response:", result);

        if (typeof responseText === "string") {
            const responseLetters = responseText.split("");
            
            return res.json({ 
                chatResponse: responseText,
                responseLetters: responseLetters
            });
        } else {
            return res.status(500).json({ error: "Invalid response format from chatbot" });
        }

    } catch (error) {
        console.error("Error fetching chat response:", error);
        return res.status(500).json({ error: "Error fetching chat response" });
    }
});

export default router;

