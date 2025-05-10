// ignition/modules/FundingManager.js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FundingManager", (m) => {
  // indirizzi già deployati
  const stableTokenAddress = "0xB42ffa3F825770F51F702F7F82A4fa900fA17B6C";
  const govTokenAddress    = "0xA36a9239A7D70B38DDe5cbAA5394dFd46f33cb4e";

  // 1) Deploy del FundingManager
  const fundingManager = m.contract("FundingManager", [
    govTokenAddress
  ]);

  // 2) Abilita lo stableToken
  m.call(
    fundingManager,
    "setAcceptedToken",
    [ stableTokenAddress, true ],
    { id: "enableStable" }      // <<< qui l'ID unico
  );

  // 3) Abilita il token nativo
  m.call(
    fundingManager,
    "setAcceptedToken",
    [ "0x0000000000000000000000000000000000000000", true ],
    { id: "enableNative" }      // <<< un altro ID unico
  );

  return { fundingManager };
});
