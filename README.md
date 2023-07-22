## Transaction Inclusion Proof demo ETHParis

### Project Description
This project is a proof of concept for a novel implementation of gas-free Safe transactions with account abstraction refunds on L2.

Users of Safe do not need to execute their own transactions, rather using transaction inclusion proofs, anyone can execute a Safe transaction and receive a refund for the cost on L2.

This concept is an improvement on existing relayer models:

- Permissionless, anyone can put a user multi sig Safe transaction onchain
- Requires no refunding logic on L1: Cheaper and no special code needed
- No complicated erc20 approval flow for repayment: Cheaper and easier!
- Refunds are cheaper and faster: All payments are done on L2
- Natively multichain: refund payments for any blockchain in one place.
- General Purpose: TIPs can be used against any kind of transaction such as account abstraction transactions, governance votes, message bridges or otherwise

The vision is that using this design we can build permissionless account abstraction systems for Multisig Safe transactions that works out of the box in a multichain environment. There is a single L2 contract that can service any number of different blockchains without any additional code on those chains.

I think it is worthwhile exploring this system in greater depth as a possibility for significantly increasing Safe ecosystem decentralization. While this demo focuses specifically on the implementation with Safe,

### How does it work?

**TL:DR** Transaction Inclusion Proofs (TIPs) are a kind of primitive for building Intents where anyone can put a user's Intent onchain.

Transaction Inclusion Proofs are a novel kind of proof that proves only a transaction was successfully included in a block. Nothing more, nothing less. This is different than most proof systems which simultaneously prove something and the state of that something. TIPs only prove transaction inclusion, assuming that the authorization of action is protected by the smart contracts included in the transaction. This means we can assume if a transaction is successfully included in a block, the originating user intended the outcome transaction to happen, regardless of who puts the transaction onchain.

In this demo, we are awarding whoever puts a multisig transaction with Safe onchain with some "ETHParis Tokens" on L2 as a payment.

### System Architecture

- **L1**: A multisig contract that is used in the demo to create transactions using SafeKit API but not publish them onchain, but rather publish the Safe transaction to the Safe Transaction service.
- **L2**: A smart contract Trusted Oracle tracks L1 Blocknumbers and L1 BlockHashes. A TransactionInclusionProver smart contract reads from the Trusted Oracle and takes a proof generated offchain, and calculates if the proof is valid.
- **Offchain**: A SDK that is responsible for building the transaction proof to be submitted to the onchain L2 smart contracts.

### DEMO:

A script using SafeCore is used to create, deploy and fund a new Safe to Ethereum Goerli.

The relay is responsible for:

- Pulling new queued transaction on the Safe
- Executing the safe transaction on L1
- Updating the Trusted Oracle with accurate Block data (or via the scripts/blockRelayer.ts file independently)
- Use the LimeChain TIPs SDK to pull and generate a transaction inclusion proof
- Submit the Proof to the L2 prover on Celo
- If the proof passes, the submitter is rewarded with an ERC20 token as payment

### How it's Made
Technologies used:

- Safe{Core} Protocol, Safe{Core} APIKIT, Limechain TIP SDK, nodejs, Celo, Ethereum Goerli, Solidity

This project uses the smart contracts developed by the LimeChain team here as the proving system. The idea of a transaction inclusion proof system was devised by Dennison Bertram prior to the hackathon. The first functional implementation of the concept was created by the team at LimeChain ([https://limechain.tech/](https://limechain.tech/)) prior to the hackathon.

- Smart contracts: [https://github.com/LimeChain/tx-inclusion-contracts/](https://github.com/LimeChain/tx-inclusion-contracts/)
- Proving POC: [https://github.com/LimeChain/tx-inclusion-poc-script/](https://github.com/LimeChain/tx-inclusion-poc-script/)
- SDK: [https://github.com/LimeChain/tx-inclusion-sdk](https://github.com/LimeChain/tx-inclusion-sdk)

### Out of Scope:

Creating a trustless blocknumber and blockhash oracle from L1 to L2 was out of scope for this project. I did however build a trustless relayer that could implement trustless updates to the Oracle. It was not used in the final project. See: scripts/blockRelayer.ts

### Notes:

The code-quality here is pretty low. I was solo hacking while on a keto diet in Paris which is made of croissants and baguettes. Tough.  If I had time I would refactor everything. 

I needed to build several versions of the scripts as I worked through the project design in real time. The earlier version of the scripts can be found in the scripts directory. The final demo code used is script/execTxPushProof.js.
