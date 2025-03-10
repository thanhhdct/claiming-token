// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RewardModule = buildModule("MyTokenModule", (m) => {
  const rewardContract = m.contract("Rewards");
  return { rewardContract };
});

export default RewardModule;
