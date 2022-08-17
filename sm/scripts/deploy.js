const hre = require("hardhat");

async function main() {
  const MyContract = await hre.ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy("merklePatt", 500);

  await myContract.deployed();

  console.log(`Deployed to ${myContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
