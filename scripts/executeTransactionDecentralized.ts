import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

async function executeTransaction(safeTxHash: string) {
  try {
    const RPC_URL = process.env.GOERLI_RPC_URL
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

    const owner1Signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY!, provider)

    const safeData = JSON.parse(fs.readFileSync('safeData.json', 'utf8'))

    const txServiceUrl = process.env.GOERLI_TX_SERVICE ||'https://safe-transaction-goerli.safe.global'
    const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: new EthersAdapter({
      ethers,
      signerOrProvider: owner1Signer
    }) })

    const safeSdkOwner1 = await Safe.create({
      ethAdapter: new EthersAdapter({
        ethers,
        signerOrProvider: owner1Signer
      }),
      safeAddress: safeData.safeAddress
    })

    const safeTransaction = await safeService.getTransaction(safeTxHash)
    const executeTxResponse = await safeSdkOwner1.executeTransaction(safeTransaction)
    const receipt = await executeTxResponse.transactionResponse?.wait()

    safeData.executedTxHash = receipt?.transactionHash
    fs.writeFileSync('safeData.json', JSON.stringify(safeData))

    console.log('Transaction executed:')
    console.log(`https://goerli.etherscan.io/tx/${receipt?.transactionHash}`)
  } catch (error) {
    console.error('Error executing transaction:', error)
  }
}

// listen to the event
async function listenToEvents() {

    console.log("Listening for TXns to execute")

    // ABI for TransactionPoster contract
const transactionPosterAbi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "pendingSafeTx",
          "type": "bytes32"
        }
      ],
      "name": "TransactionPosted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "pendingSafeTx",
          "type": "bytes32"
        }
      ],
      "name": "postTransactionHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  const RPC_URL = process.env.GOERLI_RPC_URL
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
  const safeData = JSON.parse(fs.readFileSync('safeData.json', 'utf8'))

  const txPosterAddress = safeData.transactionPosterAddress 
  const contract = new ethers.Contract(txPosterAddress, transactionPosterAbi, provider)

  // change to the actual event name and parameters
  contract.on("TransactionPosted", (safeTxHash, event) => {
    console.log("New TransactionPosted:", safeTxHash);
    executeTransaction(safeTxHash);
  });
}

listenToEvents();
