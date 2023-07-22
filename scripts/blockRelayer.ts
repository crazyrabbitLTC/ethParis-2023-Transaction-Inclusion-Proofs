import { ethers } from "hardhat";

async function blockRelayer() {
  // console.clear();
  require('dotenv').config();

  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL); 
  console.log("Relayer running...");
  
  const contractAddress: string = process.env.ORACLE_ADDRESS as string
  const privateKey: string = process.env.RELAYER_PK!;
  console.log(`Pushing new block hashes to oracle deployed at: ${contractAddress}`)

  const wallet = new ethers.Wallet(privateKey, provider);

  const contractABI = [
    "function setBlockHashes(uint256[], bytes32[]) public",
  ];

  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  let blockNumbers: number[] = [];
  let blockHashes: string[] = [];

  provider.on('block', async (blockNumber: number) => {
    try {
      const block = await provider.getBlock(blockNumber);
      const blockHash = block.hash;

      // Check if blockNumber already exists in blockNumbers array
      if (!blockNumbers.includes(blockNumber)) {
        console.log('New block:', blockNumber, " Hash:", blockHash);

        blockNumbers.push(blockNumber);
        blockHashes.push(blockHash);
      }

      if (blockNumbers.length === 2) {
        let retryCount = 0;
        const maxRetries = 5;
        let gasPrice = ethers.utils.parseUnits("50", "gwei");

        while (retryCount < maxRetries) {
          try {
            const tx = await contract.setBlockHashes(blockNumbers, blockHashes, {gasLimit: ethers.utils.hexlify(500000), gasPrice: gasPrice});
            console.log('Sending tx:', tx.hash);
            await tx.wait();

            console.log(`Block hashes for block numbers ${blockNumbers.join(', ')} set.`);
            break;
          } catch (err) {
            console.log(err);
            if (err.message.includes('nonce') || err.message.includes('replacement')) {
              retryCount += 1;
              gasPrice = gasPrice.add(gasPrice.div(10));
              
              // Delay before next attempt
              await new Promise(resolve => setTimeout(resolve, 3000));
            } else {
              throw err;
            }
          }
        }

        if (retryCount === maxRetries) {
          console.log(`Failed to set block hashes after ${maxRetries} attempts.`);
        }

        // Reset blockNumbers and blockHashes arrays
        blockNumbers = [];
        blockHashes = [];
      }
    } catch (err) {
      console.error('Error processing block:', err);
      blockRelayer().catch((error: any) => {
        console.error(error);
        process.exit(1);
      });
    }
  });
}

blockRelayer()
  .catch((error: any) => {
    console.error(error);
    process.exit(1);
  });
