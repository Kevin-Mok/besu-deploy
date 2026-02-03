# Besu Deploy

![Solidity](https://img.shields.io/badge/Solidity-0.8.19-363636?logo=solidity)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![Web3.js](https://img.shields.io/badge/Web3.js-1.9-F16822?logo=web3.js)

A lightweight Ethereum smart contract deployment toolkit for compiling Solidity contracts and deploying them to EVM-compatible networks using Web3.js.

## Overview

This project provides a streamlined workflow for deploying Solidity smart contracts to Ethereum or any EVM-compatible blockchain (such as Hyperledger Besu, Polygon, or testnets like Goerli). It includes a simple `SimpleStorage` contract as a demonstration, along with compilation and deployment scripts.

## Features

- **Solidity Compilation** - Compile `.sol` files to ABI and bytecode using `solc`
- **Raw Transaction Signing** - Sign transactions using private keys with `@ethereumjs/tx`
- **Constructor Parameter Encoding** - ABI-encode constructor arguments for contract initialization
- **Network Agnostic** - Deploy to any EVM-compatible network by changing the RPC endpoint

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Language** | JavaScript (Node.js) |
| **Smart Contracts** | Solidity 0.8.x |
| **Web3 Library** | Web3.js 1.9 |
| **Transaction Signing** | @ethereumjs/tx |
| **Compiler** | solc 0.8.19 |

## Project Structure

```
besu-deploy/
├── compile.js           # Compiles Solidity to ABI + bytecode
├── public_tx.js         # Deploys contract via signed transaction
├── SimpleStorage.sol    # Example smart contract
├── SimpleStorage.json   # Compiled contract artifact
├── SimpleStorage.abi    # Contract ABI
├── SimpleStorage.bin    # Contract bytecode
├── config.js.example    # Configuration template
└── package.json
```

## Installation

### Prerequisites

- Node.js 18+
- An Ethereum wallet with testnet ETH (for gas fees)
- MetaMask or similar wallet to export private key

### Setup

```bash
# Clone the repository
git clone https://github.com/Kevin-Mok/besu-deploy.git
cd besu-deploy

# Install dependencies
npm install

# Configure your private key
cp config.js.example config.js
# Edit config.js and add your private key (without 0x prefix)
```

## Usage

### Compile Contract

```bash
node compile.js
```

This generates `SimpleStorage.json` with the ABI and bytecode.

### Deploy Contract

```bash
node public_tx.js
```

This deploys the contract to the configured network (default: Goerli testnet).

### Example Contract

The included `SimpleStorage.sol` demonstrates:
- State variable storage
- Event emission on value changes
- Constructor initialization with parameters

```solidity
contract SimpleStorage {
  uint public storedData;
  event stored(address _to, uint _amount);

  constructor(uint initVal) {
    emit stored(msg.sender, initVal);
    storedData = initVal;
  }

  function set(uint x) public {
    emit stored(msg.sender, x);
    storedData = x;
  }

  function get() view public returns (uint) {
    return storedData;
  }
}
```

## Why This Project is Interesting

### Technical Highlights

1. **Low-Level Transaction Construction**
   - Builds raw Ethereum transactions from scratch
   - Demonstrates nonce management for transaction ordering
   - Shows gas limit and gas price configuration

2. **ABI Encoding**
   - Uses `web3.eth.abi.encodeParameters()` for constructor arguments
   - Concatenates bytecode with encoded parameters for deployment

3. **Solidity Compiler Integration**
   - Programmatic compilation using `solc` Standard JSON I/O
   - Extracts ABI and bytecode from compiler output

### Skills Demonstrated

- **Blockchain Development**: Smart contract compilation and deployment workflows
- **Ethereum Internals**: Raw transaction construction, signing, and broadcasting
- **Node.js**: Async/await patterns, file system operations, JSON processing
- **Web3 Development**: Web3.js library usage, ABI encoding, RPC interaction

## Author

[Kevin Mok](https://github.com/Kevin-Mok)
