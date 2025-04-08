require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    bsc_testnet: {
      url: "https://bsc-testnet-dataseed.bnbchain.org",
      accounts: [process.env.PRIVATE_KEY], // 从 .env 文件读取私钥
    },
    bsc_mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: [process.env.BSC_API_KEY],
      bsc: [process.env.BSC_API_KEY],
    }
  }
};