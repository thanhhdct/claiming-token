// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import hre,{ ethers } from "hardhat";

const RewardModule = buildModule("MyTokenModule", (m) => {
  const addressToken = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  // const addressToken = hre.artifacts.readArtifact("").then((e) => {console.log(e.)})
  const rewardContract = m.contract("Rewards",[addressToken]);
  return { rewardContract };
});

export default RewardModule;
