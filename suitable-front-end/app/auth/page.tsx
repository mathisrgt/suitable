"use client";

import { Button, Card, CardBody, CardHeader, Link, Progress, Skeleton, Spinner, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { Lock, LockOpen } from 'lucide-react';

import { useAuthCallback, useEnokiFlow } from "@mysten/enoki/react";

import BottomNavBar from "@/components/NavBar";
import { useEffect } from "react";
import { useSuiClient } from "@mysten/dapp-kit";
import { enokiClient } from "@/services/enoki";
import { fromBase64, toBase64 } from "@mysten/bcs";

import { Transaction } from '@mysten/sui/transactions';
import { executeSponsoTx } from "@/services/sponso";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

export default function Auth() {
  const { handled } = useAuthCallback();
  const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
  const enokiFlow = useEnokiFlow();

  useEffect(() => {
    if (handled) {
      handleConnection();
    }
  }, [handled]);

  async function handleConnection() {
    const protocol = window.location.protocol;
    const host = window.location.host;

    const redirectUrl = `${protocol}//${host}/match`;

    // Create a profile on module
    const tx = new Transaction();

    tx.moveCall({
      target: '0x17a36e051335b6c3e8f81c22e263d179a7559667e43dd4df1925407afd164811::suitable_profile::create_profile',
      arguments: [
        tx.pure.string('I love Sui'),
        tx.pure.string('Mathieu dislikes rust'),
        tx.pure.string('@mathis'),
        tx.pure.address('0xfeaa857c9b394931af144ba11781f1cdec26d39204777f6790332a47856a4442'),
        tx.pure.address('0xfeaa857c9b394931af144ba11781f1cdec26d39204777f6790332a47856a4442'),
        tx.pure.address('0xfeaa857c9b394931af144ba11781f1cdec26d39204777f6790332a47856a4442'),
        tx.pure.address('0xfeaa857c9b394931af144ba11781f1cdec26d39204777f6790332a47856a4442'),
        tx.pure.address('0xfeaa857c9b394931af144ba11781f1cdec26d39204777f6790332a47856a4442'),],
    });

    executeSponsoTx(tx, suiClient, enokiFlow).then((result) => {
      console.log('RESULT - Create profile:', result);

      window.location.href = redirectUrl;
    });
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
