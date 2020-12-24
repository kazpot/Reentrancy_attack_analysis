//SPDX-License-Identifier: MIT
pragma solidity 0.5.0;

import "./Charity.sol";

contract Wallet {
    Charity charity;

    constructor(address payable charityAddress) public payable {
        charity = Charity(charityAddress);
    }

    function donate(uint256 amount) public {
        charity.donate.value(amount)();
    }

    function getDonationBalance() public view returns (uint256) {
        return charity.getBalance();
    }

    function withdraw() public {
        charity.withdraw();
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function() external payable {
        charity.withdraw();
    }
}
