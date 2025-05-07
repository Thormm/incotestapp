import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { sepolia } from "wagmi/chains";

import "@rainbow-me/rainbowkit/styles.css";

// RainbowKit + Wagmi config
const config = getDefaultConfig({
  appName: "Incotest App",
  projectId: "8c9fd422f7cdb312ba610265bce94127", // get from https://cloud.walletconnect.com
  chains: [sepolia], // or mainnet, polygon, etc.
  transports: {
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} modalSize="compact">
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
