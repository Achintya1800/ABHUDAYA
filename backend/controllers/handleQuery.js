import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const handleQuery = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // System prompt to guide Gemini's response structure
    const systemPrompt = `
     Response Structure:
Provide Scheme Information Immediately

Briefly explain the scheme, its purpose, and key benefits.
Example: "PM-KISAN provides ₹6,000 per year to eligible farmers in three installments to support their income."
Mention Eligibility Criteria Clearly

State the requirements upfront.
Example: "This scheme is for land-owning farmers. Institutional landholders and government employees are not eligible."
List Required Documents

Provide a clear list of necessary documents.
Example: "You need an Aadhaar card, bank account details, and land ownership proof."
Guide on the Next Steps

Provide application methods (online/offline).
Mention deadlines or key process details.
Example: "Apply online at pmkisan.gov.in or visit your nearest CSC center."
Optional Follow-Up for Missing Documents

Only ask if the user lacks required documents.
Example: "Do you have these documents ready, or would you like guidance on how to obtain them?"
Offer Additional Help & Closing

Suggest relevant schemes if applicable.
Provide helplines or grievance redressal options.
Example: "If you need further assistance, you can call the PM-KISAN helpline at 155261."
For general queries, keep responses in 3-7 lines.
    `;

    // Call Gemini 1.5 Pro API
    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
      {
        contents: [{ role: "user", parts: [{ text: message }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: "AIzaSyD8qPRiFtUMPhSyAuryQjmTQqI0U1WGbeA" },
      }
    );

    // Extract and clean response
    let reply =
      geminiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, no response.";

    // Remove asterisks (*) from response
    reply = reply.replace(/\*/g, "");

    res.json({ reply });
  } catch (error) {
    console.error("Error processing query:", error.response?.data || error.message);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.response?.data || error.message,
    });
  }
};

export default handleQuery;
