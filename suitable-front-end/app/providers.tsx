"use client";

import { FC } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { EnokiFlowProvider } from '@mysten/enoki/react';
import { enoki_public_key } from "@/environment/zkLogin";

const Providers: FC<any> = ({ children }) => {
  // if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {

  return (
    <EnokiFlowProvider apiKey={enoki_public_key}>
      <NextUIProvider>{children}</NextUIProvider>
    </EnokiFlowProvider>
  );
  // }
};

export default Providers;
