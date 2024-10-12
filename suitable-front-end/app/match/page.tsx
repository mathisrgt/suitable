"use client";

import { Button, Card, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { Heart, X } from 'lucide-react';
import BottomNavBar from "@/components/NavBar";
import { useState } from "react";
import { useSwipeable } from 'react-swipeable';

// Sample data for matches
const matches = [
  {
    id: 1,
    name: "Mathis",
    image: "/man1.jpg",
  },
  {
    id: 2,
    name: "Alice",
    image: "/woman1.jpg",
  },
  {
    id: 3,
    name: "Bob",
    image: "/woman2.jpg",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("");

  const handleSwipe = (dir: "left" | "right") => {
    setSwipeDirection(dir);
    setTimeout(() => {
      // Move to the next card after the swipe animation completes
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, matches.length - 1));
      setSwipeDirection(""); // Reset swipe direction for the next card
    }, 500); // Match this duration to the CSS transition duration
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true,
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {currentIndex < matches.length && (
          <div
            {...handlers}
            className={`relative transition-transform duration-300 ease-in-out ${swipeDirection === 'left' ? '-translate-x-full' : ''
              } ${swipeDirection === 'right' ? 'translate-x-full' : ''
              }`}
          >
            <Card isFooterBlurred radius="lg" className="border-none w-full">
              <Image
                alt={matches[currentIndex].name}
                className="object-cover"
                height={300}
                src={matches[currentIndex].image}
                width={300}
              />
              <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">{matches[currentIndex].name}</p>
              </CardFooter>
            </Card>
          </div>
        )}

        <div className="flex gap-2">
          <Button color='danger' size="lg" className="rounded-3xl" onClick={() => handleSwipe('left')}><X /></Button>
          <Button color='success' size="lg" className="rounded-3xl" onClick={() => handleSwipe('right')}><Heart color='white' /></Button>
        </div>
        <BottomNavBar />
      </main>
    </div>
  );
}
