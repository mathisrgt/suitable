"use client";

import { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import Image from "next/image";
import BottomNavBar from "@/components/NavBar";
import { Send } from 'lucide-react';

const chatData = {
  name: "Stanislas",
  profileImage: "/stan2.png",
  messages: [
    { id: 1, text: "👋", sender: "Stan", timestamp: "10:00 AM" },
    { id: 2, text: "👋", sender: "You", timestamp: "10:01 AM" },
    { id: 3, text: "Hey, how's it going?", sender: "Stan", timestamp: "10:02 AM" },
  ],
};

export default function Chat() {
  const [input, setInput] = useState(""); // State for the message input
  const [messages, setMessages] = useState(chatData.messages); // Initialize messages

  // Function to handle sending a message
  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { id: messages.length + 1, text: input, sender: "You", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages([...messages, newMessage]); // Add new message to the messages array
      setInput(""); // Clear the input field
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-8 pb-20 gap-8 sm:p-20">
      {/* Header with contact name and image */}
      <Link href='/profile'>
        <div className="flex items-center mb-4">
          <Image
            src={chatData.profileImage}
            alt={chatData.name}
            width={50}
            height={50}
            className="rounded-full object-cover mr-4"
          />
          <h1 className="text-2xl font-bold">{chatData.name}</h1>
        </div>
      </Link>

      {/* Messages Container */}
      <div className="flex flex-col gap-4 w-full overflow-y-auto max-h-[60vh] border rounded-lg p-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-xl ${message.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>
              <p>{message.text}</p>
              <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field for new messages */}
      <div className="flex gap-2 mt-4">
        <Input
          fullWidth
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={sendMessage} color="primary">
          <Send size='20' />
        </Button>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}
