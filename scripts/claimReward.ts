import hre, { ethers } from "hardhat";

async function main() {
  const contractAddress = '0x9E545E3C0baAB3E08CdfD552C960A1050f373042'

  //   const privateKey = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  //   const privateKey = 'f214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897'
  // acc 14
  const privateKey = '5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a'
  const abi = (await hre.artifacts.readArtifact("Rewards")).abi

  const provider = new ethers.JsonRpcProvider("http://localhost:8545");
  const wallet = (new ethers.Wallet(privateKey, provider));
  const contract = (
    new ethers.Contract(contractAddress, abi, wallet)
  );
  await contract.claimReward()
}

main().catch(console.error);