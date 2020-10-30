# web-3-for-java

a [Sails v1](https://sailsjs.com) application for translate java request to Node.JS web3 interface.

This project is ONLY allowed to deploy INTERNAL usage.

## Interface

All interface are JSON format, with `POST` method, and accept parameters with string arrays.

Sense of each parameter is defined by interface author and interface user.

Each interface will do not check input data.

Name of each interface should consistent with Ethereum Web3 JSON RPC method name.

## Run

```js
npm install
node app.js
```