const Crowdfunding = artifacts.require("Crowdfunding");

contract("Crowdfunding", (accounts) => {
  let crowdfunding;
  const owner = accounts[0];
  const contributor = accounts[1];

  beforeEach(async () => {
    // Deploy a new instance of the Crowdfunding contract before each test
    crowdfunding = await Crowdfunding.new();
  });

  it("should create a campaign", async () => {
    // Call the createCampaign function using .call() to get the return value
    const campaignId = await crowdfunding.createCampaign.call(
      "Test Campaign",
      100,
      Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      "Test campaign description",
      "Test campaign image",
      { from: owner }
    );

    console.log("Campaign ID:", campaignId);

    // Assert that the campaign ID returned matches the expected value
    assert.equal(campaignId, 1, "Incorrect campaign ID");
  });

  it("should contribute to a campaign", async () => {
    // Create a campaign
    await crowdfunding.createCampaign(
      "Test Campaign",
      100,
      Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      "Test campaign description",
      "Test campaign image",
      { from: owner }
    );

    const campaignId = 1;
    const amount = 50;

    // Contribute to the campaign
    await crowdfunding.contribute(campaignId, {
      from: contributor,
      value: amount,
    });

    // Get the contribution amount for the contributor
    const contribution = await crowdfunding.getContributions(
      campaignId,
      contributor
    );

    // Assert that the contribution amount matches the expected value
    assert.equal(contribution, amount, "Incorrect contribution amount");
  });

  it("should vote on a campaign", async () => {
    // Create a campaign
    await crowdfunding.createCampaign(
      "Test Campaign",
      100,
      Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      "Test campaign description",
      "Test campaign image",
      { from: owner }
    );

    const campaignId = 1;
    const support = true;

    // Vote on the campaign
    await crowdfunding.vote(campaignId, support, { from: contributor });

    // Get the campaign details
    const campaign = await crowdfunding.getCampaign(campaignId);

    // Assert that the number of upvotes matches the expected value
    assert.equal(campaign.upvotes, 1, "Incorrect number of upvotes");
  });

  it("should withdraw funds from a successful campaign", async () => {
    // Create a campaign
    await crowdfunding.createCampaign(
      "Test Campaign",
      100,
      Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      "Test campaign description",
      "Test campaign image",
      { from: owner }
    );

    const campaignId = 1;
    const amount = 100;

    // Contribute to the campaign
    await crowdfunding.contribute(campaignId, {
      from: contributor,
      value: amount,
    });

    // Vote on the campaign
    await crowdfunding.vote(campaignId, true, { from: contributor });

    // Withdraw funds from the campaign
    await crowdfunding.withdraw(campaignId, { from: owner });

    // Get the campaign details
    const campaign = await crowdfunding.getCampaign(campaignId);

    // Assert that the campaign balance is reset to 0
    assert.equal(campaign.balance, 0, "Campaign balance not reset");
  });

  it("should refund funds from an unsuccessful campaign", async () => {
    // Create a campaign that has already passed its deadline
    await crowdfunding.createCampaign(
      "Test Campaign",
      100,
      Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
      "Test campaign description",
      "Test campaign image",
      { from: owner }
    );

    const campaignId = 1;
    const amount = 50;

    // Contribute to the campaign
    await crowdfunding.contribute(campaignId, {
      from: contributor,
      value: amount,
    });

    // Vote against the campaign
    await crowdfunding.vote(campaignId, false, { from: contributor });

    // Refund funds from the campaign
    await crowdfunding.refund(campaignId, { from: contributor });

    // Get the campaign details
    const campaign = await crowdfunding.getCampaign(campaignId);
    // Get the contribution amount for the contributor
    const contribution = await crowdfunding.getContributions(
      campaignId,
      contributor
    );

    // Assert that the campaign balance is reset to 0 and the contribution is reset to 0
    assert.equal(campaign.balance, 0, "Campaign balance not reset");
    assert.equal(contribution, 0, "Contribution not reset");
  });
  it("should get all campaigns", async () => {
    // Create a campaign
    await crowdfunding.createCampaign(
      "Test Campaign",
      100,
      Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      "Test campaign description",
      "Test campaign image",
      { from: owner }
    );

    // Get all campaigns
    const campaigns = await crowdfunding.getAllCampaigns();

    // Assert that the number of campaigns is 1
    assert.equal(campaigns.length, 1, "Incorrect number of campaigns");

    // Assert that the campaign name matches the expected value
    assert.equal(campaigns[0].name, "Test Campaign", "Incorrect campaign name");
  });
});
