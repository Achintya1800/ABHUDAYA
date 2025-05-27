import { useState, useEffect } from "react";
import Image from "next/image";
import { GoogleGenerativeAI } from "@google/generative-ai";

const IMAGE_PATH = "/letters"; // Path where letter images are stored

type GeminiChatbotProps = {
  isOpen: boolean;
  onClose: () => void;
  detectedText: string;
};

function GeminiChatbot({ isOpen, onClose, detectedText }: GeminiChatbotProps) {
  const [chatResponse, setChatResponse] = useState<string>("");
  const [responseLetters, setResponseLetters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentFrame, setCurrentFrame] = useState<number>(0);

  useEffect(() => {
    if (isOpen && detectedText) {
      console.log("Detected text:", detectedText);
      fetchChatResponse(detectedText);
    }
  }, [isOpen, detectedText]);

  useEffect(() => {
    if (responseLetters.length > 0) {
      const interval = setInterval(() => {
        setCurrentFrame((prevFrame) => (prevFrame + 1) % responseLetters.length);
      }, 500); // Change frame every 1/2 second
      return () => clearInterval(interval);
    }
  }, [responseLetters]);

  const fetchChatResponse = async (text: string) => {
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyBecICH8uq3QHnZ7QyJZ5_uhocJAmrcqdY");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Correct model version
  
      const prompt = `Tell me about the schemes from ${text} in 50 words`;
  
      // Correct API request format
      const result = await model.generateContent(prompt)
  
      // Extract response text correctly
      const responseText = result?.response.candidates[0].content.parts[0].text;
      console.log("Gemini API response:", result);

      if (typeof responseText === "string") {
        setChatResponse(responseText);
        setResponseLetters(responseText.split(""));
      } else {
        setChatResponse("Invalid response format from chatbot.");
      }
    } catch (error) {
      console.error("Error fetching chat response:", error);
      setChatResponse("Error fetching chat response.");
    }
    setIsLoading(false);
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-screen overflow-auto">
        <h2 className="text-xl font-bold mb-4">Gemini Chatbot</h2>
        {isLoading ? <p className="text-gray-500">Loading...</p> : <p className="mt-2 p-3 bg-gray-100 rounded overflow-y-auto h-64">{chatResponse}</p>}
        
        <h3 className="text-lg font-semibold mt-4">Scanned Response</h3>
        <div className="flex justify-center items-center mt-2 h-64">
          {responseLetters.length > 0 && (
            responseLetters[currentFrame] !== " " ? (
              <Image 
                src={`${IMAGE_PATH}/${responseLetters[currentFrame].toUpperCase()}.jpg`} 
                alt={responseLetters[currentFrame]} 
                width={200} 
                height={200} 
              />
            ) : (
              <div className="w-12 h-12"></div>
            )
          )}
        </div>
        
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Close</button>
      </div>
    </div>
  ) : null;
}

export default GeminiChatbot;


