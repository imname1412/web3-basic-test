const { expect } = require("chai");

describe("MyContract", function () {
  it("Should return Balance", async function () {
    const MyContract = await ethers.getContractFactory("MyContract");
    const myContract = await MyContract.deploy("CHIN", 500);

    await myContract.deployed();
    expect(await myContract.getMyBalance()).to.equal(500);
  });

  it("Should change amount of balance", async function () {
    const MyContract = await ethers.getContractFactory("MyContract");
    const myContract = await MyContract.deploy("CHIN", 500);

    await myContract.myDeposite(999);
    expect(await myContract.getMyBalance()).to.equal(999 + 500);
  });
});
