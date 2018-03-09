/**Test cases for Ballot contract.*/
'use strict';
const Ballot =  artifacts.require("./Ballot.sol");

contract('Ballot', function(accounts) {
  let BallotInst;
  let chairman = accounts[0]; //0x627306090abab3a6e1400e9345bc60c78a8bef57
  let ballotname = 'Test Ballot';
  let partyAddrs = [accounts[1],accounts[2]];
  let partyNames = ["Party01", "Party02"];
  let voterAddrs = [accounts[1],accounts[2],accounts[3], accounts[4], accounts[5], accounts[6], 
  accounts[7], accounts[8]];
  
  
  before('getting instance before all Test Cases', async function(){
    console.log(ballotname);
    BallotInst = await Ballot.new(ballotname);
  })

  describe('Deploying contract', function () {
    it('should test that the smart contract is deployed', async function () {
        assert.equal(web3.isAddress(BallotInst.address), true)
    })
  })

  describe('Checking constructor parameters', function(){
    it('should have chairman', async function(){
      assert.equal(await BallotInst.chairman(), chairman, 'Test Failed. chairman is not assigned.');
    });
  
    it('should have ballot name', async function(){
      let result = await BallotInst.ballotName();
      assert.equal(web3.toAscii(result.replace(/0+$/,'')), ballotname, 'Test Failed. ballotname is not assigned.');
    })
  })

  describe('Adding party to the list', function(){
    it('chairman should be able to add party only', async function(){
      try{
        //adding party from some other account
        await BallotInst.addParty(partyAddrs[0], partyNames[0], {
          from: accounts[1]
        });
        assert.fail();
      }catch(err){
        //console.log(err.toString());
      }
    })

    it('no duplicate party should be added',async function(){
      try{
        //adding party 0 
        await BallotInst.addParty(partyAddrs[0], partyNames[0]);
        await BallotInst.addParty(partyAddrs[1], partyNames[1]);
        //trying to add same party again
        await BallotInst.addParty(partyAddrs[0], partyNames[0]);
        //test should fail
        assert.fail();
      }catch(err){
        //console.log(err.toString());
      }
    })
  });

  describe('Adding voter to the list and check validity', function(){
    it('chairman should be able to add voter only', async function(){
      try{
        //adding party from some other account
        await BallotInst.addVoter(voterAddrs[0], {
          from: accounts[1]
        });
        assert.fail();
      }catch(err){
        //console.log(err.toString());
      }
    })

    it('no duplicate voter should be added',async function(){
      try{
        //adding voter 0,1,2,3
        await BallotInst.addVoter(voterAddrs[0]);
        await BallotInst.addVoter(voterAddrs[1]);
        await BallotInst.addVoter(voterAddrs[2]);
        await BallotInst.addVoter(voterAddrs[3]);
        await BallotInst.addVoter(voterAddrs[4]);
        await BallotInst.addVoter(voterAddrs[5]);

        //adding voter 0 again
        await BallotInst.addVoter(voterAddrs[0]);
        //test should fail
        assert.fail();
      }catch(err){
        //console.log(err.toString());
      }
    })
  });

  describe('Do voting',function(){
    it('vote count should increase', async function(){
      let prevVoteCnt = await BallotInst.getVoteCount(partyAddrs[0])
      //console.log('prev voter cnt = ' + prevVoteCnt);
      await BallotInst.doVoting(partyAddrs[0], {from : voterAddrs[0]})
      await BallotInst.doVoting(partyAddrs[0], {from : voterAddrs[1]})
      await BallotInst.doVoting(partyAddrs[0], {from : voterAddrs[2]})
      let aftVoteCnt = await BallotInst.getVoteCount(partyAddrs[0])
      //console.log('after voter cnt = ' + aftVoteCnt);
      assert.isAbove(aftVoteCnt, prevVoteCnt, 'Test failed')
    })

    it('should fail since voter 0 already voted', async function(){
      try{
        await BallotInst.doVoting(partyAddrs[0], {from : voterAddrs[0]})
        assert.fail();
      }catch(err){}
    })
  })

  describe('Getting vote counts for a party', function(){
    it('should return 6 vote count for party 0', async function(){
      //await BallotInst.doVoting(partyAddrs[0], {from : voterAddrs[2]})
      await BallotInst.doVoting(partyAddrs[0], {from : voterAddrs[3]})
      await BallotInst.doVoting(partyAddrs[0], {from : voterAddrs[4]})
      await BallotInst.doVoting(partyAddrs[0], {from : voterAddrs[5]})
      let result = await BallotInst.getVoteCount(partyAddrs[0]);
      assert.equal(result.valueOf(), 6, 'Test Failed');
    })
  })
});




