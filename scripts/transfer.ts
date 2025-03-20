// import { ethers } from "hardhat"

// (async function main() {
//     const receiver = '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097'
//     const provider = new ethers.JsonRpcProvider('http://localhost:8545')
//     const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
//     const wallet = new ethers.Wallet(privateKey, provider)
//     const tx = await wallet.sendTransaction({ to: receiver, value: 5n * 10n ** 18n })
//     await tx.wait()
// })()

import { ethers } from 'ethers';

(async function main() {
    const receiver = '0xc3DDB8126e152e9E7A00022d5016a76A292d0c25';
    const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
    const phrase = process.env.METAMASK_PHRASE || ''
    const provider = new ethers.AlchemyProvider('sepolia', ALCHEMY_API_KEY);
    
    const wallet = ethers.HDNodeWallet.fromPhrase(phrase, undefined, "m/44'/60'/0'/0/1")
        .connect(provider)
    const tx = await wallet.sendTransaction({ to: receiver, value: 2n * 10n ** 14n });
    await tx.wait();
})();