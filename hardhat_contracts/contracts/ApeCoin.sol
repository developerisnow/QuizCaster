// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ApeCoin is ERC20 {

    constructor() ERC20("ApeCoin", "ApeCoin") {
        _mint(msg.sender, 1000 * 10 ** decimals()); // Mint 1000 of ApeCoin tokens | 10^18 
    }
// Workaround : to approve the transfer of tokens from wallet to the smart contract
// the best option is to call the "approve" function from Front-End

    function approve_(address _addr) public  {
        approve(_addr, 11111);
    }
}
