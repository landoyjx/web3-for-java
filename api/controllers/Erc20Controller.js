/**
 * Erc20Controller
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const erc20abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }];

module.exports = {
  
    // from contract balance
    erc20Balance: async function(req, res) {
        var data = req.body;
        var addr = data[0];
        var contract = data[1];

        var web3 = sails.web3;

        try {
            var myContract = new web3.eth.Contract(erc20abi, contract);
            var decimal = await myContract.methods.decimals().call();
            // call balanceOf method
            var result = await myContract.methods.balanceOf(addr).call();
            result = await sails.helpers.toHumanAmount(decimal, result);
            return res.json({success: true, data: result});
        } catch (e) {
            console.dir(e);
            return res.json({success: false, data: e});
        }
    },

    // erc20 transfer method
    erc20Transafer: async function(req, res) {
        var data = req.body;
        var secret = data[0];
        var from = data[1];
        var to = data[2];
        var contract = data[3];
        var value = data[4];
        var price = data[5];
        var limit = data[6];

        var web3 = sails.web3;

        try {
            var privateKey = Buffer.from(secret,'hex');
            var nonce = await web3.eth.getTransactionCount(from);
            var myContract = new web3.eth.Contract(erc20abi, contract);
            var decimal = await myContract.methods.decimals().call();
            var _amount = await sails.helpers.fromHumanAmount(decimal, value);
            // call transfer method
            var getData = myContract.methods.transfer(to, _amount).encodeABI();

            var txObject ={
                nonce: web3.utils.toHex(nonce),
                gasPrice: web3.utils.toHex(web3.utils.toWei(price, 'gwei')), 
                gasLimit: web3.utils.toHex(limit),
                to: to,
                value: web3.utils.toHex(web3.utils.toWei(value,'ether')),
                data: getData,
                chainId: 200812
            }

            var tx = new Tx(txObject);
            tx.sign(privateKey);
            var serializedTx = tx.serialize();

            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, d) {
                if (err) {
                    console.dir(err);
                    return res.json({success: false, data: err});
                }
                return res.json({success: true, data: d});
            });
        } catch (e) {
            console.dir(e);
            return res.json({success: false, data: e});
        }
    }

};

