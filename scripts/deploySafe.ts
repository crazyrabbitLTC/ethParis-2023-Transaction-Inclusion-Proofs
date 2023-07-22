import { ethers } from 'ethers'
import { EthersAdapter, EthersTransactionOptions } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import { SafeFactory } from '@safe-global/protocol-kit'
import { SafeAccountConfig } from '@safe-global/protocol-kit'
import fs from 'fs'
import dotenv from 'dotenv'


dotenv.config()

async function deploySafe() {

  console.log('Deploying Safe...')
  try {
    const RPC_URL=process.env.GOERLI_RPC_URL
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

    const owner1Signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY!, provider)


    const ethAdapterOwner1 = new EthersAdapter({
      ethers,
      signerOrProvider: owner1Signer
    })

    const txServiceUrl = process.env.GOERLI_TX_SERVICE || 'https://safe-transaction-goerli.safe.global'
    const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 })

    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })

    const safeAccountConfig: SafeAccountConfig = {
      owners: [
        await owner1Signer.getAddress(),
      ],
      threshold: 1,
    }

    const options: EthersTransactionOptions = {
      gasLimit: 1000000, // Set your gas limit here
      gasPrice: ethers.utils.parseUnits('10', 'gwei'), // Set your gas price here
    }

    const saltNonce = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(); // Generates a random number as a string

    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig, options, saltNonce })

    const safeAddress = await safeSdkOwner1.getAddress()

    fs.writeFileSync('safeData.json', JSON.stringify({ safeAddress }))

    console.log('Your Safe has been deployed:')
    console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
    console.log(`https://app.safe.global/gor:${safeAddress}`)
  } catch (error) {
    console.error('Error deploying Safe:', error)
  }
}

deploySafe();
