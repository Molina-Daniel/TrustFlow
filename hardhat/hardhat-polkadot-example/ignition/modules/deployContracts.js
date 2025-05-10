// ignition/modules/deployContracts.js
const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('DeployContracts', (m) => {
  // 1) StableErc20: mock xDai per i test
  const stable = m.contract('StableErc20');

  // 2) GovToken
  const govToken = m.contract('GovToken');

  // 3) FundingManager(stableToken: IERC20, govToken: GovToken)
  const fundingManager = m.contract('FundingManager', [stable, govToken]);

  // 4) TrustFlow(IVotes)
  const trustFlow = m.contract('TrustFlow', [govToken]);

  // 5) setFundingManager tramite il nuovo metodo pubblico in GovToken
  m.call(govToken, 'setFundingManager', [fundingManager]);

  // 6) trasferisci la proprietà di FundingManager a TrustFlow
  m.call(fundingManager, 'transferOwnership', [trustFlow]);

  // esporta gli handle
  return { stable, govToken, fundingManager, trustFlow };
});
