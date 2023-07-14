import Web3 from "web3";
import Crowdfunding from "../../../truffle/build/contracts/Crowdfunding.json";
import { createContext } from "react";
import { useState, useEffect } from "react";
export const Web3Context = createContext();
const { ethereum } = window;

// Function to get the Ethereum contract instance
const getEthereumContract = async () => {
  const web3 = new Web3(ethereum);
  const networkId = await web3.eth.net.getId();

  // Create a new instance of the contract using the ABI and network address
  const crowdContract = new web3.eth.Contract(
    Crowdfunding.abi,
    Crowdfunding.networks[networkId].address
  );

  return crowdContract;
};

export const Web3ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  // Function to check if MetaMask is connected
  const checkWalletConnect = async () => {
    if (!ethereum) return alert("Metamask is not connected");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  };

  // Function to connect the wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      // Request the user's accounts from MetaMask
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // Set the current account
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  // Function to create a campaign
  const createCampaign = async (
    name,
    targetAmount,
    deadline,
    description,
    image
  ) => {
    const crowdContract = await getEthereumContract();

    // Convert the target amount to wei
    const amountToWei = Web3.utils.toWei(targetAmount.toString(), "ether");

    // Call the createCampaign method of the contract and send a transaction
    const txn = await crowdContract.methods
      .createCampaign(name, amountToWei, deadline, description, image)
      .send({ from: currentAccount, gasLimit: 950000 });

    console.log(txn);
    return txn;
  };

  // Function to contribute to a campaign
  const contribute = async (campaignId, amount) => {
    console.log(currentAccount);

    // Convert the contribution amount to wei
    const amountToWei = Web3.utils.toWei(amount.toString(), "ether");
    const crowdContract = await getEthereumContract();
    console.log(amountToWei);

    // Call the contribute method of the contract and send a transaction
    const txn = await crowdContract.methods
      .contribute(campaignId)
      .send({ from: currentAccount, value: amountToWei, gasLimit: 950000 });

    console.log(txn);
  };

  // Function to vote on a campaign
  const vote = async (campaignId, support) => {
    const crowdContract = await getEthereumContract();

    // Call the vote method of the contract and send a transaction
    const txn = await crowdContract.methods
      .vote(campaignId, support)
      .send({ from: currentAccount, gasLimit: 95000 });

    return txn;
  };

  // Function to withdraw funds from a campaign
  const withdraw = async (campaignId) => {
    const crowdContract = await getEthereumContract();

    // Call the withdraw method of the contract and send a transaction
    const txn = await crowdContract.methods
      .withdraw(campaignId)
      .send({ from: currentAccount, gasLimit: 950000 });

    console.log(txn);
  };

  // Function to get contributions of a contributor for a campaign
  const getContributions = async (campaignId, contributor) => {
    const crowdContract = await getEthereumContract();

    // Call the getContributions method of the contract and retrieve data
    const data = await crowdContract.methods
      .getContributions(campaignId, contributor)
      .call();

    console.log(data);
  };

  // Function to get campaign details by ID
  const getCampaign = async (campaignId) => {
    const crowdContract = await getEthereumContract();

    // Call the getCampaign method of the contract and retrieve data
    const data = await crowdContract.methods.getCampaign(campaignId).call();

    return data;
  };

  // Function to get all campaigns
  const getAllCampaigns = async () => {
    const crowdContract = await getEthereumContract();

    // Call the getAllCampaigns method of the contract and retrieve data
    const data = await crowdContract.methods.getAllCampaigns().call();
    return data;
  };

  useEffect(() => {
    checkWalletConnect();
    connectWallet();

    // Listen for changes in the connected accounts
    ethereum.on("accountsChanged", (accounts) => {
      setCurrentAccount(accounts[0]);
      console.log(currentAccount);
    });
  }, [currentAccount]);

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        createCampaign,
        vote,
        contribute,
        withdraw,
        getContributions,
        getCampaign,
        getAllCampaigns,
        currentAccount,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
