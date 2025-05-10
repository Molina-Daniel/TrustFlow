// contracts/MockStable.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//deployed at 0xB42ffa3F825770F51F702F7F82A4fa900fA17B6C

/// @notice Un “fake xDai” solo per test / dev
contract StableErc20 is ERC20 {
  constructor() ERC20("Mock xDai", "mXDAI") {}

  /// @notice Chiunque può mintare per sé
  function mint(address to, uint256 amount) external {
    _mint(to, amount);
  }
}
