/**
 * UtilsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    toHex: function(req, res) {
        var data = req.body;
        var input = data[0];
        var result = sails.web3.utils.toHex(input);
        return res.json({success: true, data: result});
    }

};

