# Description
- Added walletconnect
- Able to interact with goerli testnet
- Made changes to Solidity file so that user won't have to deploy a new contract for every new escrow
	- [Contract](https://goerli.etherscan.io/address/0x06679fe554d0dcc9c83ec7318b39a7a504f55076) keeps track of all the escrows created.

## Future improvements
- Add transaction link to etherscan
- Add loading screen while waiting for transaction to be confirmed


# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

