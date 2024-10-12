import { Card, CardFooter, Link } from "@nextui-org/react";
import Image from "next/image";
import BottomNavBar from "@/components/NavBar";
import { Progress } from "@nextui-org/react"; // Progress component for progression bars

export default function AllChats() {
  // Sample chat data (this would normally come from your backend or blockchain)
  const chats = [
    {
      id: 1,
      name: "Mathis",
      lastMessage: "Hey! How’s it going?",
      progress: 70, // This represents the chat progression (e.g., 70%)
      imageUrl: "/hero-card.jpeg", // Profile image
    },
    {
      id: 2,
      name: "Lily",
      lastMessage: "Nice to meet you!",
      progress: 30, // Progress could be based on message count or any other criteria
      imageUrl: "/hero-card.jpeg",
    },
    // Add more chats as needed
  ];

  return (
    <div className="min-h-screen flex flex-col p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 w-full items-center">
        {/* Chat list */}
        {chats.map((chat) => (
          <Link href='/chat' className="w-full">
            <Card
              key={chat.id}
              isFooterBlurred
              radius="lg"
              className="w-full sm:w-96 border-none flex flex-row items-center gap-4 p-4"
            >
              <Image
                alt={`Profile of ${chat.name}`}
                className="object-cover rounded-full"
                height={60}
                width={60}
                src={chat.imageUrl}
              />
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg">{chat.name}</p>
                  <span className="text-gray-500 text-sm">2h ago</span>
                </div>
                <p className="text-gray-600">{chat.lastMessage}</p>
                <Progress
                  color="primary"
                  value={chat.progress}
                  className="mt-2"
                  size="sm"
                />
              </div>
            </Card>
          </Link>
        ))}
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}
