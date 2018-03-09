pragma solidity ^0.4.4;
contract Ballot {
  address public chairman;
  uint public expiryTime;
  struct Party {
    bool alreadyAdded;
    uint voteCount;
    bytes32 name;
  }

  mapping (address => Party)partListDict;

  struct Voter {
    bool hasVoted;
    bool alreadyAdded;
  }
  mapping (address => Voter)public voterListDict;
  
  bytes32 public ballotName;

  modifier onlyChairman() {
    require(chairman == msg.sender);
    _;
  }

  modifier isValidVoter() {
    require(voterListDict[msg.sender].alreadyAdded == true 
    &&  voterListDict[msg.sender].hasVoted == false);
    _;
  }

  modifier notExpired(){
    require(expiryTime > now);
    _;
  }

  //Events
  event PartyAdded(address _partyAddr, bytes32 _partyName);
  event VoterAdded(address _voterAddr);
  event VotingDone(address _voterAddr, address _partyAddr);

  //constructor
  // provide durations in seconds 
  function Ballot(bytes32 _ballotName, uint _duration) public {
    chairman = msg.sender;
    ballotName = _ballotName;
    expiryTime = now + _duration;
  }

  /**
     - Add party/proposal method
     - Party should not be duplicated
     - Only chairman can add party to the list.
   */
  function addParty(address _partyAddr, bytes32 _partyName) public onlyChairman notExpired{
    require(_partyAddr != address(0) && !partListDict[_partyAddr].alreadyAdded);
      partListDict[_partyAddr].name = _partyName;
      partListDict[_partyAddr].voteCount = 0;
      partListDict[_partyAddr].alreadyAdded = true;
      PartyAdded(_partyAddr, _partyName);
  }

  /**
     - Add voter method
     - voter should not be duplicated
     - Only chairman can add party to the list.
   */
  function addVoter(address _voterAddr) public onlyChairman notExpired{
    require(_voterAddr != address(0) && !voterListDict[_voterAddr].alreadyAdded);
      voterListDict[_voterAddr].hasVoted = false;
      voterListDict[_voterAddr].alreadyAdded = true;      
      VoterAdded(_voterAddr);
  }

  /**
  - doVoting -  will be called by voter. a party can also be a voter.
  - voter should be present in the voterlist and should not have voted so far
  - party should be present in the list
  */
  function doVoting(address _partyAddr) public isValidVoter notExpired{
    require(_partyAddr != address(0) && partListDict[_partyAddr].alreadyAdded);
    partListDict[_partyAddr].voteCount = partListDict[_partyAddr].voteCount + 1; 
    voterListDict[msg.sender].hasVoted = true;
    VotingDone(msg.sender,_partyAddr);
  } 

  /**
    - getVoteCount -  fetch voter count wrt party
   */
  function getVoteCount(address _partyAddr) public view returns(uint) {
    require(_partyAddr != address(0) && partListDict[_partyAddr].alreadyAdded);
    return partListDict[_partyAddr].voteCount;
  }
}
