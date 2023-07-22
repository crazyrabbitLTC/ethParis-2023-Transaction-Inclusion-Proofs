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


async function proposeTransaction() {
  console.clear()
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
