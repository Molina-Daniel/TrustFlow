import { Button } from "../ui/button";
import { DialogDescription } from "../ui/dialog";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
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
const FUNDING_MANAGER_ADDRESS = "0xC151E93e8420415401775d39dc8634F7c6F9E329";

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

const SET_ACCEPTED_TOKEN_ABI = {
  name: "setAcceptedToken",
  type: "function",
  inputs: [
    { name: "token", type: "address" },
    { name: "allowed", type: "bool" },
  ],
  outputs: [],
  stateMutability: "nonpayable",
};

const SET_INITIATIVE_WALLET_ABI = {
  name: "setInitiativeWallet",
  type: "function",
  inputs: [
    { name: "initiativeId", type: "string" },
    { name: "wallet", type: "address" },
  ],
  outputs: [],
  stateMutability: "nonpayable",
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
  const [currentStep, setCurrentStep] = useState(0);
  const [initiativeId, setInitiativeId] = useState("");

  const { data: hash, isPending, sendTransaction } = useSendTransaction();
  const { address } = useAccount();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // After transaction is confirmed, move to the next step
  // This will trigger whenever isConfirmed changes to true
  useEffect(() => {
    if (isConfirmed && currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
      executeCurrentStep();
    }
  }, [isConfirmed]);

  const executeCurrentStep = async () => {
    if (!address) {
      setTransactionError("Please connect your wallet first");
      return;
    }

    try {
      const tokenAddress = TOKEN_ADDRESSES[selectedCrypto];
      const parsedAmount = parseEther(donationAmount);
      const isNativeToken =
        tokenAddress === "0x0000000000000000000000000000000000000000";

      // Create a unique initiative ID if not already set
      if (initiativeId === "") {
        const newInitiativeId = `${title.replace(/\s+/g, "_")}_${Date.now()}`;
        setInitiativeId(newInitiativeId);
      }

      let data;
      let value = 0n;

      // Step 1: Set the token as accepted
      if (currentStep === 0) {
        setDonationStatus("Step 1/3: Setting token as accepted...");
        data = encodeFunctionData({
          abi: [SET_ACCEPTED_TOKEN_ABI],
          functionName: "setAcceptedToken",
          args: [tokenAddress, true],
        });
      }
      // Step 2: Set the initiative wallet
      else if (currentStep === 1) {
        setDonationStatus("Step 2/3: Setting initiative wallet...");
        data = encodeFunctionData({
          abi: [SET_INITIATIVE_WALLET_ABI],
          functionName: "setInitiativeWallet",
          args: [initiativeId, address],
        });
      }
      // Step 3: Make the actual deposit
      else if (currentStep === 2) {
        setDonationStatus("Step 3/3: Processing donation...");
        data = encodeFunctionData({
          abi: [RECORD_DEPOSIT_ABI],
          functionName: "recordDeposit",
          args: [tokenAddress, initiativeId, parsedAmount],
        });
        value = isNativeToken ? parsedAmount : 0n;
      }

      // Send the transaction
      sendTransaction({
        to: FUNDING_MANAGER_ADDRESS,
        data,
        value,
      });
    } catch (error) {
      console.error("Error sending transaction:", error);
      setTransactionError(
        (error as BaseError).shortMessage || "Transaction failed"
      );
    }
  };

  const handleDonation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTransactionError(null);
    setDonationStatus(null);
    setCurrentStep(0);
    setInitiativeId("");

    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      setTransactionError("Please enter a valid donation amount");
      return;
    }

    executeCurrentStep();
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
            Requested: {requestedAmount} {currency}
          </div>

          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span>
                {raisedAmount} {currency} raised
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
                    disabled={currentStep > 0}
                  />
                  <Select
                    value={selectedCrypto}
                    onValueChange={setSelectedCrypto}
                    disabled={currentStep > 0}
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

            {currentStep === 0 && (
              <Button
                type="submit"
                disabled={isPending || isConfirming}
                className="bg-[#37672C] hover:bg-green-600 cursor-pointer min-w-[200px]"
              >
                {isPending ? "Confirming..." : "Donate Now"}
              </Button>
            )}

            {currentStep > 0 && (
              <div className="mt-4 bg-zinc-800 p-4 rounded-md border border-zinc-700">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-zinc-700 text-white mr-2">
                    {currentStep}/3
                  </div>
                  <div className="text-white font-medium">{donationStatus}</div>
                </div>
                <div className="w-full bg-zinc-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-full"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {initiativeId && (
              <div className="text-zinc-400 text-sm mt-2">
                Initiative ID: {initiativeId}
              </div>
            )}

            {transactionError && (
              <div className="text-red-500 text-sm mt-2">
                {transactionError}
              </div>
            )}

            {hash && (
              <div className="text-green-500 text-sm mt-2">
                Transaction Hash: {hash}
              </div>
            )}
            {isConfirming && (
              <div className="text-yellow-500 text-sm mt-2">
                Waiting for confirmation...
              </div>
            )}
            {isConfirmed && currentStep === 3 && (
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
