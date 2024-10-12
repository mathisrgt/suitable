"use client";

import { Button, Card, CardBody, CardHeader, Link, Progress, Skeleton, Spinner, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { Lock, LockOpen } from 'lucide-react';

import { useAuthCallback, useEnokiFlow } from "@mysten/enoki/react";

import BottomNavBar from "@/components/NavBar";
import { useEffect } from "react";
import { useSuiClient } from "@mysten/dapp-kit";

export default function Auth() {
  const { handled } = useAuthCallback();
  const client = useSuiClient();
  const enokiFlow = useEnokiFlow();

  useEffect(() => {
    if (handled) {
      handleButtonClick();
    }
  }, [handled]);

  async function handleButtonClick() {
    // Get the keypair for the current user.
    const keypair = await enokiFlow.getKeypair();
    console.log("here is the public key:", keypair.getPublicKey());
  }

  return (
    <div className="min-h-screen flex flex-col p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 w-full items-center">
        <Spinner />
        <h1>Trying to authentificate? Let me check...</h1>
      </main>

      <BottomNavBar />
    </div>
  );
}
