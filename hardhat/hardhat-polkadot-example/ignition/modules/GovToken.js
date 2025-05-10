const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GovToken", (m) => {
  // Deploy the GovToken contract with no constructor parameters
  const govToken = m.contract("GovToken", []);
  
  return { govToken };
});