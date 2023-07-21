import { ethers } from 'ethers'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

async function fundSafe() {
    console.log('Funding Safe....')
  try {
    const RPC_URL=process.env.GOERLI_RPC_URL
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

    const owner1Signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY!, provider)

    const safeData = JSON.parse(fs.readFileSync('safeData.json', 'utf8'))

    const safeAmount = ethers.utils.parseUnits('0.001', 'ether').toHexString()

    const transactionParameters = {
      to: safeData.safeAddress,
      value: safeAmount
    }

    const tx = await owner1Signer.sendTransaction(transactionParameters)

    console.log('Fundraising.')
    console.log(`Deposit Transaction: ${process.env.GOERLI_ETHERSCAN}${tx.hash}`)
  } catch (error) {
    console.error('Error funding Safe:', error)
  }
}

fundSafe();
