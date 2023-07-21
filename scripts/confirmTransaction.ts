import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import fs from 'fs'
import dotenv from 'dotenv'
import chalk from 'chalk'

dotenv.config()

async function confirmTransaction() {
  try {
    const RPC_URL='https://eth-goerli.public.blastapi.io'
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

    const owner2Signer = new ethers.Wallet(process.env.OWNER_2_PRIVATE_KEY!, provider)

    const safeData = JSON.parse(fs.readFileSync('safeData.json', 'utf8'))

    const pendingTransactions = await safeService.getPendingTransactions(safeData.safeAddress).results

    const transaction = pendingTransactions[0]
    const safeTxHash = transaction.safeTxHash

    const ethAdapterOwner2 = new EthersAdapter({
      ethers,
      signerOrProvider: owner2Signer
    })

    const safeSdkOwner2 = await Safe.create({
      ethAdapter: ethAdapterOwner2,
      safeAddress: safeData.safeAddress
    })

    const signature = await safeSdkOwner2.signTransactionHash(safeTxHash)
    const response = await safeService.confirmTransaction(safeTxHash, signature.data)

    console.log(chalk.green('Transaction confirmed.'))
  } catch (error) {
    console.error(chalk.red('Error confirming transaction:'), error)
  }
}

confirmTransaction();
