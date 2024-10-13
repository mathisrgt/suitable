"use client";

import { Button, Card, Input, Textarea, Spinner } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useAuthCallback, useEnokiFlow } from "@mysten/enoki/react";
import { Transaction } from "@mysten/sui/transactions";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { module_address } from "@/environment/module";
import BottomNavBar from "@/components/NavBar";
import { executeSponsoTx } from "@/services/sponso";
import { SuinsClient } from '@mysten/suins';

export default function CreateProfileForm() {
  const { handled } = useAuthCallback();
  const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
  const enokiFlow = useEnokiFlow();

  const [pseudo, setPseudo] = useState("");
  const [suinExists, setSuinExists] = useState(false);
  const [description, setDescription] = useState("");
  const [privateReveal, setPrivateReveal] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [pictureFile, setPictureFile] = useState<File | null>(null); // New file state
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (handled) {
      handleConnection();
      checkSuinsExists();
    }
  }, [handled]);

  async function handleConnection() {
    // Optional connection logic when authenticated.
  }

  async function checkSuinsExists() {
    // Logic to check if the Suins exists
  }

  async function handlePseudoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newPseudo = e.target.value;
    setPseudo(newPseudo);
  }

  async function handlePictureChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;
    setPictureFile(file); // Save the selected file
  }

  // Helper to upload the file to Walrus (or similar service)
  async function uploadFile(file: File) {
    const publisherUrl = "https://publisher-devnet.walrus.space";
    const epochs = 1;

    try {
      const response = await fetch(`${publisherUrl}/v1/store?epochs=${epochs}`, {
        method: "PUT",
        body: file,
      });

      if (response.status === 200) {
        const result = await response.json();
        const blobID = result.newlyCreated.blobObject.id
        localStorage.setItem('pictureBlobID', blobID);
        return blobID; // Return the Blob ID
      } else {
        throw new Error("Failed to upload the picture.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  // Handle form submission to the smart contract
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const protocol = window.location.protocol;
    const host = window.location.host;

    const redirectUrl = `${protocol}//${host}/match`;

    try {
      // Upload the picture file if selected
      let pictureBlobId = "";
      if (pictureFile) {
        pictureBlobId = await uploadFile(pictureFile); // Upload the file and get the Blob ID
        console.log("File uploaded with Blob ID:", pictureBlobId);
      }

      // Create a profile on the smart contract
      const tx = new Transaction();

      tx.moveCall({
        target: `${module_address}::suitable_profile::create_profile`,
        arguments: [
          tx.pure.string(description), // Description
          tx.pure.string(privateReveal), // Private reveal
          tx.pure.string(socialMedia), // Social Media
          tx.pure.address(pictureBlobId), // Picture Blob
          tx.pure.address(pictureBlobId), // Private Picture Blob 1
          tx.pure.address(pictureBlobId), // Private Picture Blob 2
          tx.pure.address(pictureBlobId), // Private Picture Blob 3
          tx.pure.address(pictureBlobId), // Private Picture Blob 4
        ],
      });

      // Execute the transaction
      const result = await executeSponsoTx(tx, suiClient, enokiFlow);
      console.log("Profile created successfully:", result);

    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setIsSubmitting(false);
      window.location.href = redirectUrl;
    }
  }

  return (
    <div className="min-h-screen flex flex-col p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 w-full items-center">
        <Card className="w-full sm:w-96 p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Create Your Profile</h1>

            <Input
              label="SuiNS"
              placeholder="Choose a SuiNS (e.g., @username)"
              value={pseudo}
              onChange={handlePseudoChange}
              required
              disabled={suinExists}
            />

            <Input
              label="Description"
              placeholder="Describe yourself"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <Textarea
              label="Private Reveal"
              placeholder="Something private about you"
              value={privateReveal}
              onChange={(e) => setPrivateReveal(e.target.value)}
              required
            />

            <Input
              label="Social Media"
              placeholder="@yourhandle"
              value={socialMedia}
              onChange={(e) => setSocialMedia(e.target.value)}
              required
            />

            <Input
              label="Profile Picture"
              type="file"
              onChange={handlePictureChange} // Handle file input
              required
            />

            <Button type="submit" color="primary" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : "Create Profile"}
            </Button>
          </form>
        </Card>
      </main>

      <BottomNavBar />
    </div>
  );
}
