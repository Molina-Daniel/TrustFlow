// ignition/modules/FundingManager.js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FundingManager", (m) => {
  // indirizzi già deployati
  const stableTokenAddress = "0xB42ffa3F825770F51F702F7F82A4fa900fA17B6C";
  const govTokenAddress    = "0xA36a9239A7D70B38DDe5cbAA5394dFd46f33cb4e";

  // 1) Deploy
  const fundingManager = m.contract("FundingManager", [
    stableTokenAddress,
    govTokenAddress
  ]);

  // 2) (Opzionale) Se vuoi trasferire subito la proprietà a un altro account/contract,
  //    ad esempio a TrustFlow, puoi farlo qui con m.call():
  // const trustFlowAddress = m.incoming("TrustFlow").trustFlow;
  // m.call(fundingManager, "transferOwnership", [trustFlowAddress]);

  return { fundingManager };
});
