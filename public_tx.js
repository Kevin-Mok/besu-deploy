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
const contractBin = fs.readFileSync(contractBinPath);
// initialize the default constructor with a value `47 = 0x2F`; this value is appended to the bytecode
const contractConstructorInit = "000000000000000000000000000000000000000000000000000000000000002F";

async function main(){ 
  // get txnCount for the nonce value
  const txnCount = await web3.eth.getTransactionCount(account.address);

  const rawTxOptions = {
    nonce: web3.utils.numberToHex(txnCount),
    from: account.address,
    to: null, //public tx
    value: "0x00",
    data: '0x'+contractBin+contractConstructorInit, // contract binary appended with initialization value
    gasPrice: "0x0", //ETH per unit of gas
    gasLimit: "0x24A22" //max number of gas units the tx is allowed to use
  };
  console.log("Creating transaction...");
  const tx = new Tx(rawTxOptions);
  console.log("Signing transaction...");
  tx.sign(privateKey);
  console.log("Sending transaction...");
  var serializedTx = tx.serialize();
  const pTx = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex').toString("hex"));
  console.log("tx transactionHash: " + pTx.transactionHash);
  console.log("tx contractAddress: " + pTx.contractAddress);
}

main()
