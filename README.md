# TEST DRIVEN DEVELOPMENT (TDD) IN BLOCKCHAIN USING TRUFFLE 

Test-Driven development is a process of developing and running automated test before actual development of the application. Hence, TDD sometimes also called as Test First Development.

### 3 thumb rules of TDD
1. You are not allowed to write any production code unless it is to make a failing unit test pass.Meaning you should first test case before any production code and that test should fail.
2. You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are   failures.Meaning you should stop writing any further test case if your test case fail. So the moment your test case fails, you should stop writing the more test case, and start working on production code. And also, even if compiling of test case fails, stop wrting more test cases.
3. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

### How to perform TDD Test
1. Add a test.
2. Run all tests and see if any new test fails.
3. Write some code.
4. Run tests and Refactor code.
5. Repeat

Truffle comes with built in Mocha test framework and Chai assertion library.

![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Test-driven_development.svg/685px-Test-driven_development.svg.png)

## Steps to follow to start using TDD in Truffle

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
    
    Here is ballot.js test file :  https://github.com/Vishwas1/tdd_truffle_bc/blob/master/test/ballot.js
    Here is Ballot.sol contract file : https://github.com/Vishwas1/tdd_truffle_bc/blob/master/contracts/Ballot.sol 
    
    
## Summary:

 - Test driven development is a process of modifying code in order to pass a test designed previously.
 - It more emphasis on production code rather than test case design.
 - It is sometimes known as "Test First Development."
 - TDD includes refactoring a code i.e. changing/adding some amount of code to the existing code without affecting the behavior of the code.
 - TDD when used, the code becomes clearer and simple to understand.

## Few use full links

https://docs.google.com/document/d/1eVqEO-nRNDD9hUktqolYBfG-MbzMEvZVsEr6sZu6u7U/edit# 
https://www.codeproject.com/Articles/683498/DTDT
