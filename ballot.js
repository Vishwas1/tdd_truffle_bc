const Ballot =  artifacts.require("./Ballot.sol");

contract('Ballot', function(accounts) {
  let BallotInst;
  let chairman = accounts[0];
  let ballotname = 'Test Ballot';
  let partyAddrs = ["0xf17f52151ebef6c7334fad080c5704d77216b732", "0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef"];
  let partyNames = ["Party01", "Party02"];
  
  before("getting instance before all Test Cases", async function(){
    console.log(ballotname);
    BallotInst = await Ballot.new(ballotname);
  });

  it('chairman is assigned', async function(){
    assert.equal(await BallotInst.chairman(), chairman, 'Test Failed. chairman is not assigned.');
  });

  it('has a ballot name', async function(){
    let result = await BallotInst.ballotName();
    assert.equal(web3.toAscii(result), ballotname, 'Test Failed. ballotname is not assigned.');
  });

  it('only chairman should be able to add party', async function(){
    try{
      await BallotInst.addParty(partyAddrs[0], partyNames[0], {
        from: accounts[1]
      });
      assert.fail();
    }catch (error) {
      //console.log(error);
      assert(error.toString().includes('invalid opcode'), error.toString())
    }
  })
});




