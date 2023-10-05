require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./app/src/artifacts",
  },
  experiments: {
    topLevelAwait: true,
  },
  networks:{
    hardhat: {
      chainId: 1337
    },
  }
};
