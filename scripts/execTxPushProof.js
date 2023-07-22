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

const POLLING_INTERVAL_MS = 30000; // 30 seconds polling interval

////aaaaaaaaaa so badddddd but don't have time to mix modules...
import("hardhat").then((hre) => {
  import("@limechain/tx-inclusion-sdk").then((module) => {
    import("@safe-global/protocol-kit")
      .then(async (protocolKit) => {
        import("@safe-global/api-kit")
          .then(async (apiKit) => {
            import("chalk")
              .then(async (chalkModule) => {
                const chalk = chalkModule.default || chalkModule;
                import("node-emoji")
                  .then(async (emojiModule) => {
                    const emoji = emojiModule.default || emojiModule;
                    console.clear();

                    const fs = await import("fs");
                    const dotenv = await import("dotenv");
                    const axios = await import("axios");
                    dotenv.config();

                    // USING CELO
                    const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
                    const RPC_URL = process.env.CELO_RPC_URL;

                    const PROVER_CONTRACT_ADDRESS =
                      process.env.CELO_PROVER_ADDRESS;

                    // const OWNER_PRIVATE_KEY = process.env.OWNER_1_PRIVATE_KEY;

                    // USING CELO
                    const goerli_provider =
                      new ethers.providers.JsonRpcProvider(
                        process.env.GOERLI_RPC_URL
                      );
                    const provider = new ethers.providers.JsonRpcProvider(
                      RPC_URL
                    );
                    const signer = new ethers.Wallet(
                      process.env.OWNER_1_PRIVATE_KEY,
                      provider
                    );

                    const EthersAdapter = protocolKit.EthersAdapter;
                    const Safe = protocolKit.default.default;
                    const SafeApiKit = apiKit.default.default;

                    const owner1Signer = new ethers.Wallet(
                      process.env.OWNER_1_PRIVATE_KEY,
                      provider
                    );
                    const goerli_owner1Signer = new ethers.Wallet(
                      process.env.OWNER_1_PRIVATE_KEY,
                      goerli_provider
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
                        signerOrProvider: goerli_owner1Signer,
                      }),
                    });

                    const safeSdkOwner1 = await Safe.create({
                      ethAdapter: new EthersAdapter({
                        ethers,
                        signerOrProvider: goerli_owner1Signer,
                      }),
                      safeAddress: safeData.safeAddress,
                    });

                    const pollTransactions = async () => {
                      //   console.log(cliSpinners.aesthetic);
                      console.log(
                        emoji.get("mag") +
                          " " +
                          chalk.blue(
                            "Fetching the transaction from the SafeTX Service..."
                          )
                      );

                      const pendingTransactions =
                        await safeService.getPendingTransactions(
                          safeData.safeAddress
                        );
                      console.log(
                        `${pendingTransactions.results.length} pending transaction(s) found.`
                      );

                      if (pendingTransactions.results.length > 0) {
                        const transaction = pendingTransactions.results[0];

                        const safeTransaction =
                          await safeService.getTransaction(
                            transaction.safeTxHash
                          );

                          console.log(
                            emoji.get("hourglass_flowing_sand") +
                              " " +
                              chalk.yellow(
                                `Executing transaction for safeTransaction with hash: ${chalk.cyan(
                                  safeTransaction.safeTxHash
                                )}`
                              )
                          );
                        const executeTxResponse =
                          await safeSdkOwner1.executeTransaction(
                            safeTransaction
                          );

                        const receipt =
                          await executeTxResponse.transactionResponse?.wait();
                        const executedTxHash = receipt?.transactionHash;
                        console.log(
                          emoji.get("checkered_flag") +
                            " " +
                            chalk.green(
                              "Transaction executed with hash: ",
                              chalk.magenta(executedTxHash)
                            )
                        );
                        console.log(
                          chalk.blue(
                            `https://goerli.etherscan.io/tx/${chalk.underline(
                              executedTxHash
                            )}`
                          )
                        );

                        // Add Block Data to Trusted Oracle
                        console.log(
                          emoji.get("crystal_ball") +
                            " " +
                            chalk.blue("Adding block data to Oracle...")
                        );
                        const oracleContractAddress =
                          process.env.CELO_ORACLE_ADDRESS;
                        const oracleContractABI = [
                          "function setBlockHashes(uint256[], bytes32[]) public",
                        ];
                        const oracleContract = new ethers.Contract(
                          oracleContractAddress,
                          oracleContractABI,
                          signer
                        );

                        const blockNumber = await goerli_provider.getBlockNumber();
                        const blockHash = (await goerli_provider.getBlock(blockNumber))
                          .hash;

                        console.log(
                          chalk.cyan(
                            `Block number: ${blockNumber} Block hash: ${blockHash}`
                          )
                        );
                        await oracleContract.setBlockHashes(
                          [blockNumber],
                          [blockHash]
                        );

                        console.log(
                          emoji.get("white_check_mark") +
                            " " +
                            chalk.green("Block data added to Oracle.")
                        );

                        const TxInclusionSDK = module.TxInclusionSDK;
                        const txInclusionSdk = new TxInclusionSDK(
                          GOERLI_RPC_URL
                        );

                        console.log(
                          emoji.get("bulb") +
                            " " +
                            chalk.yellow("Creating Proof...")
                        );

                        const txInclusionProof =
                          await txInclusionSdk.getTransactionInclusionProof(
                            executedTxHash
                          );

                        console.log(
                          emoji.get("star") +
                            " " +
                            chalk.green("Proof Created.")
                        );

                        const contract = new ethers.Contract(
                          PROVER_CONTRACT_ADDRESS,
                          ERC20RewardForProofABI,
                          signer
                        );
                        console.log(
                          emoji.get("rocket") +
                            " " +
                            chalk.blue("Proving inclusion...")
                        );
                        const tx = await contract.claimReward(txInclusionProof);
                        const proofReceipt = await tx.wait();
                        console.log(
                          emoji.get("trophy") +
                            " " +
                            chalk.white(
                              `Success!`
                            )
                        );

                        console.log(
                            emoji.get("trophy") +
                              " " +
                              chalk.green(
                                `Transaction hash for refund: ${chalk.magenta(
                                  proofReceipt.transactionHash
                                )}`
                              )
                          );
                      }
                    };

                    // Initially call the function
                    await pollTransactions();

                    // Set the interval for calling the function
                    setInterval(pollTransactions, POLLING_INTERVAL_MS);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
});
