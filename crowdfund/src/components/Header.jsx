import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>CROWDFUND</Link>
      <div>
        <Link className="my-links" to={"/campaigns"}>
          Campaigns
        </Link>

        <Link className="my-links" to={"/create"}>
          Create campaign
        </Link>
      </div>
    </div>
  );
};

export default Header;
