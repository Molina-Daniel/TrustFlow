const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { vars } = require("hardhat/config");

const EscrowModule = buildModule("EscrowModule", (m: any) => {

    // const arbiter = m.getParameter("arbiter", );
    // const beneficiary = m.getParameter("beneficiary");
    const arbiter = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";     // hardhat account[1]
    const beneficiary = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // hardhat account[2]
    const escrow = m.contract("Escrow", [arbiter, beneficiary]);

    return { escrow };
});

module.exports = EscrowModule;
