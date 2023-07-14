import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/web3Context";
import Web3 from "web3";

const ViewCampaign = () => {
  const { id } = useParams(); // Access the campaign id from the URL parameter
  const updatedId = Number(id) + 1;
  const { getCampaign, contribute, Vote, withdraw } = useContext(Web3Context);
  const [campaign, setCampaign] = useState(null);
  const [contribution, setContribution] = useState(0);

  const handleChange = (e) => {
    setContribution(e.target.value);
  };

  const withdrawFunds = async () => {
    console.log(updatedId);
    try {
      const txn = await withdraw(updatedId);
      console.log(txn);
    } catch (error) {
      alert("You cannot withdraw funds from campaign");
    }
  };

  const voteHandler = async (e) => {
    const voteValue = e.target.className === "vote-for-btn" ? true : false;
    try {
      const txn = await Vote(updatedId, voteValue);
      console.log(txn);
      alert("Voted successfully");
    } catch (error) {
      alert("Sorry, You cannot vote again ");
    }
  };

  const contributeAmount = async () => {
    console.log(contribution);
    const txn = await contribute(updatedId, contribution);
    console.log(txn);
  };

  useEffect(() => {
    const getCampaignDetails = async () => {
      const campDatas = await getCampaign(updatedId);
      setCampaign(campDatas);
    };
    getCampaignDetails();
  }, [getCampaign, updatedId]);

  if (!campaign) {
    return <div>Loading...</div>;
  }

  // link to show the image from ipfs

  const ipfsImageUrl = `https://ipfs.io/ipfs/${campaign.image}`;

  return (
    <div className="viewCampaign-container">
      <h1 style={{ textAlign: "center" }}>{campaign.name.toUpperCase()}</h1>
      <div className="campaign-view">
        <img src={ipfsImageUrl} style={{ width: "300px", height: "250px" }} />
        <div className="campaign-details">
          <p>
            <span>Description:</span> {campaign.description}
          </p>
          <p>
            <span>Deadline:</span>{" "}
            {new Date(campaign.deadline * 1000).toUTCString()}
          </p>
          <p>
            <span>Traget amount:</span>
            {Web3.utils.fromWei(campaign.targetAmount, "ether")}
            ETH
          </p>
          <p>
            <span>Owner:</span> {campaign.owner}
          </p>
          <p>
            <span>Upvotes:</span> {campaign.upvotes}
          </p>
          <p>
            <span>Downvotes:</span> {campaign.downvotes}
          </p>
          <p>
            <span>Balance:</span>{" "}
            {Web3.utils.fromWei(campaign.balance, "ether")} ETH
          </p>
        </div>
      </div>

      <div className="campaign-functions">
        <div className="contribute-div">
          <input
            type="number
        "
            onChange={handleChange}
            className="contribution-input"
          />
          <button className="contribute-btn" onClick={contributeAmount}>
            Contribute
          </button>
        </div>
        <div className="voting-div">
          <p>Vote For/Against the campaign :</p>
          <button className="vote-for-btn" onClick={voteHandler}>
            Vote For
          </button>
          <button className="vote-against-btn" onClick={voteHandler}>
            vote Against
          </button>
        </div>

        <div className="withdraw-div">
          <button className="withdraw-btn" onClick={withdrawFunds}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCampaign;
