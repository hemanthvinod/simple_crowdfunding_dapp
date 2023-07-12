import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/web3Context";
import { create } from "ipfs-http-client";

const Create = () => {
  const { createCampaign, connectWallet } = useContext(Web3Context);
  const [campaign, setCampaign] = useState({
    name: "",
    description: "",
    deadline: "",
    targetAmount: "",
    image: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(campaign);

    try {
      // Upload the image file to IPFS
      const ipfsClient = create("/ip4/127.0.0.1/tcp/5002");
      const file = campaign.image;
      const fileAdded = await ipfsClient.add(file);
      const imageIpfsPath = fileAdded.path;

      // Create the campaign with the IPFS image path
      const data = await createCampaign(
        campaign.name,
        campaign.targetAmount,
        new Date(campaign.deadline).getTime() / 1000,
        campaign.description,
        imageIpfsPath
      );
      console.log(data);
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setCampaign((prevCampaign) => ({
      ...prevCampaign,
      image: selectedFile,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCampaign((prevCampaign) => ({
      ...prevCampaign,
      [name]: value,
    }));
  };

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  return (
    <div className="form-container">
      <h1>CREATE YOUR CAMPAIGN</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="main-content">
          <div className="name-desc">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={campaign.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Description:
              <textarea
                name="description"
                value={campaign.description}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="img-amt">
            <label>
              Deadline:
              <input
                type="date"
                name="deadline"
                value={campaign.deadline}
                onChange={handleChange}
              />
            </label>

            <label>
              Target Amount:
              <input
                type="number"
                name="targetAmount"
                value={campaign.targetAmount}
                onChange={handleChange}
              />
            </label>

            <label>
              Image:
              <input type="file" name="image" onChange={handleFileChange} />
            </label>
          </div>
        </div>

        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
};

export default Create;
