// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Rewards is Ownable {
    IERC20 public rewardsToken;

    mapping(address => uint) public rewards;
    // address owner;

    // Constructor now passes msg.sender as the initial owner to the Ownable contract
    constructor(address _rewardsToken) Ownable(msg.sender) {
        rewardsToken = IERC20(_rewardsToken);
        // owner = msg.sender;
    }

    // Only owner can set rewards
    function setReward(address account, uint256 amount) public onlyOwner {
        rewards[account] = amount;
    }

    // Anyone can claim rewards
    function claimReward() public {
        uint256 reward = rewards[msg.sender];
        console.log("reward........", reward);
        rewards[msg.sender] = 0;
        // rewardsToken.transferFrom(owner,msg.sender, reward);
        // console.log("owner...........%s", owner);
        rewardsToken.transfer(msg.sender, reward);
    }
}
