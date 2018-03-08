TEST DRIVEN DEVELOPMENT IN BLOCKCHAIN USING TRUFFLE 

In truffle console :


    > create test Ballot
    Add this code 
      ----------------------------------------------------------
      const Ballot =  artifacts.require("./Ballot.sol");

      contract('Ballot', function(accounts) {
          let BallotInst;
          let chairman = accounts[0];
          before("getting instance before all Test Cases", async function(){
              BallotInst = await Ballot.new();
          });
          //First test case to test chairman is set or not.
          it('chairman is assigned', async function(){
              assert.equal(await BallotInst.chairman(), chairman, 'Test Failed. chairman is not assigned.');
          })
      });
      ---------------------------------------------------------

    > test ./test/ballot.js
    It will fail since we haven't written code.
    > create contract Ballot
    It will create a contract under contract folder.
    > create migration deploy_contracts
    It will create a migration file under migrations folder.
    Now add code in Ballot.sol
    
      ------------------------------------------------------
      pragma solidity ^0.4.4;
      contract Ballot {
          address public chairman;
          //constructor
          function Ballot() public{
              chairman = msg.sender;
          }
      }
      ------------------------------------------------

    > test ./test/ballot.js
    Now your test case will pass.
    Keep adding test cases first and then contract codes...
