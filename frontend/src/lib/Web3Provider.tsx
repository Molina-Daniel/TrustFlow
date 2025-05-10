import React from "react";
import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { http, type Chain } from "viem";

export const westendAssetHub = {
  id: 420420421,
  name: "Westend Asset Hub",
  nativeCurrency: {
    name: "Westend",
    symbol: "WND",
    decimals: 12,
  },
  rpcUrls: {
    default: {
      http: ["https://westend-asset-hub-eth-rpc.polkadot.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "Subscan",
      url: "https://westend-asset-hub-eth-explorer.parity.io",
    },
  },
  testnet: true,
} as const satisfies Chain;

const config = createConfig(
  getDefaultConfig({
    chains: [westendAssetHub],
    transports: {
      [westendAssetHub.id]: http(),
    },
    appName: "TrustFlow",
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID!,
    enableFamily: false,
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider debugMode>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
