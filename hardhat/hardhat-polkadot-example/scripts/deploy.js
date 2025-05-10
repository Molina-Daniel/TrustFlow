// scripts/deployTrustFlow.js
const hre = require("hardhat");

async function main() {
  const govTokenAddress = "0xA36a9239A7D70B38DDe5cbAA5394dFd46f33cb4e";
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying TrustFlow from", deployer.address);

  const TF = await hre.ethers.getContractFactory("TrustFlow");
  const tf  = await TF.deploy(
    govTokenAddress,
    {
      gasLimit: 4_000_000,
      gasPrice: hre.ethers.utils.parseUnits("3", "gwei"),
    }
  );
  await tf.deployed();

  console.log("TrustFlow deployed at:", tf.address);
}

main().catch(console.error);
