import { useContext, useState } from "react";
import { Web3Context } from "../context/web3Context";
import Campaign from "../components/Campaign";
import { Link } from "react-router-dom";

export const Home = () => {
  const { connectWallet, getCampaign } = useContext(Web3Context);
  const [campaignData, setCampaignData] = useState(null);
  const [form, setForm] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const data = await getCampaign(form);
      setCampaignData(data);
      console.log(data);
    } catch (error) {
      console.error("Error geeting campaign", error);
    }
  };
  const handleChange = (e) => {
    setForm(e.target.value);
  };

  return (
    <div className="home-container">
      <button onClick={connectWallet} className="wallet-connect-btn">
        Connect Wallet
      </button>

      <form className="search-form" onSubmit={handleForm}>
        <input
          className="home-search"
          type="text"
          placeholder="Search Campaign"
          style={{ width: "500px" }}
          onChange={handleChange}
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
      {campaignData && (
        <Link style={{ color: "black" }} to={`/campaigns/${form - 1}`}>
          <Campaign
            name={campaignData.name}
            description={campaignData.description}
            deadline={new Date(campaignData.deadline * 1000).toUTCString()}
            targetAmount={campaignData.targetAmount}
            image={campaignData.image}
            upvotes={campaignData.upvotes}
            downvotes={campaignData.downvotes}
            address={campaignData.owner}
            balance={campaignData.balance}
          />
        </Link>
      )}
    </div>
  );
};

export default Home;
