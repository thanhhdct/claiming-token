
import { ethers } from "hardhat";

(async function main() {
    // acc 14
    const userAddress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    
    // Fetch the contract's ABI and create a contract instance
    const Rewards = await ethers.getContractAt("Rewards",contractAddress);
    
    // await tx.wait();
    const tx = await Rewards.setReward(userAddress, 2*1e14);
    await tx.wait();

    console.log(`Reward set successfully to ${userAddress}`);

})()