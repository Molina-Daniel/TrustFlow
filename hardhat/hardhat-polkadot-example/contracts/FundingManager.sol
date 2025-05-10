// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./GovToken.sol";

//deployed at 0x88DDbd7a2708BcC2B36f01C070772338b776E6F7  

contract FundingManager is Ownable {
    IERC20 public immutable stableToken;
    GovToken public immutable govToken;

    mapping(string => uint256) public totalByInitiative;
    mapping(string => address) public walletByInitiative;
    mapping(address => mapping(string => uint256)) public donated;

    event DepositRecorded(address indexed donor, uint256 amount, string initiativeId);
    event Distributed(string initiativeId, address indexed to, uint256 amount);

    constructor(IERC20 _stableToken, GovToken _govToken) Ownable(msg.sender) {
        stableToken = _stableToken;
        govToken = _govToken;
        
        // Opzionale: imposta questo contratto come FundingManager nel GovToken
        // Decommentare dopo aver implementato setFundingManager in GovToken
        //govToken.setFundingManager(address(this));
    }

    function recordDeposit(string calldata initiativeId, uint256 amount) external {
        address recip = walletByInitiative[initiativeId];
        require(recip != address(0), "Initiative wallet not set");
        require(stableToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        donated[msg.sender][initiativeId] += amount;
        totalByInitiative[initiativeId] += amount;
        
        // Usa il nuovo metodo pubblico invece di _mint
        govToken.mintGovernanceTokens(msg.sender, 1e18);
        
        emit DepositRecorded(msg.sender, amount, initiativeId);
    }

    function distribute(string calldata initiativeId, uint256 amount) external onlyOwner {
        address recip = walletByInitiative[initiativeId];
        require(recip != address(0), "Initiative wallet not set");
        require(totalByInitiative[initiativeId] >= amount, "Insufficient funds");

        totalByInitiative[initiativeId] -= amount;
        require(stableToken.transfer(recip, amount), "Transfer failed");
        emit Distributed(initiativeId, recip, amount);
    }

    function setInitiativeWallet(string calldata initiativeId, address wallet) external onlyOwner {
        walletByInitiative[initiativeId] = wallet;
    }
}