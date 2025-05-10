import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const SupplyChainVerifierModule = buildModule('SupplyChainVerifierModule', (m) => {
  const supplyChainVerifier = m.contract('SupplyChainVerifier');

  return { supplyChainVerifier };
});

export default SupplyChainVerifierModule;
