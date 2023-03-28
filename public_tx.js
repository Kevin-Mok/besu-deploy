const path = require('path');
const fs = require('fs-extra');
const config = require('./config')
const Web3 = require('web3');
const Tx = require('@ethereumjs/tx').Transaction

const web3 = new Web3("https://goerli.blockpi.network/v1/rpc/public");
// use an existing account, or make an account
const privateKey = config.privateKey;
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// read in the contracts
const contractJsonPath = path.resolve(__dirname, 'SimpleStorage.json');
const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));
const contractAbi = contractJson.abi;
const contractBinPath = path.resolve(__dirname,'SimpleStorage.bin');
// const contractBin = fs.readFileSync(contractBinPath);
const contractBin = "608060405234801561001057600080fd5b5060405161038a38038061038a833981810160405281019061003291906100b3565b7fc9db20adedc6cf2b5d25252b101ab03e124902a73fcb12b753f3d1aaa2d8f9f53382604051610063929190610130565b60405180910390a18060008190555050610159565b600080fd5b6000819050919050565b6100908161007d565b811461009b57600080fd5b50565b6000815190506100ad81610087565b92915050565b6000602082840312156100c9576100c8610078565b5b60006100d78482850161009e565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061010b826100e0565b9050919050565b61011b81610100565b82525050565b61012a8161007d565b82525050565b60006040820190506101456000830185610112565b6101526020830184610121565b9392505050565b610222806101686000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632a1afcd91461004657806360fe47b1146100645780636d4ce63c14610080575b600080fd5b61004e61009e565b60405161005b9190610109565b60405180910390f35b61007e60048036038101906100799190610155565b6100a4565b005b6100886100e7565b6040516100959190610109565b60405180910390f35b60005481565b7fc9db20adedc6cf2b5d25252b101ab03e124902a73fcb12b753f3d1aaa2d8f9f533826040516100d59291906101c3565b60405180910390a18060008190555050565b60008054905090565b6000819050919050565b610103816100f0565b82525050565b600060208201905061011e60008301846100fa565b92915050565b600080fd5b610132816100f0565b811461013d57600080fd5b50565b60008135905061014f81610129565b92915050565b60006020828403121561016b5761016a610124565b5b600061017984828501610140565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006101ad82610182565b9050919050565b6101bd816101a2565b82525050565b60006040820190506101d860008301856101b4565b6101e560208301846100fa565b939250505056fea26469706673582212204452c944dd5431f2cc54c6617ce734baeeba6e6634646cfe8e4d46eab03b4ac264736f6c63430008130033"
// initialize the default constructor with a value `47 = 0x2F`; this value is appended to the bytecode
// const contractConstructorInit = "000000000000000000000000000000000000000000000000000000000000002F";
// const contractConstructorInit = "0x000000000000000000000000000000000000000000000000000000000000002f";
// const contractConstructorInit = web3.utils.soliditySha3()
const contractConstructorInit = web3.eth.abi.encodeParameters(['uint'], ['47']).slice(2);

async function main(){ 
  // get txnCount for the nonce value
  const txnCount = await web3.eth.getTransactionCount(account.address);
  console.log(contractConstructorInit)

  const rawTxOptions = {
    nonce: web3.utils.numberToHex(txnCount),
    from: account.address,
    to: null, //public tx
    value: "0x00",
    // data: '0x'+contractBin.toString('hex')+contractConstructorInit, // contract binary appended with initialization value
    data: '0x'+contractBin+contractConstructorInit, // contract binary appended with initialization value
    gasPrice: "0x0", //ETH per unit of gas
    gasLimit: "0x24A22" //max number of gas units the tx is allowed to use
  };
  // console.log("Creating transaction...");
  // console.log(privateKey)
  // const tx = new Tx(rawTxOptions);
  // console.log("Signing transaction...");
  // tx.sign(privateKey);
  // console.log("Sending transaction...");
  // var serializedTx = tx.serialize();
  // const pTx = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex').toString("hex"));
  // console.log("tx transactionHash: " + pTx.transactionHash);
  // console.log("tx contractAddress: " + pTx.contractAddress);

    // const tx = new Tx(rawTxOptions, {common: BSC_MAIN});
    const tx = new Tx(rawTxOptions);
    // console.log("Signing transaction...");
    // tx.sign(privateKey);
    // console.log("Sending transaction...");
    // var serializedTx = tx.serialize();
    // const pTx = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex').toString("hex"));
    // console.log("tx transactionHash: " + pTx.transactionHash);
    // console.log("tx contractAddress: " + pTx.contractAddress);

    // web3.eth.accounts.signTransaction(rawTxOptions, privateKey).then(signedTx => {
    web3.eth.accounts.signTransaction(tx, privateKey).then(signedTx => {
        web3.eth.sendSignedTransaction(signedTx);
    })
}

main()
