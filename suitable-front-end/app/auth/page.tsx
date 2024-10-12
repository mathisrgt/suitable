"use client";

import { Button, Card, CardBody, CardHeader, Link, Progress, Skeleton, Spinner, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { Lock, LockOpen } from 'lucide-react';

import { useAuthCallback } from "@mysten/enoki/react";

import BottomNavBar from "@/components/NavBar";
import { useEffect } from "react";

export default function Auth() {
  const { handled } = useAuthCallback();

  useEffect(() => {
    if (handled) {
      // Get access token, perform security checks,
      // manage user session, handle errors, and so on.
      window.location.href = "/";
    }
  }, [handled]);

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
