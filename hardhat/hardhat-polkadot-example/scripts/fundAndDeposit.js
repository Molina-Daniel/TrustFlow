// scripts/deposit.js
const { ethers } = require("hardhat");

async function main() {
  const [signer] = await ethers.getSigners();

  // ——— CONFIGURAZIONE ———
  const STABLE_ADDR          = "0xB42ffa3F825770F51F702F7F82A4fa900fA17B6C";      // indirizzo StableErc20
  const FUNDING_MANAGER_ADDR = "0x88DDbd7a2708BcC2B36f01C070772338b776E6F7";      // indirizzo FundingManager
  const INITIATIVE_ID        = "test-initiative";
  const AMOUNT               = ethers.parseUnits("10", 18);                      // 10 token da depositare

  console.log("👤  User:", signer.address);

  // 1) attacca al tuo mock‐stable
  const stable = await ethers.getContractAt("StableErc20", STABLE_ADDR, signer);
  // 2) attacca al FundingManager
  const fm     = await ethers.getContractAt("FundingManager", FUNDING_MANAGER_ADDR, signer);

  // 3) Mint a te stesso
  console.log(`⛽ Minting ${AMOUNT} mXDAI to ${signer.address}…`);
  await (await stable.mint(signer.address, AMOUNT)).wait();
  console.log("✅  Balance Stable:", (await stable.balanceOf(signer.address)).toString());

  // 4) Approve
  console.log(`🔐 Approving FundingManager (${FUNDING_MANAGER_ADDR}) to spend…`);
  await (await stable.approve(FUNDING_MANAGER_ADDR, AMOUNT)).wait();
  console.log("✅  Approved allowance.");

  // 5) Deposit vero e proprio
  console.log(`💧 Calling recordDeposit("${INITIATIVE_ID}", ${AMOUNT})…`);
  await (await fm.recordDeposit(INITIATIVE_ID, AMOUNT)).wait();
  console.log("✅  Deposit recorded.");

  // 6) Controlla il tuo GovToken (se ne dai in recordDeposit)
  //    Se nel tuo recordDeposit minti 1 GovToken per deposito, come dicevi,
  //    qui puoi controllare il tuo bilancio:
  const govAddr = await fm.govToken();
  const gov     = await ethers.getContractAt("GovToken", govAddr, signer);
  console.log("🏅 GovToken balance:", (await gov.balanceOf(signer.address)).toString());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
