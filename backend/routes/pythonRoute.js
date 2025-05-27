import express from "express";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url"; // Needed for __dirname equivalent in ES modules

const router = express.Router();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/run-python", (req, res) => {
    const pythonScriptPath = path.join(__dirname, "../../islllll/jasonified.py");
    const pythonPath = path.resolve(__dirname, "../forisl/Scripts/python.exe");
    const scriptPath = path.resolve(__dirname, "../../islllll/jasonified.py");

    exec(`"${pythonPath}" "${scriptPath}"`, (error, stdout, stderr) => {
        console.log("Raw stdout:", stdout);  // Debugging log
        
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).json({ error: "Error executing script" });
        }
        if (stderr) {
            console.error(`Python script error: ${stderr}`);
        }
        
        try {
            // Filter out non-JSON log messages
            const jsonLines = stdout.split("\n").filter(line => {
                try {
                    return JSON.parse(line);
                } catch {
                    return false;
                }
            });

            console.log("Filtered JSON:", jsonLines); // Debugging log

            if (jsonLines.length === 0) {
                throw new Error("No valid JSON output found");
            }

            const parsedOutput = JSON.parse(jsonLines[jsonLines.length - 2]); // Parse the last valid JSON line
            console.log("Final Parsed Output", parsedOutput);
            
            // Join array of characters and return as a string
            const joinedOutput = parsedOutput.predicted_characters.join('');
            return res.json({ output: joinedOutput });
        } catch (parseError) {
            console.error("Error parsing JSON output:", parseError);
            return res.status(500).json({ error: "Invalid JSON output from Python script" });
        }
    });
});

export default router;
