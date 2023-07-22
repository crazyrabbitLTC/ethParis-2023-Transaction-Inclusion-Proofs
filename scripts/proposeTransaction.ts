import { ethers } from "ethers";
import { EthersAdapter } from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import Safe from "@safe-global/protocol-kit";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// ABI for TransactionPoster contract
const transactionPosterAbi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "pendingSafeTx",
        type: "bytes32",
      },
    ],
    name: "postTransactionHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function listenToPendingTransactions(transactionPosterAddress: string) {
  console.log("Listening to pending txs....");
  const url =
    process.env.GOERLI_WS_URL ||
    "wss://goerli.infura.io/ws/v3/e9ad5000cd7b443e9b9b5fbc9996821d";
  const customWsProvider = new ethers.providers.WebSocketProvider(url);

  customWsProvider.on("pending", (tx) => {
    console.log("Here are inbound txns...");
    console.log(tx);
    customWsProvider.getTransaction(tx).then(function (transaction) {
      if (transaction.to === transactionPosterAddress.toLowerCase()) {
        const iface = new ethers.utils.Interface(transactionPosterAbi);
        const parsedData = iface.parseTransaction({
          data: transaction.data,
          value: transaction.value,
        });
        const pendingSafeTx = parsedData.args[0];
        console.log("Found the pending TX!");
        console.log("pendingSafeTx:", pendingSafeTx);
      }
    });
  });

  // customWsProvider._websocket.on("error", async () => {
  //   console.log(`Unable to connect to the provided WebSocket URL, retrying in 3s...`);
  //   setTimeout(listenToPendingTransactions, 3000);
  // });

  // customWsProvider._websocket.on("close", async (code) => {
  //   console.log(`Connection lost with code ${code}! Attempting reconnect in 3s...`);
  //   customWsProvider._websocket.terminate();
  //   setTimeout(listenToPendingTransactions, 3000);
  // });
}

// async function sendTxToTransactionPoster(
//   contractAddress: string,
//   safeTxHash: string,
//   signer: ethers.Wallet
// ): Promise<ethers.providers.TransactionResponse> {
//   console.log("Sending a tx to the poster contract");
//   const transactionPosterAbi = [
//     "function postTransactionHash(bytes32) public"
//   ];

//   const contract = new ethers.Contract(contractAddress, transactionPosterAbi, signer);

//   // Get the current nonce
//   let nonce = await signer.getTransactionCount("pending");

//   try {
//     const tx = await contract.populateTransaction.postTransactionHash(safeTxHash);
//     let block = await signer.provider.getBlock('latest');

//     // maxPriorityFeePerGas - the maximum fee per gas the sender is willing to give to the miner
//     let maxPriorityFeePerGas = ethers.utils.parseUnits('200', 'gwei');

//     // maxFeePerGas - the maximum fee per gas the sender is willing to pay total
//     let maxFeePerGas = ethers.utils.parseUnits('10000', 'gwei');

//     tx.maxPriorityFeePerGas = maxPriorityFeePerGas;
//     tx.maxFeePerGas = maxFeePerGas;
//     tx.nonce = nonce;

//     // Estimate the gas limit for the transaction
//     let gasLimitEstimate = await signer.estimateGas(tx);
//     // Ensure the gas limit is at least 21000
//     tx.gasLimit = ethers.BigNumber.from(Math.max(21000, gasLimitEstimate.toNumber()));

//     const signedTx = await signer.signTransaction(tx);

//     const txResponse = await signer.provider.sendTransaction(signedTx);
//     console.log("🚀 ~ file: proposeTransaction.ts:31 ~ txResponse:", txResponse);

//     // Increase nonce for the next transaction
//     nonce++;
//     return txResponse;
//   } catch (error) {
//     if (error.code === 'NONCE_EXPIRED') {
//       // Increase nonce and retry if nonce has expired
//       nonce++;
//       return sendTxToTransactionPoster(contractAddress, safeTxHash, signer);
//     } else {
//       // If it's a different error, rethrow it
//       throw error;
//     }
//   }
// }

async function sendTxToTransactionPoster(
  contractAddress: string,
  safeTxHash: string,
  signer: ethers.Signer
): Promise<ethers.providers.TransactionResponse> {
  console.log("Sending a zerofee tx to the poster contract");

  const transactionPosterAbi = [
    "function postTransactionHash(bytes32) public"
  ];

  const contract = new ethers.Contract(contractAddress, transactionPosterAbi, signer);

  try {
    const tx = await contract.populateTransaction.postTransactionHash(safeTxHash);

    // Specify gas price according to the EIP-1559 standard, assuming you are using a compatible network
    // The maxFeePerGas should be larger than the maxPriorityFeePerGas
    tx.maxFeePerGas = ethers.utils.parseUnits('100', 'gwei');
    tx.maxPriorityFeePerGas = ethers.utils.parseUnits('1', 'gwei');

    // Manually set a high gas limit
    tx.gasLimit = ethers.BigNumber.from('6000000');

    const txResponse = await signer.sendTransaction(tx);

    return txResponse;
  } catch (error) {
    // If it's a different error, rethrow it
    throw error;
  }
}


async function proposeTransaction() {
  console.log("Proposing a TX to your safe");
  try {
    const RPC_URL = process.env.GOERLI_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const owner1Signer = new ethers.Wallet(
      process.env.OWNER_1_PRIVATE_KEY!,
      provider
    );

    const safeData = JSON.parse(fs.readFileSync("safeData.json", "utf8"));

    const txPosterAddress = safeData.transactionPosterAddress; // Use the address of the TransactionPoster contract

    const destination = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // Random Address
    const amount = ethers.utils.parseUnits("0", "ether").toString();

    const safeTransactionData: SafeTransactionDataPartial = {
      to: destination,
      data: "0x",
      value: amount,
    };

    const safeSdkOwner1 = await Safe.create({
      ethAdapter: new EthersAdapter({
        ethers,
        signerOrProvider: owner1Signer,
      }),
      safeAddress: safeData.safeAddress,
    });

    const safeTransaction = await safeSdkOwner1.createTransaction({
      safeTransactionData,
    });

    const safeTxHash = await safeSdkOwner1.getTransactionHash(safeTransaction);

    // Stretch Goal
    // start listening to pending TXs
    // listenToPendingTransactions(txPosterAddress)
    // send TX to poster
    sendTxToTransactionPoster(txPosterAddress, safeTxHash, owner1Signer);

    const senderSignature = await safeSdkOwner1.signTransactionHash(safeTxHash);

    const txServiceUrl =
      process.env.GEORLI_TX_SERVICE ||
      "https://safe-transaction-goerli.safe.global";
    const safeService = new SafeApiKit({
      txServiceUrl,
      ethAdapter: new EthersAdapter({
        ethers,
        signerOrProvider: owner1Signer,
      }),
    });

    await safeService.proposeTransaction({
      safeAddress: safeData.safeAddress,
      safeTransactionData: safeTransaction.data,
      safeTxHash,
      senderAddress: await owner1Signer.getAddress(),
      senderSignature: senderSignature.data,
    });

    fs.writeFileSync(
      "safeData.json",
      JSON.stringify({ ...safeData, safeTxHash })
    );

    console.log("Transaction proposed.");
    console.log(`SafeTxHash: ${safeTxHash}`);
  } catch (error) {
    console.error("Error proposing transaction:", error);
  }
}

proposeTransaction();
