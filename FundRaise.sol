pragma solidity ^0.4.17;
    /**
        1. Create a fundraise contract for owner.
        2. When paused, the fund should not be raised.
        3. Fund should only be transfered to the owner.
        4. Later on implement expiry date time into the contract.
        5. Write test cases for this contract in the truffle and deploy it on Ganche.    
    */
contract FundRaise {
    address public owner;
    bool paused;

    // modifiers
    modifier onlyOwner() {
        assert(owner == msg.sender);
        _;
    }

    modifier ifNotPaused(){
        require(!paused);
        _;
    }

    // @dev constructor function. Sets contract owner
    function FundRaise() public{
        owner = msg.sender;
    }

    // fallback function to accept ETH into contract.
    function () ifNotPaused payable  public{
    }

    function pause() public onlyOwner {
        paused = true;
    }

    function unpause() public onlyOwner {
        paused = false;
    }

    function removeFunds() public {
        owner.transfer(this.balance);
    }

    function getContractBalance() public constant returns(uint){
        return this.balance;
    }
}
