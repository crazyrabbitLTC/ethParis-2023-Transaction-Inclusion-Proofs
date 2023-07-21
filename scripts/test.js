import('hardhat')
  .then(hre => {
    import('@limechain/tx-inclusion-sdk')
      .then(module => {
        async function main() {
          const TxInclusionSDK = module.TxInclusionSDK;
          const txInclusion = new TxInclusionSDK('https://www.google.com');
          console.log(txInclusion);
        }

        main().catch((error) => {
          console.error(error);
          process.exitCode = 1;
        });
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

