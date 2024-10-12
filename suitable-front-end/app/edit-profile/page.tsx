"use client";

import { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import Image from "next/image";
import BottomNavBar from "@/components/NavBar";

export default function EditProfile() {
  // Sample user profile data (replace with actual user data from the backend or blockchain)
  const [profile, setProfile] = useState({
    name: "Mathis",
    age: 25,
    bio: "Loves music, travel, and trying out new food!",
    location: "New York, USA",
    profileImage: "/hero-card.jpeg", // Placeholder image
  });

  // Handler for form changes with correct typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handler for profile image change
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, profileImage: imageUrl });
    }
  };

  // Placeholder save function (would update data on backend or blockchain)
  const saveProfile = () => {
    console.log("Profile saved:", profile);
    alert("Profile updated!");
  };

  return (
    <div className="min-h-screen flex flex-col p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 w-full items-center">
        <h1 className="text-2xl font-bold">Edit Profile</h1>

        {/* Profile Picture Upload */}
        <div className="relative flex flex-col items-center">
          <Image
            src={profile.profileImage}
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full object-cover"
          />
          <label htmlFor="profileImage" className="mt-2 cursor-pointer text-blue-500">
            Change Profile Picture
          </label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
          />
        </div>

        {/* Profile Edit Form */}
        <form className="flex flex-col gap-4 w-full sm:w-96">
          <Input
            label="Name"
            name="name"
            value={profile.name}
            placeholder="Enter your name"
            onChange={handleInputChange}
          />
          <Input
            label="Age"
            name="age"
            type="number"
            value={profile.age.toString()}
            placeholder="Enter your age"
            onChange={handleInputChange}
          />
          <Input
            label="Location"
            name="location"
            value={profile.location}
            placeholder="Enter your location"
            onChange={handleInputChange}
          />
          <Textarea
            label="Bio"
            name="bio"
            value={profile.bio}
            placeholder="Tell something about yourself"
            onChange={handleInputChange}
          />
          <Button className="mt-4" color="primary" onClick={saveProfile}>
            Save Changes
          </Button>
        </form>
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}
