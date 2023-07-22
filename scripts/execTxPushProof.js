function getParams(method, params) {
  return { jsonrpc: "2.0", method: method, params: params, id: 1 };
}

const headers = {
  "Content-Type": "application/json",
};

const ERC20RewardForProofABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "proverAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rewardAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "bytes32",
                name: "parentHash",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "sha3Uncles",
                type: "bytes32",
              },
              {
                internalType: "address",
                name: "miner",
                type: "address",
              },
              {
                internalType: "bytes32",
                name: "stateRoot",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "transactionsRoot",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "receiptsRoot",
                type: "bytes32",
              },
              {
                internalType: "bytes",
                name: "logsBloom",
                type: "bytes",
              },
              {
                internalType: "uint256",
                name: "difficulty",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "number",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "gasLimit",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "gasUsed",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "extraData",
                type: "bytes",
              },
              {
                internalType: "bytes32",
                name: "mixHash",
                type: "bytes32",
              },
              {
                internalType: "bytes",
                name: "nonce",
                type: "bytes",
              },
              {
                internalType: "uint256",
                name: "baseFeePerGas",
                type: "uint256",
              },
              {
                internalType: "bytes32",
                name: "withdrawalsRoot",
                type: "bytes32",
              },
            ],
            internalType: "struct BlockData",
            name: "blockData",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "receiptType",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "postStateOrStatus",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "cumulativeGasUsed",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "keyIndex",
                type: "bytes",
              },
              {
                internalType: "bytes",
                name: "bloom",
                type: "bytes",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "addr",
                    type: "address",
                  },
                  {
                    internalType: "bytes[]",
                    name: "topics",
                    type: "bytes[]",
                  },
                  {
                    internalType: "bytes",
                    name: "data",
                    type: "bytes",
                  },
                ],
                internalType: "struct TxLog[]",
                name: "logs",
                type: "tuple[]",
              },
            ],
            internalType: "struct TxReceipt",
            name: "txReceipt",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
          {
            internalType: "bytes[]",
            name: "receiptProofBranch",
            type: "bytes[]",
          },
        ],
        internalType: "struct ProverDto",
        name: "inclusionProof",
        type: "tuple",
      },
    ],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

import("hardhat")
  .then((hre) => {
    import("@limechain/tx-inclusion-sdk")
      .then((module) => {
        import("@safe-global/protocol-kit")
          .then(async (protocolKit) => {
            import("@safe-global/api-kit")
              .then(async (apiKit) => {
                console.clear();
                console.log("Executing Transaction via TX service...");

                const fs = await import("fs");
                const dotenv = await import("dotenv");
                const axios = await import("axios");
                dotenv.config();

                const RPC_URL = process.env.GOERLI_RPC_URL;
                const TxInclusionSDK = module.TxInclusionSDK;
                const txInclusionSdk = new TxInclusionSDK(RPC_URL);

                const PROOVER_CONTRACT_ADDRESS =
                  "0xCcA7ef21F5847251e3Ddf68Ed1701057Ea3D134b";
                const OWNER_PRIVATE_KEY = process.env.OWNER_1_PRIVATE_KEY;

                const provider = new ethers.providers.JsonRpcProvider(
                  process.env.GOERLI_RPC_URL
                );
                const signer = new ethers.Wallet(
                  process.env.OWNER_1_PRIVATE_KEY,
                  provider
                );

                const EthersAdapter = protocolKit.EthersAdapter;
                //   const Safe = protocolKit
                const Safe = protocolKit.default.default;

                //   const SafeApiKit = apiKit.default;
                const SafeApiKit = apiKit.default.default;

                const owner1Signer = new ethers.Wallet(
                  process.env.OWNER_1_PRIVATE_KEY,
                  provider
                );

                const safeData = JSON.parse(
                  fs.readFileSync("safeData.json", "utf8")
                );

                const txServiceUrl =
                  process.env.GOERLI_TX_SERVICE ||
                  "https://safe-transaction-goerli.safe.global";
                const safeService = new SafeApiKit({
                  txServiceUrl,
                  ethAdapter: new EthersAdapter({
                    ethers,
                    signerOrProvider: owner1Signer,
                  }),
                });

                const safeSdkOwner1 = await Safe.create({
                  ethAdapter: new EthersAdapter({
                    ethers,
                    signerOrProvider: owner1Signer,
                  }),
                  safeAddress: safeData.safeAddress,
                });

                console.log("Loading pending Transactions...");
                const pendingTransactions =
                  await safeService.getPendingTransactions(
                    safeData.safeAddress
                  );
                console.log(
                  `${pendingTransactions.results.length} pending transaction found.`
                );
                const transaction = pendingTransactions.results[0]; // Assuming the first pending transaction is the one we want to execute

                console.log("Fetching the transaction from the SafeTX Service");
                const safeTransaction = await safeService.getTransaction(
                  transaction.safeTxHash
                );

                console.log(
                  `Executing transaction for safeTransaction with hash: ${safeTransaction.safeTxHash}`
                );
                const executeTxResponse =
                  await safeSdkOwner1.executeTransaction(safeTransaction);

                const receipt =
                  await executeTxResponse.transactionResponse?.wait();

                const executedTxHash = receipt?.transactionHash;

                console.log(
                  "Transaction executed with hash: ",
                  receipt?.transactionHash
                );
                console.log(
                  `https://goerli.etherscan.io/tx/${receipt?.transactionHash}`
                );

                console.log("Creating Proof...");
                const txInclusionProof =
                  await txInclusionSdk.getTransactionInclusionProof(
                    executedTxHash
                  );

                console.log("Proof Created.");
                const contract = new ethers.Contract(
                  PROOVER_CONTRACT_ADDRESS,
                  ERC20RewardForProofABI,
                  signer
                );

                // ** THIS IS FOR DEMO PURPOSES, NORMALLY THE RELAYER IS ADDING BLOCKS TO ORACLE **//
                console.log("Adding block data to Oracle...");
                const oracleContractAddress = process.env.ORACLE_ADDRESS;
                const oracleContractABI = [
                  "function setBlockHashes(uint256[], bytes32[]) public",
                ];
                const oracleContract = new ethers.Contract(
                  oracleContractAddress,
                  oracleContractABI,
                  signer
                );

                const blockNumber = await provider.getBlockNumber();
                const blockHash = (await provider.getBlock(blockNumber)).hash;

                console.log(
                  `Block number: ${blockNumber} Block hash: ${blockHash}`
                );

                await oracleContract.setBlockHashes([blockNumber], [blockHash]);

                console.log("Block data added to Oracle.");

                 // ** THIS IS FOR DEMO PURPOSES, NORMALLY THE RELAYER IS ADDING BLOCKS TO ORACLE **//
                console.log("Proving inclusion...");
                const tx = await contract.claimReward(txInclusionProof);
                const proofReceipt = await tx.wait();
                console.log(
                  `Transaction hash: ${proofReceipt.transactionHash}`
                );
              })
              .catch((error) => {
                if (error.reason) {
                  console.error(
                    "Error creating transaction inclusion proof:",
                    `Reason: ${error.reason}`
                  );
                }

                if (error.code) {
                  console.error(`Code: ${error.code}`);
                }

                if (error.method) {
                  console.error(`Method: ${error.method}`);
                }

                if (error.transaction) {
                  console.error(`Transaction: `, error.transaction);
                }
              });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
