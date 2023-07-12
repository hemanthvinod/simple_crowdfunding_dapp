import Web3 from "web3";

const Campaign = ({
  name,
  description,
  deadline,
  targetAmount,
  image,
  upvotes,
  downvotes,
  address,
  balance,
}) => {
  const imageCid = image;
  const ipfsImageUrl = `https://ipfs.io/ipfs/${imageCid}`;

  return (
    <div className="campaign-card">
      <div className="campaign-image">
        <img src={ipfsImageUrl} alt={name} />
      </div>
      <div className="campaign-details">
        <h2 className="campaign-name">{name}</h2>
        <p className="campaign-description">{description}</p>
        <p className="campaign-deadline">Deadline: {deadline}</p>
        <p className="campaign-target-amount">
          Target Amount: {Web3.utils.fromWei(targetAmount, "ether")} ETH
        </p>
        <p>Balance:{Web3.utils.fromWei(balance, "ether")} ETH</p>
        <p className="campaign-address">Owner: {address}</p>
        <div className="campaign-votes">
          <button className="upvote-button">Upvotes: {upvotes}</button>
          <button className="downvote-button">Downvotes: {downvotes}</button>
        </div>
      </div>
    </div>
  );
};

export default Campaign;
