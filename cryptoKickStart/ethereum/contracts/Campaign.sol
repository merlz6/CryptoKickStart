pragma solidity ^0.4.17;


//create a factory to spit out campaign instances - also records campaign address in deployedCampaigns
contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
      //pushing msg.sender to have the campaign address for below
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
    //END Campaign Factory contract
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator) public {
      //creator is address passed in from the factory component
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
      //check to see the amount is more than the minimum
        require(msg.value > minimumContribution);
        // makes the msg.sender value true in the struct
        approvers[msg.sender] = true;
        // +1 the count of approvers
        approversCount++;
    }
    //request to spend campaign money
    function createRequest(string description, uint value, address recipient) public restricted {

        Request memory newRequest = Request({

           value: value,
           recipient: recipient,
           complete: false,
           description: description,
           approvalCount:0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        //must be a campaign contributor
        require(approvers[msg.sender]);
        //must not have already voted yes
        require(!request.approvals[msg.sender]);
        //make approvals for msg.sender address true
        request.approvals[msg.sender] = true;
        //increase approval count
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        // require atleast half the number of contributors to vote yes for request
        require(request.approvalCount > (approversCount) / 2);
        //the request cant be completed already
        require(!request.complete);
        //transfer value once request pass
        request.recipient.transfer(request.value);
        //switch request to true
        request.complete = true;
    }

    //END Campaign contract
}
