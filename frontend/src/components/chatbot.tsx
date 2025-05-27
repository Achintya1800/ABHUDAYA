import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Loader2 } from "lucide-react";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/user/query", { message: input });
      const botResponse = { role: "bot", content: response.data.reply };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <div className="fixed bottom-7 right-8 flex items-center space-x-2 p-2 bg-white rounded-full shadow-lg border border-gray-50">
        <img
          src="/AI.jpg"
          alt="Bot"
          className="h-12 w-12 rounded-full border-2 border-gray-200"
        />
        <Button
          className="bg-black text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="px-4 py-2">सारथीBot</span>
        </Button>
      </div>

      {/* Side Tab (Sheet) for Chatbot */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-[400px] flex flex-col h-full">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold">सारथीBot</SheetTitle>
            <SheetDescription>Your AI-powered assistant</SheetDescription>
          </SheetHeader>

          {/* Chat Messages */}
          <ScrollArea className="flex-grow mt-4 h-[calc(100vh-200px)] overflow-y-auto p-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 my-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-gray-300 text-black self-end ml-auto"
                    : "bg-gray-100 text-black self-start mr-auto"
                }`}
                style={{ wordBreak: "break-word" }}
              >
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input Field & Send Button */}
          <div className="mt-auto flex items-center space-x-2 border-t p-3 bg-white">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow"
            />
            <Button onClick={sendMessage} disabled={isLoading} className="bg-black text-white">
              {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Chatbot;
