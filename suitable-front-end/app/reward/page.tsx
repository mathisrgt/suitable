import { Button, Card, CardHeader, Link, Progress, Slider } from "@nextui-org/react";
import Image from "next/image";
import { ArrowDownToLine, ArrowUpFromLine, Edit3, Plus } from 'lucide-react'; // Icon for the Edit button
import BottomNavBar from "@/components/NavBar";

export default function Reward() {
  // Sample profile data (In a real app, this would come from your blockchain or backend)
  const userProfile = {
    name: "Mathis",
    age: 25,
    bio: "Loves music, travel, and trying out new food! Always up for an adventure.",
    location: "New York, USA",
    interests: ["Music", "Travel", "Food", "Tech"],
    imageUrl: "/hero-card.jpeg",
  };

  return (
    <div className="min-h-screen flex flex-col p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 w-full items-center">
        <div className="w-full">
          <h1 className="text-2xl bold">My Rewards</h1>
        </div>

        <Card
          isFooterBlurred
          radius="lg"
          className="w-full sm:w-96 border-none flex flex-col items-center p-6"
        >
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="text-center">
              <p className="text-xs">You are</p>
              <h1 className="text-2xl font-bold">Level 1</h1>
            </div>
            <Progress color="primary" className="w-full" size="md" aria-label="Level progress" value={40} />
          </div>
        </Card>

        <Card
          isFooterBlurred
          radius="lg"
          className="w-full sm:w-96 border-none flex flex-col items-center p-6"
        >
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">189.021 SUI</h1>
            <div className="flex gap-2">
              <Button color="primary">
                <Plus />
              </Button>
              <Button
                color="default"
              >
                <ArrowDownToLine />
              </Button>
            </div>
          </div>
        </Card>

        <Card
          isFooterBlurred
          radius="lg"
          className="w-full border-none flex flex-row justify-between items-center py-2 px-4 gap-2"
        >
          <p className="text-xs uppercase font-bold">Today's reward</p>
          <p className="text-xs">+2.521 SUI</p>
          <Button color="danger" size='sm'>Claim</Button>

        </Card>
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}
