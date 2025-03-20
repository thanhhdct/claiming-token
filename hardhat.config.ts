import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers"

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  // networks: {
  //   sepolia: {
  //     url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  //     accounts: [SEPOLIA_PRIVATE_KEY]
  //   },
  //   hardhat: {
  //     // forking: {
  //     //   // url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  //     //   // blockNumber: 14390000
  //     //   // equivalent to:
  //     //   // url: `https://eth-mainnet.g.alchemy.com/v2`,
  //     //   url: `https://eth-sepolia.g.alchemy.com/v2`,
  //     //   httpHeaders:{
  //     //     "Authorization": `Bearer ${ALCHEMY_API_KEY}`
  //     //   }
  //     // }
  //     // mining: {
  //     //   auto: false,
  //     //   interval: 0,
  //     //   // mempool: {
  //     //   //   order: 'priority'
  //     //   // }
  //     // }
  //   }
  // },
  // etherscan: {
  //   apiKey: ETHERSCAN_API_KEY
  // },
  // ignition: {
  //   strategyConfig: {
  //     create2: {
  //       salt: "0x0000000000000000000000000000000000000000000000000000000000000000",
  //     },
  //   },
  // },
};

export default config;
