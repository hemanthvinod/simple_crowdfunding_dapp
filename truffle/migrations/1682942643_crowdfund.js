const Crowdfund = artifacts.require("Crowdfunding");

module.exports = function (_deployer) {
  _deployer.deploy(Crowdfund);
};
