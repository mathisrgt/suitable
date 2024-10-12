"use client";

import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Image from "next/image";
import BottomNavBar from "@/components/NavBar";

// Sample chat data
const chatData = {
  name: "Jon",
  profileImage: "/path/to/jon.jpg", // Replace with actual image path
  messages: [
    { id: 1, text: "Love the donut pic. Is that at SK donuts?", sender: "Jon", timestamp: "10:00 AM" },
    { id: 2, text: "Absolutely. It’s the best. Would you want to go this weekend?", sender: "You", timestamp: "10:01 AM" },
    { id: 3, text: "Definitely. I’m free in the afternoon tomorrow.", sender: "Jon", timestamp: "10:02 AM" },
    { id: 4, text: "Perfect. Should we meet at the banana stand at 2?", sender: "You", timestamp: "10:03 AM" },
    { id: 5, text: "Awesome. See you then!", sender: "Jon", timestamp: "10:04 AM" },
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
    <div className="min-h-screen flex flex-col p-8 pb-20 gap-16 sm:p-20">
      {/* Header with contact name and image */}
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

      {/* Messages Container */}
      <div className="flex flex-col gap-4 w-full overflow-y-auto max-h-[60vh] border rounded-lg p-4 bg-gray-100">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-lg ${message.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>
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
        <Button onClick={sendMessage}>Send</Button>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}
