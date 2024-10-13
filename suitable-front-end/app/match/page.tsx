"use client";

import { Button, Card, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { Heart, X } from 'lucide-react';
import BottomNavBar from "@/components/NavBar";
import { useState, useEffect } from "react";
import { useSwipeable } from 'react-swipeable';
import { Transaction } from '@mysten/sui/transactions';
import { useSuiClient } from "@mysten/dapp-kit";
import { useEnokiFlow } from "@mysten/enoki/react";
import { module_address } from "@/environment/module";
import { executeSponsoTx } from "@/services/sponso";

// Sample data for matches with object addresses/IDs
const matches = [
  {
    id: 1,
    name: "Stan",
    objectId: "qC5TRUsAYGN-o3d128SanMhupCd3rV21vKbqYAXzd70",
    userAddress: "0xfeaa857c9b394931af144ba11781f1cdec26d39204777f6790332a47856a4442",
  },
  {
    id: 2,
    name: "Mathis",
    objectId: "8GJzPT4IVWQ_mAdG5ngJ8iFSIK6P1eP3D_9jnqUZj24",
    userAddress: "0xbdc977c979c9ba1d7a3f4db86db6da37fd01295f327bf4467d615f55ed2d3bc4",
  },
  {
    id: 3,
    name: "Mathieu",
    objectId: "iGUZ-zmdIHD4OC9Ek-8dcHSJn2dr3RwBZnFI-S5ki_I",
    userAddress: "0xb1ad4cfd5b9cc3d26fce5fa476bfe6c303fed3b5283b651b13da69c284cff924",
  },
];

// Walrus API URLs
const WALRUS_AGGREGATOR_URL = "https://aggregator-devnet.walrus.space";

export default function Match() {
  const suiClient = useSuiClient();
  const enokiFlow = useEnokiFlow();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    // Function to fetch image URLs for the matches
    const fetchImages = async () => {
      const urls = matches.map(match => `${WALRUS_AGGREGATOR_URL}/v1/${match.objectId}`);
      setImageUrls(urls);
    };
    fetchImages();
  }, []);

  async function handleSwipe(dir: "left" | "right") {
    setSwipeDirection(dir);
    setTimeout(() => {
      // Move to the next card after the swipe animation completes
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, matches.length - 1));
      setSwipeDirection(""); // Reset swipe direction for the next card
    }, 500); // Match this duration to the CSS transition duration

    // Call "add_like_unlike" from the smart contract
    const tx = new Transaction();

    tx.moveCall({
      target: `${module_address}::suitable_profile::add_like_unlike`,
      arguments: [
        tx.pure.address(matches[currentIndex].userAddress),
        tx.pure.address('0xfeaa857c9b394931af144ba11781f1cdec26d39204777f6790332a47856a4442'), // Example user address
        tx.pure.bool(dir === 'right')
      ],
    });

    executeSponsoTx(tx, suiClient, enokiFlow).then((result) => {
      console.log('RESULT - Like/Unlike:', result);
    });
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {currentIndex < matches.length && imageUrls.length > 0 && (
          <div
            className={`relative transition-transform duration-300 ease-in-out ${swipeDirection === 'left' ? '-translate-x-full' : ''
              } ${swipeDirection === 'right' ? 'translate-x-full' : ''
              }`}
          >
            <Card isFooterBlurred radius="lg" className="border-none w-full">
              <Image
                alt={matches[currentIndex].name}
                className="object-cover"
                height={300}
                src={imageUrls[currentIndex]} // Dynamically load image using object ID
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
