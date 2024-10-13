"use client";

import { Button, Card, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { Heart, X } from 'lucide-react';
import BottomNavBar from "@/components/NavBar";
import { useState } from "react";
import { useSwipeable } from 'react-swipeable';
import { Transaction } from '@mysten/sui/transactions';
import { useSuiClient } from "@mysten/dapp-kit";
import { useEnokiFlow } from "@mysten/enoki/react";
import { enokiClient } from "@/services/enoki";
import { fromBase64, toBase64 } from "@mysten/bcs";

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
  const suiClient = useSuiClient();
  const enokiFlow = useEnokiFlow();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("");

  async function handleSwipe(dir: "left" | "right") {
    setSwipeDirection(dir);
    setTimeout(() => {
      // Move to the next card after the swipe animation completes
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, matches.length - 1));
      setSwipeDirection(""); // Reset swipe direction for the next card
    }, 500); // Match this duration to the CSS transition duration


    // Call "all_like_unlike" from the contact
    const tx = new Transaction();
    const keypair = await enokiFlow.getKeypair();

    tx.moveCall({
      target: '0xc1e58a6273a9a58e4d41c97cc5c3b420ba16c1dc3e857f80f7aef1ee938c241e::suitable_chat',
      arguments: [],
    });

    tx.setGasBudget(1000);

    const txBytes = await tx.build({
      client: suiClient,
      onlyTransactionKind: true,
    });

    const sponsoResp = await enokiClient.createSponsoredTransaction({
      network: "testnet",
      transactionKindBytes: toBase64(txBytes),
      sender: keypair.getPublicKey().toSuiAddress(),
      allowedMoveCallTargets: ['0xb394c0ce819286ef013564057b6974c1445c292e78040f7e482df754670ce9f::counter::getCounter'],
      allowedAddresses: []
    });

    const signature = (await keypair.signTransaction(fromBase64(sponsoResp.bytes))).signature;

    try {
      const execResp = await enokiClient.executeSponsoredTransaction({
        digest: sponsoResp.digest,
        signature: signature,
      });

      console.log('Result of the swip:', execResp)
    } catch (e) {
      console.log(e)
    }

    const handlers = useSwipeable({
      onSwipedLeft: () => handleSwipe('left'),
      onSwipedRight: () => handleSwipe('right'),
      trackMouse: true,
    });
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {currentIndex < matches.length && (
          <div
            // {...handlers}
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
