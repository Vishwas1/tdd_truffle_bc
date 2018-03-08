pragma solidity ^0.4.4;
contract Ballot {
  address public chairman;

  //Parties 
  struct Party {
    bool alreadyAdded;
    uint voteCount;
    bytes32 name;
  }
  mapping (address => Party)partListDict;
  bytes32 public ballotName;

  modifier onlyChairman() {
    assert(chairman == msg.sender);
    _;
  }

  //constructor
  function Ballot(bytes32 _ballotName) public {
    chairman = msg.sender;
    ballotName = _ballotName;
  }

  /**
     - Party should not be duplicated
     - Only chairman can add party to the list.
   */
  function addParty(address _partyAddr, bytes32 _partyName) public onlyChairman {
    require(_partyAddr != address(0) && !partListDict[_partyAddr].alreadyAdded);
      partListDict[_partyAddr].name = _partyName;
      partListDict[_partyAddr].voteCount = 0;
      partListDict[_partyAddr].alreadyAdded = true;
  }

  // function getPartyList() public returns (bytes32[]){
    
  //   bytes32[] memory partyNamesArr =  new bytes32[](gblpartyListArr.length);
  //       for(uint i = 0; i < gblpartyListArr.length; i++){
  //          partyNamesArr[i] = gblpartyList[gblpartyListArr[i]].name;
  //       }
  //       return partyNamesArr;
    
  // }
}
