"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { ArrowDown } from 'lucide-react';
import BottomNavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { zkLogin } from "@/utils/zkLogin"; // Placeholder for zkLogin utility function

export default function Home() {
  const [user, setUser] = useState(null);

  // Function to handle zkLogin
  const handleLogin = async () => {
    try {
      // const userData = await zkLogin(); // zkLogin function triggers the Sui zkLogin flow
      //setUser(userData);
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2>Welcome to Suitable 💙</h2>

        {/* Conditionally render the login button or a welcome message if user is authenticated */}
        {!user ? (
          <Button onClick={handleLogin}>
            Login with zkLogin
          </Button>
        ) : (
          <>
            {/* {user.name} */}
            <h3>Welcome, Stan!</h3>
            <Button href="/match">Start Matching</Button>
          </>
        )}

        <h3>Welcome, Stan!</h3>
        <Link href="/match"><Button>Start Matching</Button></Link>
      </main>
    </div>
  );
}
