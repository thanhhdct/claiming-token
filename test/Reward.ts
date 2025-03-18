import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Reward", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployRewardFixture() {
    const [owner, secondAccount, thirdAccount] = await hre.ethers.getSigners();

    const rewardContract = await hre.ethers.getContractFactory("Rewards");
    const reward = await rewardContract.deploy();

    return { reward, owner, secondAccount, thirdAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { owner, reward } = await loadFixture(deployRewardFixture)
      expect(await reward.owner()).to.equal(owner.address);
    });
  });

  describe("Set reward", function () {
    it("Should allow only the owner to set reward", async function () {
      const { secondAccount, reward, thirdAccount } = await loadFixture(deployRewardFixture);

      await reward.setReward(secondAccount.address, 100);
      const rewardBalance = await reward.rewards(secondAccount.address);
      expect(rewardBalance).to.equal(100n * (10n ** 18n));

      await expect(
        reward.connect(secondAccount).setReward(secondAccount.address, 100)
      ).to.be.revertedWithCustomError(reward, "OwnableUnauthorizedAccount")
        .withArgs(secondAccount.address);

      await reward.setReward(thirdAccount.address, 200);
      const rewardBalanceThird = await reward.rewards(thirdAccount.address);
      expect(rewardBalanceThird).to.equal(200n * (10n ** 18n));
    });

    it("should emit event when set reward", async function () {
      const { secondAccount, reward, } = await loadFixture(deployRewardFixture);
      await expect(reward.setReward(secondAccount.address, 100))
        .to.emit(reward, "SetReward")
        .withArgs(reward.owner(), anyValue, secondAccount.address)
    })

    it("Should call contract function successfully", async function () {
      const { reward, owner } = await loadFixture(deployRewardFixture)
      await expect(reward.balanceOf(owner)).not.to.be.reverted
    })
  })

  describe("Claim reward", function () {
    it("Should revert if there is no reward", async function () {
      const { secondAccount, reward } = await loadFixture(deployRewardFixture);

      await expect(
        reward.connect(secondAccount).claimReward()
      ).to.be.revertedWith("No rewards available");
    });

    it("Should claim successfully", async function () {
      const { secondAccount, reward } = await loadFixture(deployRewardFixture);
      const amount = 300n
      await reward.setReward(secondAccount.address, amount)
      await expect(reward.connect(secondAccount).claimReward()).to
        .changeTokenBalance(reward, secondAccount, amount * 10n ** 18n)
      // await reward.connect(secondAccount).claimReward()
      // const balance = await reward.balanceOf(secondAccount)
      // expect(balance).to.equal(amount*(10n**18n))
    })
  })
});
