import Web3 from "web3";
import Crowdfunding from "../../../truffle/build/contracts/Crowdfunding.json";
import { createContext } from "react";
import { useState, useEffect } from "react";
export const Web3Context = createContext();
const { ethereum } = window;

const getEthereumContract = async () => {
  const web3 = new Web3(ethereum);
  const networkId = await web3.eth.net.getId();
  const crowdContract = new web3.eth.Contract(
    Crowdfunding.abi,
    Crowdfunding.networks[networkId].address
  );
  return crowdContract;
};

export const Web3ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkWallectConnect = async () => {
    if (!ethereum) return alert("Metamask is not connected");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const createCampaign = async (
    name,
    targetAmount,
    deadline,
    description,
    image
  ) => {
    const crowdContract = await getEthereumContract();
    const amountToWei = Web3.utils.toWei(targetAmount.toString(), "ether");
    const txn = await crowdContract.methods
      .createCampaign(name, amountToWei, deadline, description, image)
      .send({ from: currentAccount, gasLimit: 950000 });
    console.log(txn);
    return txn;
  };

  const contribute = async (campaignId, amount) => {
    console.log(currentAccount);
    const amountToWei = Web3.utils.toWei(amount.toString(), "ether");
    const crowdContract = await getEthereumContract();
    console.log(amountToWei);
    const txn = await crowdContract.methods
      .contribute(campaignId)
      .send({ from: currentAccount, value: amountToWei, gasLimit: 950000 });
    console.log(txn);
  };

  const Vote = async (campaignId, support) => {
    const crowdContract = await getEthereumContract();
    const txn = await crowdContract.methods
      .vote(campaignId, support)
      .send({ from: currentAccount, gasLimit: 95000 });
    return txn;
  };

  const withdraw = async (campaignId) => {
    const crowdContract = await getEthereumContract();
    const txn = await crowdContract.methods
      .withdraw(campaignId)
      .send({ from: currentAccount, gasLimit: 950000 });
    console.log(txn);
  };

  const Contributions = async (campaignId, contributor) => {
    const crowdContract = await getEthereumContract();
    const data = await crowdContract.methods
      .getContributions(campaignId, contributor)
      .call();
    console.log(data);
  };

  const getCampaign = async (campaignId) => {
    const crowdContract = await getEthereumContract();
    const data = await crowdContract.methods.getCampaign(campaignId).call();
    return data;
  };

  const getAllCampaigns = async () => {
    const crowdContract = await getEthereumContract();
    const data = await crowdContract.methods.getAllCampaigns().call();
    return data;
  };

  useEffect(() => {
    checkWallectConnect();
    connectWallet();
    ethereum.on("accountsChanged", (accounts) => {
      setCurrentAccount(accounts[0]);
      console.log(currentAccount);
    });
  }, []);

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        createCampaign,
        Vote,
        contribute,
        withdraw,
        Contributions,
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
