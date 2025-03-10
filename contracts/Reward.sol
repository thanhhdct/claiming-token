// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MyToken.sol";

contract Rewards is Ownable, MyToken {
    mapping(address => uint256) public rewards;

    constructor() Ownable(msg.sender) {
        _mint(address(this), 10000000 * (10 ** uint256(decimals()))); 
    }

    // Only owner can set rewards
    function setReward(address account, uint256 amount) public onlyOwner {
        rewards[account] = amount;
    }

    function getUSDTBalance(address account) public view returns (uint256) {
        return balanceOf(account); // Directly checks MKI balance
    }

    // Anyone can claim rewards
    function claimReward() public {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No rewards available");

        rewards[msg.sender] = 0;

        require(balanceOf(address(this)) >= reward, "Not enough rewards available");
        _transfer(address(this), msg.sender, reward); // Transfer from contract balance
    }
}
