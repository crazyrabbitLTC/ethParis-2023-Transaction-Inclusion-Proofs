function getParams(method, params) {
  return { jsonrpc: "2.0", method: method, params: params, id: 1 };
}

const headers = {
  "Content-Type": "application/json",
};

import("hardhat")
  .then((hre) => {
    import("@limechain/tx-inclusion-sdk")
      .then(async (module) => {
        
        // Import fs and dotenv within the function
        const fs = await import("fs");
        const dotenv = await import("dotenv");
        const axios = await import("axios");
        dotenv.config();
        
        const RPC_URL = process.env.GOERLI_RPC_URL;
        const TxInclusionSDK = module.TxInclusionSDK;
        const txInclusionSdk = new TxInclusionSDK(RPC_URL);
        

        try {
          const safeData = JSON.parse(fs.readFileSync("safeData.json", "utf8"));
          const executedTxHash = safeData.executedTxHash; // Get the executed transaction hash

          // const response = await axios.default.post(
          //   RPC_URL,
          //   getParams("eth_getTransactionByHash", [executedTxHash]),
          //   { headers }
          // );
          // console.log(
          //   "🚀 ~ file: createInclusionProof.js:25 ~ .then ~ response:",
          //   response.data.result
          // );

          // console.log("🚀 ~ file: createInclusionProof.js:18 ~ .then ~ executedTxHash:", executedTxHash)

          const txInclusionProof = await txInclusionSdk.getTransactionInclusionProof(executedTxHash);
          console.log("🚀 ~ file: createInclusionProof.js:20 ~ .then ~ txInclusionProof:", txInclusionProof)

          // Save the transaction inclusion proof to the safeData.json file
          safeData.txInclusionProof = txInclusionProof;
          fs.writeFileSync("safeData.json", JSON.stringify(safeData));

          console.log(txInclusionProof);
        } catch (error) {
          console.error("Error creating transaction inclusion proof:", error);
        }
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
