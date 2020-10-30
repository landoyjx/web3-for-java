/**
 * EthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Tx = require('ethereumjs-tx').Transaction;

module.exports = {
  
    // https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#getbalance
    getBalance: async function(req, res) {
        var data = req.body;
        var addr = data[0];
        try {   
            var result = await sails.web3.eth.getBalance(addr);
            var balance = sails.web3.utils.fromWei(result, 'ether');
            return res.json({success: true, data: balance});
        } catch (e) {
            console.dir(e);
            return res.json({success: false, data: e});
        }
    },

    // https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#sendtransaction
    sendETHTransaction: async function(req, res) {
        var data = req.body;
        var secret = data[0];
        var from = data[1];
        var to = data[2];
        var value = data[3];
        var price = data[4];
        var limit = data[5];

        var web3 = sails.web3;

        try {
            var privateKey = Buffer.from(secret,'hex');
            var nonce = await web3.eth.getTransactionCount(from);

            var txObject ={
                nonce: web3.utils.toHex(nonce),
                gasPrice: web3.utils.toHex(web3.utils.toWei(price, 'gwei')), 
                gasLimit: web3.utils.toHex(limit),
                to: to,
                value: web3.utils.toHex(web3.utils.toWei(value,'ether')),
                data: '0x0',
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

