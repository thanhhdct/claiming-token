
import { ethers } from "hardhat";

(async function main() {
    // acc 14
    const userAddress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
    const contractAddress = "0xf5059a5D33d5853360D16C683c16e67980206f36";
    
    // Fetch the contract's ABI and create a contract instance
    const Rewards = await ethers.getContractAt("Rewards",contractAddress);
    
    // await tx.wait();
    const tx = await Rewards.setReward(userAddress, 2*1e14);
    await tx.wait();

    console.log(`Reward set successfully to ${userAddress}`);

})()