import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

async function createTxInclusionProof() {
  try {
    const RPC_URL=process.env.GOERLI_RPC_URL as string

    const { TxInclusionSDK } = await import("@limechain/tx-inclusion-sdk")
    const txInclusionSdk = new TxInclusionSDK(RPC_URL)

    const safeData = JSON.parse(fs.readFileSync('safeData.json', 'utf8'))
    const executedTxHash = safeData.executedTxHash // Get the executed transaction hash

    const txInclusionProof = await txInclusionSdk.getTransactionInclusionProof(executedTxHash)

    // Save the transaction inclusion proof to the safeData.json file
    safeData.txInclusionProof = txInclusionProof
    fs.writeFileSync('safeData.json', JSON.stringify(safeData))

    console.log(txInclusionProof)
  } catch (error) {
    console.error('Error creating transaction inclusion proof:', error)
  }
}

createTxInclusionProof()
