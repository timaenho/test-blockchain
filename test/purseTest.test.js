const Purse = artifacts.require("../contracts/purse");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("contract Test - purse.sol", function (getAccounts) {
  const [owner, anotherAccount] = getAccounts;
  console.log(owner);
  it("balance should be 0", async () => {
    let instance = await Purse.deployed();
    return expect(
      instance.getBalance.call()
    ).to.eventually.be.a.bignumber.equal(new BN(0));
  });

  it("should be possible to send money to the contract", async () => {
    let instance = await Purse.deployed();
    await expect(
      instance.sendTransaction({
        from: owner,
        value: web3.utils.toWei("1", "wei"),
      })
    ).to.be.fulfilled;
    return expect(
        instance.getBalance.call()
      ).to.eventually.be.a.bignumber.equal(new BN(1));
  });
});
