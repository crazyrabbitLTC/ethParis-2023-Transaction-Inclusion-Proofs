import { ethers } from "hardhat";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const REWARD_CONTRACT_ADDRESS = "0xCcA7ef21F5847251e3Ddf68Ed1701057Ea3D134b";
const OWNER_PRIVATE_KEY = process.env.OWNER_1_PRIVATE_KEY;

const ERC20RewardForProofABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "proverAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "rewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "bytes32",
                "name": "parentHash",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "sha3Uncles",
                "type": "bytes32"
              },
              {
                "internalType": "address",
                "name": "miner",
                "type": "address"
              },
              {
                "internalType": "bytes32",
                "name": "stateRoot",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "transactionsRoot",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "receiptsRoot",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "logsBloom",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "difficulty",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "number",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "gasLimit",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "gasUsed",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "extraData",
                "type": "bytes"
              },
              {
                "internalType": "bytes32",
                "name": "mixHash",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "nonce",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "baseFeePerGas",
                "type": "uint256"
              },
              {
                "internalType": "bytes32",
                "name": "withdrawalsRoot",
                "type": "bytes32"
              }
            ],
            "internalType": "struct BlockData",
            "name": "blockData",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "receiptType",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "postStateOrStatus",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "cumulativeGasUsed",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "keyIndex",
                "type": "bytes"
              },
              {
                "internalType": "bytes",
                "name": "bloom",
                "type": "bytes"
              },
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "addr",
                    "type": "address"
                  },
                  {
                    "internalType": "bytes[]",
                    "name": "topics",
                    "type": "bytes[]"
                  },
                  {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                  }
                ],
                "internalType": "struct TxLog[]",
                "name": "logs",
                "type": "tuple[]"
              }
            ],
            "internalType": "struct TxReceipt",
            "name": "txReceipt",
            "type": "tuple"
          },
          {
            "internalType": "uint256",
            "name": "blockNumber",
            "type": "uint256"
          },
          {
            "internalType": "bytes[]",
            "name": "receiptProofBranch",
            "type": "bytes[]"
          }
        ],
        "internalType": "struct ProverDto",
        "name": "inclusionProof",
        "type": "tuple"
      }
    ],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function claimReward() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL);
  const signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY as string, provider);
  
  // Load safeData and get the transaction inclusion proof
  const safeData = JSON.parse(fs.readFileSync("safeData.json", "utf8"));
  const txInclusionProof = safeData.txInclusionProof;

  // Create contract instance using ethers.js with the contract ABI and address
  const rewardContract = new ethers.Contract(REWARD_CONTRACT_ADDRESS, ERC20RewardForProofABI, provider).connect(signer);

  // Call claimReward with the transaction inclusion proof
  const tx = await rewardContract.claimReward(txInclusionProof);
  const receipt = await tx.wait();

  console.log(`Reward claimed: ${receipt.transactionHash}`);
}

claimReward()
  .catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
  });
