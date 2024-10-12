import { Button, Card, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { Heart, X } from 'lucide-react';
import BottomNavBar from "@/components/NavBar";

export default function Chat() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none"
        >
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={200}
            src="/hero-card.jpeg"
            width={200}
          />
          <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80">Mathis</p>
          </CardFooter>
        </Card>

        <div className="flex gap-2">
          <Button color='danger' size="lg"><X /></Button>
          <Button color='success' size="lg"><Heart /></Button>
        </div>
        <BottomNavBar />
      </main>
    </div>
  );
}
