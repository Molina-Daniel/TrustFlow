const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("StableToken", (m) => {
  // Deploy the StableErc20 contract with no constructor parameters
  const stableToken = m.contract("StableErc20", []);
  
  // Optional: Mint some initial tokens for testing
  // const mintAmount = ethers.parseUnits("1000", 18); // In case you want to mint tokens
  // m.call(stableToken, "mint", [m.getAccount(0), mintAmount]);
  
  return { stableToken };
});