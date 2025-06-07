
const { spawn } = require('child_process');
const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Add this line to load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY_FOR_ISL = process.env.GEMINI_API_KEY_FOR_ISL; // Use environment variable

app.get('/predict', (req, res) => {
    const pythonProcess = spawn('python', ['islllll/finalll.py']);
    
    pythonProcess.stdout.on('data', async (data) => {
        try {
            const jsonData = JSON.parse(data.toString());
            console.log('Received JSON:', jsonData);
            
            const chatbotResponse = await sendToGemini(jsonData);
            res.json({ chatbotResponse });
        } catch (error) {
            console.error('Error processing JSON:', error);
            res.status(500).json({ error: 'Failed to process JSON' });
        }
    });
    
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data.toString()}`);
    });
});

async function sendToGemini(message) {
    try {
        const response = await axios.post(
            'https://api.gemini.com/v1/chat',
            { message },
            { headers: { 'Authorization': `Bearer ${GEMINI_API_KEY_FOR_ISL}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending to Gemini:', error);
        return { error: 'Failed to communicate with Gemini API' };
    }
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});