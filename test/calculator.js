// Using Async-Await
var Calculator  = artifacts.require("./Calculator.sol");
contract('Calculator', function(accounts) {
  let contractInstance;
  //Creating instance before all test cases
  before(async function(){
    contractInstance = await Calculator.new(10);
    console.log("Creating instance for all test cases!");
  });

  it("should return 10", async function(){
    var result = await contractInstance.getVal();
    assert.equal(await result.valueOf(), 10, "Test failed, should return 10");
  });

  it("should return 23", async function(){
    await contractInstance.addNumber(10);
    await contractInstance.subNumber(7);
    var result = await contractInstance.getVal();
    assert.equal(result.valueOf(), 13, "Test failed, should return 13");
    await contractInstance.addNumber(10);
    result = await contractInstance.getVal();
    assert.equal(result.valueOf(), 23, "Test failed, should return 23");
  });
});



//Using Promise

// contract('Calculator', function(accounts) {
//   let contractInstance;
//   //Creating instance before all test cases
//   before(function(){
//     Calculator.deployed().
//     then(function(calInstance){
//       contractInstance  =  calInstance;
//       console.log("Creating instance for all test cases!");
//     });
//   });

//   it("should return 10", function(){
//     contractInstance.getVal.call()
//     .then(function(result){
//       assert.equal(result.valueOf(), 10, "Test failed, should return 10");
//     });
//   });

//   it("should return 23", function(){
//     contractInstance.addNumber(10);
//     contractInstance.subNumber(7);
//     contractInstance.getVal.call()
//     .then(function(result){
//       assert.equal(result.valueOf(), 13, "Test failed, should return 13");
//       contractInstance.addNumber(10);
//       return contractInstance.getVal.call()      
//     })
//     .then(function(result){
//       assert.equal(result.valueOf(), 23, "Test failed, should return 23");
//     });
//   });
// });



// var Calculator  = artifacts.require("./Calculator.sol");
