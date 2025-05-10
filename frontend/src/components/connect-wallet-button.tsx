import { ConnectKitButton } from "connectkit";
import { Button } from "./ui/button";

const ConnectWalletButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnecting, show }) => {
        return (
          <Button
            onClick={show}
            className="cursor-pointer rounded-lg bg-[#0A2231] border-none px-8 py-6 text-white text-lg font-medium shadow-[0_0_20px_rgba(96,217,221,0.5)] hover:shadow-[0_0_30px_rgba(96,217,221,0.7)]"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectWalletButton;
