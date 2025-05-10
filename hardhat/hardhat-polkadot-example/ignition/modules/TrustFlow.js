// ignition/modules/DeployTrustFlow.js
const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('DeployTrustFlow', (m) => {
  //
  // 1) Se GovToken è già deployato in precedenza, inserisci qui
  //    il suo indirizzo hard-coded:
  //
  const govTokenAddress = '0xA36a9239A7D70B38DDe5cbAA5394dFd46f33cb4e';

  //
  // 2) Definisci il deploy del contract TrustFlow(IVotes _token)
  //
  const trustFlow = m.contract(
    'TrustFlow',
    [ govTokenAddress ],          // l’unico parametro del costruttore
    {
      // (opzionale) override di gasLimit se ti serve
      gasLimit: 12_000_000
    }
  );

  //
  // 3) Esporta l’handle per leggere l’indirizzo dopo il deploy
  //
  return { trustFlow };
});
