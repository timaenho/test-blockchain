var Purse = artifacts.require("./Purse.sol");
var PurseFactory = artifacts.require("./PurseFactory.sol");

module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  firstAddr = addr[0]
  await deployer.deploy(Purse, firstAddr);
  await deployer.deploy(PurseFactory)
};
