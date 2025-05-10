// scripts/sendNative.js
import { ethers } from "hardhat";

async function main() {
  const FUNDING_MANAGER = "0x88DDbd7a2708BcC2B36f01C070772338b776E6F7";
  const [signer] = await ethers.getSigners();

  console.log("👤 From:", signer.address);
  console.log("⛽ Bal WND before:", (await ethers.provider.getBalance(signer.address)).toString());

  // 1 WND = 1 native token
  const amount = ethers.parseUnits("1.0", 18);

  console.log(`🚀 Sending ${ethers.formatEther(amount)} WND to FundingManager…`);
  const tx = await signer.sendTransaction({
    to: FUNDING_MANAGER,
    value: amount,
    // gasLimit/gasPrice se ti servono
  });
  await tx.wait();

  console.log("✅ Sent. New bal:");
  console.log("   Your balance:", ethers.formatEther(await ethers.provider.getBalance(signer.address)));
  console.log("   Manager balance:", ethers.formatEther(await ethers.provider.getBalance(FUNDING_MANAGER)));
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
