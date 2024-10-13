import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";

import { Onest } from "next/font/google";

export const metadata: Metadata = {
  title: "Suitable.love",
  description: "Decentralised dating app (Sui x BSA hackathon)",
};

const onest = Onest({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${onest.className} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
