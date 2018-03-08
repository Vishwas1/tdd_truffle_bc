module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  /**
   * truffle migrate = by default it will deploy to test rpc.
   * truffle migration --network QA = will deploy to QA instance.
   * We can also add other properties like, gas, gasprice, from 
   * If not specified these, then it will take default values like, 4712388, 100 shannon, first available account
   */

  networks : {
    development :{
      host : "localhost",
      port : 7545,
      network_id : "5777",
      from : "0xf17f52151EbEF6C7334FAD080c5704D77216b732"
    },

    QA : {
      host : "localhost",
      port : 8545,
      network_id : "3",
      //gas, gasPrice, from 
      from : "" //account needs to be unlocked first.
    },

    live : {
      host : "",
      port : 8545,
      network_id : "*"
    } 

  }
};
