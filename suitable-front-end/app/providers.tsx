"use client";

import { FC } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { EnokiFlowProvider } from '@mysten/enoki/react';
import { enoki_public_key } from "@/environment/zkLogin";
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';

const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  devnet: { url: getFullnodeUrl('devnet') },
});

const Providers: FC<any> = ({ children }) => {
  // if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  return (
    <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
      <EnokiFlowProvider apiKey={enoki_public_key}>
        <NextUIProvider>{children}</NextUIProvider>
      </EnokiFlowProvider>
    </SuiClientProvider>
  );
  // }
};

export default Providers;
