"use client";
import React, { useState } from "react";
import { X, MessageSquareText } from "lucide-react";
import Chatbot from "./chatbot";
import Hatbot from "./hatbot";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("text"); // Default to text chatbot
  const [isToastVisible, setIsToastVisible] = useState(true);

  return (
    <div className="fixed bottom-8 right-4 z-50">
      {/* Floating Chatbot Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsToastVisible(false); // Hide toast when opening chat
        }}
        className="bg-white text-black px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 border-2 border-black"
      >
        <MessageSquareText size={24} />
        <span>SaarthiBOT</span>
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 bg-white shadow-xl rounded-lg w-80 p-4">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>

          {/* Welcome Toast */}
          {isToastVisible && (
            <div className="absolute top-10 right-2 bg-gray-200 text-gray-700 px-2 py-1 rounded">
              <span>Welcome to the chatbot!</span>
              <button onClick={() => setIsToastVisible(false)} className="ml-2 text-gray-500">
                <X size={16} />
              </button>
            </div>
          )}

          {/* Tabs for Chatbot Selection */}
          <div className="flex border-b mt-6">
            <button
              className={`flex-1 py-2 ${activeTab === "text" ? "border-b-2 border-blue-600 font-bold" : ""}`}
              onClick={() => setActiveTab("text")}
            >
              Text Chatbot
            </button>
            <button
              className={`flex-1 py-2 ${activeTab === "voice" ? "border-b-2 border-blue-600 font-bold" : ""}`}
              onClick={() => setActiveTab("voice")}
            >
              Voice Chatbot
            </button>
          </div>

          {/* Chatbot Component Rendering (Only one chatbot visible at a time) */}
          <div className="mt-4 max-h-80 overflow-y-auto">
            {activeTab === "text" ? <Chatbot /> : <Hatbot />}
          </div>
        </div>
      )}
    </div>
  );
}
