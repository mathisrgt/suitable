"use client"; // Enable client-side rendering

import { Button, Card, Link } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import BottomNavBar from "@/components/NavBar";

export default function Account() {
  const [blobID, setBlobID] = useState("");
  const [suins, setSuins] = useState("");

  // Retrieve values from localStorage when the component mounts
  useEffect(() => {
    const storedBlobID = localStorage.getItem("pictureBlobID");
    const storedSuins = localStorage.getItem("SuiNS");

    if (storedBlobID) {
      setBlobID(storedBlobID);
    }
    if (storedSuins) {
      setSuins(storedSuins);
    }
  }, []);

  // Sample profile data (In a real app, this would come from your blockchain or backend)
  const userProfile = {
    name: suins || "Default Name", // Use suins if available
    age: 25,
    bio: "Loves music, travel, and trying out new food! Always up for an adventure.",
    location: "New York, USA",
    interests: ["Music", "Travel", "Food", "Tech"],
    imageUrl: blobID || "/stan3.jpg",
  };

  return (
    <div className="min-h-screen flex flex-col p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 w-full items-center">
        <div className="align-start w-full">
          <h1 className="text-2xl bold">My Profile</h1>
        </div>
        {/* Profile Card */}
        <Card
          isFooterBlurred
          radius="lg"
          className="w-full sm:w-96 border-none flex flex-col items-center gap-4 p-4"
        >
          <Image
            alt={`Profile of ${userProfile.name}`}
            className="object-cover rounded-full"
            height={120}
            width={120}
            src={userProfile.imageUrl} // Use blobID for image source
          />
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">
              {userProfile.name}, {userProfile.age}
            </h1>
            <p className="text-gray-500">{userProfile.location}</p>
            <p className="text-center mt-4 text-gray-700">{userProfile.bio}</p>

            {/* Interests Section */}
            <div className="flex gap-2 mt-4">
              {userProfile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>

            {/* Edit Button */}
            <Link href="/edit-profile">
              <Button className="mt-6" color="primary">
                Edit Profile
              </Button>
            </Link>
          </div>
        </Card>
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}
