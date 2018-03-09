var Calculator = artifacts.require("./Calculator.sol");
var FundRaise = artifacts.require("./FundRaise.sol");
var Ballot = artifacts.require("./Ballot.sol");

module.exports = function(deployer) {
  deployer.deploy(Calculator, 10);
  deployer.deploy(FundRaise);
  deployer.deploy(Ballot, "Test Ballot", 300);
};
