# Proposal DApp

![image](https://github.com/user-attachments/assets/ac3ecc1a-40d5-4ff8-807f-aacdead885ae)

Welcome to the **Proposal DApp** project! This decentralized application (DApp) allows users to create, vote on, and track proposals on the Ethereum blockchain. The contract stores and manages proposals, tracks votes, and executes actions based on the results. The frontend is built using React and uses various Ethereum libraries such as Ethers.js to interact with the smart contract.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Smart Contract](#smart-contract)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Proposal DApp** is designed to be a governance tool where users can create proposals and allow others to vote on them. The contract tracks the proposals, the number of votes they receive, and whether they've been executed. The frontend interfaces with the Ethereum blockchain via smart contracts and reads data using `multicall` for efficient batching of blockchain calls.

## Features

- **Create Proposals**: Users can submit proposals that include a description, the amount of ETH requested, the minimum number of votes needed to pass, and the voting deadline.
- **Vote on Proposals**: Users can vote on proposals, which will be counted by the contract.
- **Track Proposals**: View the list of proposals, including their description, vote count, execution status, and deadline.
- **Real-Time Updates**: The DApp listens for blockchain events to provide real-time updates, such as when a new proposal is created or a vote is cast.
- **Contract Balance Display**: The balance of the smart contract is displayed at the top of the page in ETH.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v16+)
- Yarn or npm
- MetaMask or other Ethereum-compatible wallet extensions
- Access to an Ethereum network (e.g., Goerli, Sepolia, or a local testnet)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/DonGuillotine/proposal-decentralized-app.git
   cd proposal-decentralized-app
   ```

2. **Install dependencies**:

   Using Yarn:

   ```bash
   yarn install
   ```

   Or using npm:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root of the project and add the environment variables.

## Smart Contract

The DApp interacts with a smart contract responsible for creating proposals, casting votes, and executing proposals. You can find the ABI of this contract in the `ABI/proposal.json` file, and it is used by the frontend to encode/decode function calls.

Key contract methods include:

- **proposals(id)**: Fetches the proposal details by ID.
- **proposalCount()**: Returns the total number of proposals.
- **vote(proposalId)**: Allows users to vote for a specific proposal.
- **createProposal(description, amount, minVotesToPass, deadline)**: Allows users to create a new proposal.

## Running the Application

1. **Start the development server**:

   Using Yarn:

   ```bash
   yarn dev
   ```

   Or using npm:

   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

3. Connect your Ethereum wallet (e.g., MetaMask) to the correct network and interact with the application.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
