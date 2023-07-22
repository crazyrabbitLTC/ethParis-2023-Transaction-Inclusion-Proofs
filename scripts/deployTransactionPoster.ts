require("dotenv").config();
const fs = require("fs");
const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  console.log("Deploying transaction poster contract...");
  const RPC_URL = process.env.GOERLI_RPC_URL;
  const OWNER_1_PRIVATE_KEY = process.env.OWNER_1_PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(OWNER_1_PRIVATE_KEY, provider);

  // We get the contract to deploy
  const TransactionPoster = await hre.ethers.getContractFactory(
    "TransactionPoster",
    wallet
  );
  const transactionPoster = await TransactionPoster.deploy();
  await transactionPoster.deployed();

  console.log("TransactionPoster deployed to:", transactionPoster.address);

  // Get existing data from safeData.json
  let safeData;
  try {
    safeData = JSON.parse(fs.readFileSync("safeData.json", "utf8"));
  } catch (error) {
    console.error("Could not read safeData.json file:", error);
    safeData = {}; // Initialize to empty object if file read fails
  }

  // Update safeData with TransactionPoster address
  safeData.transactionPosterAddress = transactionPoster.address;

  // Write updated safeData back to file
  fs.writeFileSync("safeData.json", JSON.stringify(safeData));

  console.log("TransactionPoster address saved to safeData.json.");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
