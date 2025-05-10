// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// deployed at 0xC6cFb666E040954a0b5F29580905D926F7cB5205 old version
// deployed at 0xA36a9239A7D70B38DDe5cbAA5394dFd46f33cb4e
contract GovToken is ERC20, ERC20Permit, ERC20Votes, Ownable {
    // Aggiungi il riferimento al FundingManager
    address public fundingManager;
    
    constructor()
        ERC20("Westend Governance Token", "WGT")
        ERC20Permit("Westend Governance Token")
        Ownable(msg.sender)
    {
    }

    // Aggiungi un metodo per impostare l'indirizzo del FundingManager
    function setFundingManager(address _fundingManager) external onlyOwner {
        fundingManager = _fundingManager;
    }

    // Aggiungi un metodo pubblico per il minting, accessibile solo dal FundingManager
    function mintGovernanceTokens(address to, uint256 amount) external {
        require(msg.sender == fundingManager, "Only FundingManager can mint");
        _mint(to, amount);
    }

    // The following overrides are required by Solidity.
    
    function _update(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, amount);
    }

    function nonces(address owner) 
        public 
        view 
        override(ERC20Permit, Nonces) 
        returns (uint256) 
    {
        return super.nonces(owner);
    }
}