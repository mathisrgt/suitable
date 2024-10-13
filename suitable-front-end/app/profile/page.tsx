"use client";

import { Button, Card, CardBody, CardHeader, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, Skeleton, Textarea, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { Lock, LockOpen, PartyPopper } from 'lucide-react';

import BottomNavBar from "@/components/NavBar";

export default function Profile() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const userProfile = {
    name: "Stan",
    age: 22,
    bio: "Loves music, travel, and trying out new food! Always up for an adventure.",
    location: "Lausanne, Switzerland",
    interests: ["Music", "Travel", "Food", "Tech"],
    imageUrl: "/stan2.png",
  };

  return (
    <div className="min-h-screen flex flex-col p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 w-full items-center">
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
            src={userProfile.imageUrl}
          />
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">{userProfile.name}, {userProfile.age}</h1>
            <p className="text-gray-500">{userProfile.location}</p>
            <p className="text-center mt-4 text-gray-700">{userProfile.bio}</p>

            {/* Interests Section */}
            <div className="flex gap-2 mt-4">
              {userProfile.interests.map((interest, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>

          </div>
        </Card>

        <Button onPress={onOpen} className="w-full w-9/10 text-white text-lg font-semibold shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transform hover:scale-105 transition-transform" size="lg" color="secondary">
          <LockOpen size='15' />
          Unlock full profile now
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Discover truely Stanislas</ModalHeader>
                <ModalBody>
                  <p>Unlock all the profile to gain a competitive edge. 🚀</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Pay 10 SUI
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Card
          isFooterBlurred
          radius="lg"
          className="w-full sm:w-96 border-none flex flex-col items-center p-4"
        >
          <CardHeader className="justify-between">
            <h4 className="font-bold text-large">What makes you different?</h4>
            <LockOpen size='20' />
          </CardHeader>
          <CardBody>
            {false ? (
              <Textarea
                isDisabled
                defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
              />
            ) : (
              <div className="flex flex-col gap-4">
                <Progress color="primary" aria-label="Loading..." value={100} />

                {/* Wrapping the Button and Skeleton in a relative div */}
                <div className="relative w-full">
                  <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                  </Skeleton>

                  {/* Button with absolute positioning */}
                  <Button
                    color="primary"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    Request
                  </Button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>

        <Card
          isFooterBlurred
          radius="lg"
          className="w-full sm:w-96 border-none flex flex-col items-center p-4"
        >
          <CardHeader className="justify-between">
            <h4 className="font-bold text-large">Pictures</h4>
            <Lock size='20' />
          </CardHeader>
          <CardBody>
            {false ? (
              <Textarea
                isDisabled
                defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
              />
            ) : (
              <div className="flex flex-col gap-4">
                <Progress color="default" aria-label="Loading..." value={50} />

                {/* Wrapping the Button and Skeleton in a relative div */}
                <div className="relative w-full">
                  {/* Skeleton grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="rounded-lg">
                      <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                      <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                      <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                      <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                  </div>

                  {/* Button with absolute positioning */}
                  <Button
                    color="default"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <Lock size='15' />
                    Request
                  </Button>
                </div>
              </div>

            )}
          </CardBody>
        </Card>

        <Card
          isFooterBlurred
          radius="lg"
          className="w-full sm:w-96 border-none flex flex-col items-center p-4"
        >
          <CardHeader className="justify-between">
            <h4 className="font-bold text-large">Social Media</h4>
            <Lock size='20' />
          </CardHeader>
          <CardBody>
            {false ? (
              <Textarea
                isDisabled
                defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
              />
            ) : (
              <div className="flex flex-col gap-4">
                <Progress color="default" aria-label="Loading..." value={25} />

                {/* Wrapping the Button and Skeleton in a relative div */}
                <div className="relative w-full">
                  <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  {/* Button with absolute positioning */}
                  <Button
                    color="default"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <PartyPopper size='15' />
                    Earn 10 SUI
                  </Button>
                </div>
              </div>

            )}
          </CardBody>
        </Card>
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}
