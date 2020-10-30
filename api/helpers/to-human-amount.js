const BN = require('bignumber.js');

module.exports = {


  friendlyName: 'To human amount',


  description: '',


  inputs: {
    decimal: {
      type: 'string',
      description: '',
      required: true
    },
    amount: {
      type: 'string',
      description: '',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var decimal = inputs.decimal;
    var amount = inputs.amount;

    var f = new BN(amount);
    f = f.dividedBy(Math.pow(10, decimal));
    
    // All done.
    return exits.success(f.toString(10));
  }


};

