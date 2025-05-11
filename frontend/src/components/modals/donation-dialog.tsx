import { Button } from "../ui/button";
import { DialogDescription } from "../ui/dialog";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  useSendTransaction,
  useWaitForTransactionReceipt,
  type BaseError,
  useAccount,
} from "wagmi";
import { parseEther, encodeFunctionData } from "viem";

// Token addresses map - replace with actual token addresses
const TOKEN_ADDRESSES: Record<string, `0x${string}`> = {
  USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" as `0x${string}`, // Example USDC address
  USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7" as `0x${string}`, // Example USDT address
  WND: "0x0000000000000000000000000000000000000000" as `0x${string}`, // Native token (represented as 0x0)
  DAI: "0x6b175474e89094c44da98b954eedeac495271d0f" as `0x${string}`, // Example DAI address
  BTC: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599" as `0x${string}`, // Example WBTC address
  ETH: "0x0000000000000000000000000000000000000000" as `0x${string}`, // Native token (represented as 0x0)
};

// FundingManager contract address
const FUNDING_MANAGER_ADDRESS = "0xc45878BD349C415B80c2Fa1BC5D0CB80c614100c";

// Contract ABIs
const RECORD_DEPOSIT_ABI = {
  name: "recordDeposit",
  type: "function",
  inputs: [
    { name: "token", type: "address" },
    { name: "initiativeId", type: "string" },
    { name: "amount", type: "uint256" },
  ],
  outputs: [],
  stateMutability: "payable",
};

interface DonationDialogProps {
  title: string;
  imageUrl: string;
  daysLeft: number;
  category: string;
  description: string;
  requestedAmount: string;
  currency: string;
  raisedAmount: string;
  percentageFunded: number;
  target: string;
}

const DonationDialog = ({
  title,
  imageUrl,
  daysLeft,
  category,
  description,
  requestedAmount,
  currency,
  raisedAmount,
  percentageFunded,
  target,
}: DonationDialogProps) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("USDC");
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [donationStatus, setDonationStatus] = useState<string | null>(null);

  const { data: hash, isPending, sendTransaction } = useSendTransaction();
  const { address } = useAccount();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleDonation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTransactionError(null);
    setDonationStatus(null);

    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      setTransactionError("Please enter a valid donation amount");
      return;
    }

    if (!address) {
      setTransactionError("Please connect your wallet first");
      return;
    }

    try {
      const tokenAddress = TOKEN_ADDRESSES[selectedCrypto];
      const parsedAmount = parseEther(donationAmount);
      const isNativeToken =
        tokenAddress === "0x0000000000000000000000000000000000000000";

      // Generate a unique initiative ID using the title and a timestamp
      // This helps avoid collisions if there are multiple donations with the same title
      const initiativeId = `${title}_${Date.now()}`;

      // Encode the function data for the recordDeposit function call
      const data = encodeFunctionData({
        abi: [RECORD_DEPOSIT_ABI],
        functionName: "recordDeposit",
        args: [tokenAddress, initiativeId, parsedAmount],
      });
      console.log("data", data);

      setDonationStatus(
        "Note: The contract owner must approve the token and set the initiative wallet before your donation can be processed."
      );

      // Send the transaction
      sendTransaction({
        to: FUNDING_MANAGER_ADDRESS,
        data,
        value: isNativeToken ? parsedAmount : 0n, // Only send value if using native token
      });
    } catch (error) {
      console.error("Error sending transaction:", error);
      setTransactionError(
        (error as BaseError).shortMessage || "Transaction failed"
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative md:w-2/5">
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
            Donations Open <span className="ml-2">🔥</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-10 bg-gradient-to-b from-black to-white rounded-md px-3 py-1.5 opacity-60">
          <div className="text-white text-xl font-bold">
            {daysLeft} days left
          </div>
        </div>
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover aspect-square rounded-md md:aspect-auto"
        />
      </div>

      <div className="p-6 md:w-3/5 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">{title}</h2>

          <div className="flex flex-col sm:flex-row gap-3 mb-4 text-sm">
            <div className="flex items-center bg-zinc-800 rounded-md px-3 py-1.5 border border-[#2F80ED]">
              <span className="mr-2">Status:</span>
              <span className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Open
              </span>
            </div>

            <div className="bg-zinc-800 text-blue-400 rounded-md px-3 py-1.5  border border-[#2F80ED]">
              {category}
            </div>
          </div>

          <DialogDescription className="text-lg mb-5 text-white">
            {description}
          </DialogDescription>

          <div className="mb-5 text-[#818181]">
            Requested: {currency} {requestedAmount}
          </div>

          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span>
                {currency} {raisedAmount}raised
              </span>
              <span>{percentageFunded}% Funded</span>
            </div>
            <div className="flex items-center gap-2 bg-[#64CFF6] rounded-md p-0.5">
              <Progress
                value={percentageFunded}
                className="flex-1 h-2 bg-black"
                indicatorClassName="bg-[#64CFF6]"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <form onSubmit={handleDonation} className="space-y-4">
            <div className="mb-4 space-y-4">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="donation-amount"
                  className="text-sm font-medium"
                >
                  Donation Amount
                </label>
                <div className="flex gap-2">
                  <Input
                    id="donation-amount"
                    type="number"
                    placeholder="0.00"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="flex-1 bg-zinc-800 border-zinc-700 text-white"
                    required
                  />
                  <Select
                    value={selectedCrypto}
                    onValueChange={setSelectedCrypto}
                  >
                    <SelectTrigger className="w-24 bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="WND">WND</SelectItem>
                      <SelectItem value="DAI">DAI</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending || isConfirming}
              className="bg-[#37672C] hover:bg-green-600 cursor-pointer min-w-[200px]"
            >
              {isPending
                ? "Confirming..."
                : isConfirming
                ? "Processing..."
                : "Donate Now"}
            </Button>

            {donationStatus && (
              <div className="text-yellow-400 text-sm mt-2">
                {donationStatus}
              </div>
            )}

            {transactionError && (
              <div className="text-red-500 text-sm mt-2">
                {transactionError}
              </div>
            )}

            {hash && (
              <div className="text-green-500 text-sm mt-2">
                <div>Transaction Hash:</div>
                <div className="overflow-hidden text-ellipsis break-all hover:overflow-visible">
                  {hash}
                </div>
              </div>
            )}
            {isConfirming && (
              <div className="text-yellow-500 text-sm mt-2">
                Waiting for confirmation...
              </div>
            )}
            {isConfirmed && (
              <div className="text-green-500 text-sm mt-2">
                Donation confirmed! Thank you for your support.
              </div>
            )}
          </form>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
              <span>Target: {target}</span>
            </div>
            <Button className="bg-[#2C586782] px-3 py-1 rounded-md cursor-pointer">
              Open Donations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDialog;
