pragma solidity ^0.5.16;

contract Election {
    // Model an Option
    struct Option {
        uint id;
        string description;
        uint voteCount;
    }
    
    struct Voter{
        bool authorised;
        bool voted;
        uint vote;
        uint numShares;
    }
    
    
    // For modifier so only the owner can call the funtions 
    address public owner;
    
    // to access options with indexing
    mapping(uint => Option) public options;
    
    // to access voters with their address
    mapping(address => Voter) public voters;
    
    //Could have used length but I saw a site which talked about mapping possibly giving issues because of spare hash values
    uint public optionCount;
    string public electionName;
    
    // Basic 3
    constructor() public{
        
        owner = msg.sender;
        addOption("For");
        addOption("Against");
        addOption("Abstain");
        changeElectionName('Prof Paul+ for President');
        //testing Purposes
        registerVoter(0x53c304BB4a9427c13Bef36257881E96aDDE93Af6, 5);
        registerVoter(0x39d7BE9106FB2De9FC0998255C73E1383cEf6E5d, 3);
        registerVoter(0x3E84ABBA5773154Cb9d88e2286a0bB8357e6E827, 2);
        }

    // voted event
    event votedEvent (
        uint indexed _optionId
    );
    
    // So only an owner can access function
    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    function changeElectionName(string memory _name) ownerOnly public {
        electionName = _name;
    }


    // Adding any additional options!
    function addOption (string memory _description) ownerOnly public {
        optionCount ++;
        options[optionCount] = Option(optionCount, _description, 0);
    }

    // Register voters
    function registerVoter(address _person, uint _numShares) ownerOnly public {
        voters[_person].authorised = true;
        voters[_person].numShares = _numShares;
    }

    function vote (uint _optionId) public {
        // require that they haven't voted before and they are authorised to Vote
        require(!voters[msg.sender].voted);
        require(voters[msg.sender].authorised);

        // require a valid option
        require(_optionId > 0 && _optionId <= optionCount);

        // record that voter has voted
        voters[msg.sender].voted = true;

        // update option vote Count according
        options[_optionId].voteCount += voters[msg.sender].numShares;

        // trigger voted event
        emit votedEvent(_optionId);
    }
}




