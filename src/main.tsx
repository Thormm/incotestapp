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
import "@rainbow-me/rainbowkit/styles.css";

// ✅ Only SEI Mainnet
export const seiMainnet = {
  id: 1329,
  name: "Sei Mainnet",
  nativeCurrency: {
    name: "Sei",
    symbol: "SEI",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc.sei-apis.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "SeiScan",
      url: "https://sei.explorers.guru",
    },
  },
};

const config = getDefaultConfig({
  appName: "SEI Wallet App",
  projectId: "8c9fd422f7cdb312ba610265bce94127", // WalletConnect v2 Project ID
  chains: [seiMainnet],
  transports: {
    [seiMainnet.id]: http("https://evm-rpc.sei-apis.com"),
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme()}
          modalSize="compact"
          initialChain={seiMainnet}
        >
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
