/**
 * DatacontrollerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#gettransactioncount
    getTransactionCount: async function(req, res) {
        var data = req.body;
        var addr = data[0];
        try {   
            var result = await sails.web3.eth.getTransactionCount(addr);
            return res.json({success: true, data: result});
        } catch (e) {
            console.dir(e);
            return res.json({success: false, data: e});
        }
    },

    // https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#gettransaction
    getTransaction: async function(req, res) {
        var data = req.body;
        var hash = data[0];
        try {   
            var result = await sails.web3.eth.getTransaction(hash);
            return res.json({success: true, data: result});
        } catch (e) {
            console.dir(e);
            return res.json({success: false, data: e});
        }
    },

    // https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#gettransactionreceipt
    getTransactionReceipt: async function(req, res) {
        var data = req.body;
        var hash = data[0];
        try {
            var result = await sails.web3.eth.getTransactionReceipt(hash);
            return res.json({success: true, data: result});
        } catch (e) {
            console.dir(e);
            return res.json({success: false, data: e});
        }
    }

};

