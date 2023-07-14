# Crowdfunding DApp

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)


## Introduction
The Crowdfunding DApp is a decentralized application that enables users to create and contribute to crowdfunding campaigns. It leverages blockchain technology to provide transparency, security, and trust in the crowdfunding process. With this DApp, campaign creators can set fundraising goals, describe their projects, and gather financial support from contributors. Contributors can browse campaigns, make contributions, and track the progress of campaigns they have supported.

## Features
- Create a campaign with a funding goal, deadline, description, and image.
- Contribute funds to existing campaigns.
- Vote on campaigns to show support or opposition.
- Withdraw funds from successful campaigns.
- Refund contributions from unsuccessful campaigns.
- View campaign details, including the owner, target amount, deadline, description, image, upvotes, downvotes, and current balance.

## Technologies
- Solidity: Programming language for writing smart contracts.
- Truffle: Development framework for Ethereum DApps.
- Web3.js: JavaScript library for interacting with the Ethereum network.
- React Vite: Frontend development tool for building React applications.
- IPFS: Distributed file system for storing campaign images.
- Ganache: Local blockchain for testing and development.

## Installation
1. Clone the repository:
```
git clone https://github.com/hemanthvinod/simple_crowdfunding_dapp.git
```
2. Install dependencies:
- Solidity: Install Solidity compiler and development tools.
- Truffle: Install Truffle globally using npm:
```
npm install -g truffle
```
- Go to crowdfund directory and install dependencies:
```
cd crowdfunding
npm install 
```
- Install truffle dependencies:
```
cd truffle
npm install
```
3. Start Ganache:
- Download and install Ganache cli
  ```
  npm i -g ganache-cli
  ```
- Open a new terminal and run the following command
  ```
  ganache --port 8300
  ```

## Usage
1. Compile and migrate the smart contracts:
```
truffle compile
truffle migrate
```
2. Start the React Vite development server:
```
cd crowdfund/src
npm run dev
```
3. Access the DApp in your browser at `http://localhost:5173`.

## Testing
1. Make sure Ganache is running on `http://localhost:8300`.
2. Run the Truffle tests:
```
truffle test
```

## Contributing
Contributions are welcome! If you would like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your changes: `git checkout -b feature/your-feature-name`.
3. Make your changes and test thoroughly.
4. Commit your changes: `git commit -am 'Add some feature'`.
5. Push to the branch: `git push origin feature/your-feature-name`.
6. Create a new pull request and describe your changes.

## License
This project is licensed under the [MIT License](LICENSE).

Feel free to customize and expand this README according to your specific project. Provide clear instructions for users to install, run, and test your DApp. Also, include sections for troubleshooting, acknowledgments, and any additional information you deem necessary.

I hope this helps!
