import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Web3Context } from "../context/web3Context";
import Campaign from "../components/Campaign";

export const Campaigns = () => {
  const { getAllCampaigns } = useContext(Web3Context);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllDatas = async () => {
      const campDatas = await getAllCampaigns();
      setData(campDatas);
    };
    getAllDatas();
  }, []);

  return (
    <div className="camp-container">
      {data.map((campaign, index) => (
        <Link style={{ color: "black" }} to={`/campaigns/${index}`} key={index}>
          <Campaign
            key={index}
            name={campaign.name}
            description={campaign.description}
            deadline={new Date(campaign.deadline * 1000).toUTCString()}
            targetAmount={campaign.targetAmount}
            image={campaign.image}
            upvotes={campaign.upvotes}
            downvotes={campaign.downvotes}
            address={campaign.owner}
            balance={campaign.balance}
          />
        </Link>
      ))}
    </div>
  );
};

export default Campaigns;
