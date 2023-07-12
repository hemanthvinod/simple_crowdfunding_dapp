// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;


contract Crowdfunding {
    struct Campaign {
        string name;
        uint256 targetAmount;
        uint256 deadline;
        string description;
        string image;
        uint256 upvotes;
        uint256 downvotes;
        uint256 balance;
        address owner;
        mapping(address => uint256) contributions;
        mapping(address => bool) voted;
    }

struct CampaignData {
    string name;
    uint256 targetAmount;
    uint256 deadline;
    string description;
    string image;
    uint256 upvotes;
    uint256 downvotes;
    uint256 balance;
    address owner;
}
    mapping(uint256 => Campaign) campaigns;
    uint256 nextCampaignId = 1; 


    function createCampaign(
        string memory name,
        uint256 targetAmount,
        uint256 deadline,
        string memory description,
        string memory image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[nextCampaignId];
        campaign.name = name;
        campaign.targetAmount = targetAmount;
        campaign.deadline = deadline;
        campaign.description = description;
        campaign.image = image;
        campaign.owner = msg.sender;

        nextCampaignId++;

        return nextCampaignId - 1;
    }

    function contribute(uint256 campaignId) public payable {
        Campaign storage campaign = campaigns[campaignId];
        require(
            campaign.deadline > block.timestamp,
            "Campaign deadline has passed"
        );
        require(
            campaign.balance + msg.value <= campaign.targetAmount,
            "Target amount reached"
        );

        campaign.contributions[msg.sender] += msg.value;
        campaign.balance += msg.value;
    }

    function vote(uint256 campaignId, bool support) public {
        Campaign storage campaign = campaigns[campaignId];
        require(
            campaign.deadline > block.timestamp,
            "Campaign deadline has passed"
        );
        require(!campaign.voted[msg.sender], "Already voted");

        if (support) {
            campaign.upvotes++;
        } else {
            campaign.downvotes++;
        }

        campaign.voted[msg.sender] = true;
    }

    function withdraw(uint256 campaignId) public {
        Campaign storage campaign = campaigns[campaignId];

        require(msg.sender == campaign.owner,
         "Not the owner of the campaign");
        require(
            campaign.deadline <= block.timestamp,
            "Campaign deadline not reached"
        );
        require(
            campaign.balance >= campaign.targetAmount,
            "Target amount not reached"
        );
        require(campaign.upvotes > campaign.downvotes, "Campaign not approved");

        uint256 amount = campaign.balance;
        campaign.balance = 0;

        payable(msg.sender).transfer(amount);
    }

    function refund(uint256 campaignId) public {
        Campaign storage campaign = campaigns[campaignId];
        require(
            campaign.deadline <= block.timestamp,
            "Campaign deadline not reached"
        );
        require(
            campaign.balance < campaign.targetAmount,
            "Target amount reached"
        );
        require(
            campaign.contributions[msg.sender] > 0,
            "No contribution found"
        );

        uint256 amount = campaign.contributions[msg.sender];
        campaign.contributions[msg.sender] = 0;
        campaign.balance -= amount;
        payable(msg.sender).transfer(amount);
    }

    function getContributions(uint256 campaignId, address contributor)
        public
        view
        returns (uint256)
    {
        Campaign storage campaign = campaigns[campaignId];
        return campaign.contributions[contributor];
    }

    function getCampaign(uint256 campaignId)
        public
        view
        returns (
            address owner,
            string memory name,
            uint256 targetAmount,
            uint256 deadline,
            string memory description,
            string memory image,
            uint256 upvotes,
            uint256 downvotes,
            uint256 balance
        )
    {
        Campaign storage campaign = campaigns[campaignId];
        return (
            campaign.owner,
            campaign.name,
            campaign.targetAmount,
            campaign.deadline,
            campaign.description,
            campaign.image,
            campaign.upvotes,
            campaign.downvotes,
            campaign.balance
        );
    }
    
    function getAllCampaigns() public view returns (CampaignData[] memory) {
    CampaignData[] memory campaignsData = new CampaignData[](nextCampaignId-1);
    for (uint256 i = 1; i < nextCampaignId; i++) {
        Campaign storage campaign = campaigns[i];
        CampaignData memory data = CampaignData({
            name: campaign.name,
            targetAmount: campaign.targetAmount,
            deadline: campaign.deadline,
            description: campaign.description,
            image: campaign.image,
            upvotes: campaign.upvotes,
            downvotes: campaign.downvotes,
            balance: campaign.balance,
            owner: campaign.owner
        });
        campaignsData[i-1] = data;
    }
    return campaignsData;
}



}
