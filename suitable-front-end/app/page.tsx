"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { ArrowDown } from 'lucide-react';
import BottomNavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useEnokiFlow } from '@mysten/enoki/react';
import { google_client_id } from "@/environment/zkLogin";

export default function Home() {
  const [user, setUser] = useState(null);

  const enokiFlow = useEnokiFlow();

  const handleSignIn = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;

    const redirectUrl = `${protocol}//${host}/auth`;

    enokiFlow
      .createAuthorizationURL({
        provider: 'google',
        network: 'testnet',
        clientId: google_client_id,
        redirectUrl,
        extraParams: {
          scope: ['openid', 'email', 'profile'],
        },
      })
      .then((url) => {
        window.location.href = url;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2>Welcome to Suitable 💙</h2>

        <Button onClick={handleSignIn}>
          Login with zkLogin
        </Button>
      </main>
    </div>
  );
}
