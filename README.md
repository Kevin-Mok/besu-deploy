# Running
Add [private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) 
in [`config.js.example`](https://github.com/Kevin-Mok/besu-deploy/blob/0625bcef2ca0e777d18cfb4ce00c8d38c8f65455/config.js.example#L3).
```
mv config.js.example config.js
npm i
node public_tx.js
```

# Error
```
throw new Error(`Cannot convert string to buffer. toBuffer 
only supports 0x-prefixed hex strings and this string was 
given: ${v}`);

Error: Cannot convert string to buffer. toBuffer only 
supports 0x-prefixed hex strings and this string was given: 
0x60806...
000...0002F
    at toBuffer (/home/kevin/coding/dao-voting/besu-deploy/node_modules/@ethereumjs/util/dist/bytes.js:147:19)
    at new BaseTransaction (/home/kevin/coding/dao-voting/besu-deploy/node_modules/@ethereumjs/tx/dist/baseTransaction.js:53:41)
    at new Transaction (/home/kevin/coding/dao-voting/besu-deploy/node_modules/@ethereumjs/tx/dist/legacyTransaction.js:28:9)
    at main (/home/kevin/coding/dao-voting/besu-deploy/public_tx.js:35:14)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

Node.js v18.7.0
```
