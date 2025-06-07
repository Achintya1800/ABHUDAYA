// export default upload;

import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleAuth } from 'google-auth-library';
import mongoose from "mongoose";
import User from "../models/user.js";

dotenv.config();

// Initialize Google Auth for Vertex AI API
const auth = new GoogleAuth({
    keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

// Function to get access token
const getAccessToken = async () => {
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    return accessToken.token;
};

// Rate limiting for Vertex AI API
let lastVertexCall = 0;
const VERTEX_RATE_LIMIT_MS = 1000; // 1 second between calls

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Set up multer for local file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploads/";
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter to allow multiple file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const allowedMimeTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
        'application/pdf'
    ];
    const mimetype = allowedMimeTypes.includes(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error("Only image files (jpeg, jpg, png, gif) and PDF documents are allowed!"), false);
    }
};

// Initialize multer middleware
const uploadMiddleware = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).single("file");

// Function to convert file to base64
const convertFileToBase64 = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File does not exist: ${filePath}`);
        }
        
        const fileBuffer = fs.readFileSync(filePath);
        const base64 = fileBuffer.toString('base64');
        const mimeType = getMimeType(filePath);
        
        return {
            mimeType,
            data: base64
        };
    } catch (error) {
        console.error("Error converting file to base64:", error);
        throw new Error(`Failed to convert file to base64: ${error.message}`);
    }
};

// Function to get MIME type
const getMimeType = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.pdf': 'application/pdf'
    };
    return mimeTypes[ext] || 'application/octet-stream';
};

// Function to process document with Vertex AI REST API
const processDocumentWithVertexAI = async (filePath) => {
    try {
        console.log("Processing document with Vertex AI Gemini Vision API");
        
        // Rate limiting
        const now = Date.now();
        const timeSinceLastCall = now - lastVertexCall;
        if (timeSinceLastCall < VERTEX_RATE_LIMIT_MS) {
            await delay(VERTEX_RATE_LIMIT_MS - timeSinceLastCall);
        }
        lastVertexCall = Date.now();

        const { mimeType, data } = convertFileToBase64(filePath);
        const accessToken = await getAccessToken();
        
        const prompt = `
Analyze this document image and extract the following information:

1. Full Name: Extract the complete name of the person
2. Date of Birth: Find the date of birth and convert it to DDMMYYYY format (without separators)
3. Document Type: Identify what type of document this is

Instructions:
- Look carefully for personal information in the document
- For dates, convert any format (DD/MM/YYYY, DD-MM-YYYY, etc.) to DDMMYYYY format
- If you cannot find a piece of information, use "Unable to extract"
- Be thorough in your analysis

Return ONLY a JSON object in this exact format:
{
    "full_name": "<extracted name or 'Unable to extract'>",
    "dob": "<date in DDMMYYYY format or 'Unable to extract'>",
    "document_type": "<document type or 'Unknown'>"
}
`;

        const requestBody = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: prompt },
                        {
                            inline_data: {
                                mime_type: mimeType,
                                data: data
                            }
                        }
                    ]
                }
            ],
            generation_config: {
                max_output_tokens: 2048,
                temperature: 0.1,
                top_p: 0.8,
            }
        };

        const apiUrl = `https://${process.env.GOOGLE_CLOUD_LOCATION || 'us-central1'}-aiplatform.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT_ID}/locations/${process.env.GOOGLE_CLOUD_LOCATION || 'us-central1'}/publishers/google/models/gemini-2.5-flash-preview-05-20:generateContent`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        const text = result.candidates[0].content.parts[0].text;

        console.log("Vertex AI raw response:", text);

        // Clean and parse the response
        let cleanedResponse = text.replace(/```json|```/g, '').trim();
        
        try {
            const parsedData = JSON.parse(cleanedResponse);
            return JSON.stringify(parsedData);
        } catch (parseError) {
            console.error("Failed to parse Vertex AI response as JSON:", parseError);
            
            // Fallback: try to extract information manually from the text
            return extractInfoFromText(text);
        }

    } catch (error) {
        console.error("Vertex AI processing failed:", error);
        
        // Return error response
        return JSON.stringify({
            "full_name": "Unable to extract",
            "dob": "Unable to extract",
            "document_type": "Unknown",
            "error": "Document processing failed"
        });
    }
};

// Fallback function to extract info from text response
const extractInfoFromText = (text) => {
    try {
        let fullName = "Unable to extract";
        let dob = "Unable to extract";
        let documentType = "Unknown";

        // Try to find name patterns
        const nameMatches = text.match(/(?:name|Name|NAME)[:\s]*([A-Za-z\s]{3,50})/i);
        if (nameMatches && nameMatches[1]) {
            fullName = nameMatches[1].trim();
        }

        // Try to find date patterns
        const dateMatches = text.match(/(?:birth|Birth|DOB|dob)[:\s]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i);
        if (dateMatches && dateMatches[1]) {
            const dateStr = dateMatches[1].replace(/[\/\-\.]/g, '');
            if (dateStr.length === 8) {
                dob = dateStr;
            }
        }

        // Try to identify document type
        if (text.toLowerCase().includes('pan')) {
            documentType = "PAN Card";
        } else if (text.toLowerCase().includes('aadhaar') || text.toLowerCase().includes('आधार')) {
            documentType = "Aadhaar Card";
        } else if (text.toLowerCase().includes('passport')) {
            documentType = "Passport";
        } else if (text.toLowerCase().includes('license')) {
            documentType = "Driving License";
        }

        return JSON.stringify({
            "full_name": fullName,
            "dob": dob,
            "document_type": documentType
        });

    } catch (error) {
        console.error("Text extraction failed:", error);
        return JSON.stringify({
            "full_name": "Unable to extract",
            "dob": "Unable to extract",
            "document_type": "Unknown"
        });
    }
};

// Function to compare extracted info with database using Vertex AI
const compareWithDatabase = async (extractedInfo) => {
    try {
        // Rate limiting for Vertex AI API
        const now = Date.now();
        const timeSinceLastCall = now - lastVertexCall;
        if (timeSinceLastCall < VERTEX_RATE_LIMIT_MS) {
            await delay(VERTEX_RATE_LIMIT_MS - timeSinceLastCall);
        }
        lastVertexCall = Date.now();

        let parsedInfo;
        try {
            parsedInfo = typeof extractedInfo === 'string' ? 
                JSON.parse(extractedInfo.replace(/```json|```/g, '').trim()) : 
                extractedInfo;
        } catch (e) {
            console.error("Error parsing extractedInfo:", e);
            return { 
                isMatch: false, 
                message: "Unable to process document information. Please try again with a clearer document."
            };
        }

        const extractedName = parsedInfo.full_name;
        const extractedDOB = parsedInfo.dob;

        // Handle extraction failures
        if (extractedName === "Unable to extract" || extractedDOB === "Unable to extract") {
            return {
                isMatch: false,
                userFound: false,
                message: "Unable to extract clear information from the document. Please ensure the document is well-lit and all text is clearly visible, then try again."
            };
        }

        // Find user in database
        const user = await User.findOne({ full_name: extractedName });
        
        if (!user) {
            console.log("No user found in database with name:", extractedName);
            return { 
                isMatch: false,
                userFound: false,
                extractedName: extractedName,
                extractedDOB: extractedDOB,
                documentType: parsedInfo.document_type || "Unknown",
                message: "No user found in database with this name. Please verify your information or register first."
            };
        }

        const storedDOB = user.dob.toString();
        
        // Simple comparison first
        const isDirectMatch = extractedDOB === storedDOB;
        
        if (isDirectMatch) {
            return {
                isMatch: true,
                userFound: true,
                message: "✅ Document verification successful! All information matches our records perfectly."
            };
        }

        // If no direct match, use Vertex AI for intelligent comparison
        try {
            const accessToken = await getAccessToken();
            
            const prompt = `
Compare these two dates and determine if they represent the same date:

Extracted from document: ${extractedDOB}
Stored in database: ${storedDOB}

Consider that:
- Dates might be in different formats
- There might be minor OCR errors
- Both should represent the same date of birth

Respond with JSON:
{
  "isMatch": true/false,
  "message": "Clear explanation for the user"
}

If they don't match, provide guidance on how to correct the discrepancy.
`;
            
            const requestBody = {
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: prompt }]
                    }
                ],
                generation_config: {
                    max_output_tokens: 1024,
                    temperature: 0.1,
                }
            };

            const apiUrl = `https://${process.env.GOOGLE_CLOUD_LOCATION || 'us-central1'}-aiplatform.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT_ID}/locations/${process.env.GOOGLE_CLOUD_LOCATION || 'us-central1'}/publishers/google/models/gemini-2.5-flash-preview-05-20:generateContent`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            const responseText = result.candidates[0].content.parts[0].text;
            
            try {
                const parsedResponse = JSON.parse(responseText.replace(/```json|```/g, '').trim());
                return {
                    ...parsedResponse,
                    userFound: true
                };
            } catch (e) {
                console.error("Invalid JSON from Vertex AI:", responseText);
                return {
                    isMatch: false,
                    userFound: true,
                    message: "Date of birth mismatch detected. Please verify your document details and update if necessary to avoid application rejections."
                };
            }
            
        } catch (vertexAIError) {
            console.error("Vertex AI comparison failed:", vertexAIError);
            return {
                isMatch: false,
                userFound: true,
                message: "Date of birth mismatch detected. Please verify your document details and update if necessary to avoid application rejections."
            };
        }
        
    } catch (error) {
        console.error("Database comparison error:", error);
        return {
            isMatch: false,
            message: "Unable to verify document at this time. Please try again later."
        };
    }
};

// Main upload controller
const upload = (req, res) => {
    uploadMiddleware(req, res, async (err) => {
        if (err) {
            console.log("Upload middleware error:", err);
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            console.log("No file uploaded");
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log("File uploaded:", req.file.filename);

        try {
            // Process document using Vertex AI Gemini Vision API
            console.log("Starting document processing...");
            const extractedInfo = await processDocumentWithVertexAI(req.file.path);
            console.log("Extracted Info:", extractedInfo);
            
            // Compare with database
            console.log("Comparing with database...");
            const comparisonResult = await compareWithDatabase(extractedInfo);
            console.log("Comparison Result:", comparisonResult);

            // Clean up temporary file
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
                console.log("Temporary file deleted");
            }

            // Send response
            const response = {
                message: "Document processed successfully",
                extracted_info: extractedInfo,
                comparison_result: comparisonResult
            };

            res.status(200).json(response);
            
        } catch (processingError) {
            console.error("Processing Error:", processingError);
            
            // Clean up temporary file
            if (req.file && req.file.path && fs.existsExists(req.file.path)) {
                fs.unlinkSync(req.file.path);
                console.log("Temporary file deleted after error");
            }
            
            res.status(500).json({ 
                error: "Document processing failed",
                details: processingError.message,
                suggestion: "Please ensure the document is clear and readable, then try again."
            });
        }
    });
};

export default upload;