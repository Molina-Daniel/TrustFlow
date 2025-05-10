// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./GovToken.sol";

 // deployed at 0xC151E93e8420415401775d39dc8634F7c6F9E329
contract FundingManager is Ownable {
    GovToken public immutable govToken;

    // quali token ERC-20 accettiamo (address(0) = native)
    mapping(address => bool) public acceptedTokens;

    // totale raccolto per [token][initiativeId]
    mapping(address => mapping(string => uint256)) public totalByInitiative;
    // wallet beneficiario per initiativeId
    mapping(string => address) public walletByInitiative;
    // quanto ha donato ciascun utente per [user][initiativeId][token]
    mapping(address => mapping(string => mapping(address => uint256))) public donated;

    event TokenAccepted(address indexed token, bool indexed accepted);
    event InitiativeWalletSet(string initiativeId, address indexed wallet);
    event DepositRecorded(address indexed donor, address indexed token, uint256 amount, string initiativeId);
    event Distributed(address indexed token, string initiativeId, address indexed to, uint256 amount);

    constructor(GovToken _govToken) Ownable(msg.sender) {
        govToken = _govToken;
    }

    /// @notice Aggiunge o rimuove un ERC-20 dalla lista dei token accettati
    function setAcceptedToken(address token, bool allowed) external onlyOwner {
        acceptedTokens[token] = allowed;
        emit TokenAccepted(token, allowed);
    }

    /// @notice Imposta il wallet beneficiario per un’iniziativa
    function setInitiativeWallet(string calldata initiativeId, address wallet) external onlyOwner {
        walletByInitiative[initiativeId] = wallet;
        emit InitiativeWalletSet(initiativeId, wallet);
    }

    /// @notice Deposita `amount` di `token` a favore di `initiativeId`
    /// @dev se token==address(0) usa `msg.value`, altrimenti ERC-20.transferFrom
    function recordDeposit(
        address token,
        string calldata initiativeId,
        uint256 amount
    ) external payable {
        require(acceptedTokens[token], "Token non accettato");
        address recip = walletByInitiative[initiativeId];
        require(recip != address(0), "Initiative wallet not set");

        if (token == address(0)) {
            // deposito native
            require(msg.value == amount, "Wrong native amount");
        } else {
            require(msg.value == 0,               "Non-zero native with ERC20");
            require(IERC20(token).transferFrom(msg.sender, address(this), amount),
                    "ERC20 transferFrom fallito");
        }

        // bookkeeping
        donated[msg.sender][initiativeId][token] += amount;
        totalByInitiative[token][initiativeId] += amount;

        // premio fisso: 1 WGT
        govToken.mintGovernanceTokens(msg.sender, 1e18);

        emit DepositRecorded(msg.sender, token, amount, initiativeId);
    }

    /// @notice Distribuisce `amount` di `token` al wallet di `initiativeId`
    function distribute(
        address token,
        string calldata initiativeId,
        uint256 amount
    ) external onlyOwner {
        address recip = walletByInitiative[initiativeId];
        require(recip != address(0), "Initiative wallet not set");
        require(totalByInitiative[token][initiativeId] >= amount,
                "Insufficient funds");

        totalByInitiative[token][initiativeId] -= amount;

        if (token == address(0)) {
            // native
            payable(recip).transfer(amount);
        } else {
            require(IERC20(token).transfer(recip, amount),
                    "ERC20 transfer fallito");
        }

        emit Distributed(token, initiativeId, recip, amount);
    }
}
