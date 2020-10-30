const BN = require('bignumber.js');

module.exports = {


  friendlyName: 'From human amount',


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

    var b = new BN(amount);
    b = b.multipliedBy(Math.pow(10, decimal));

    // All done.
    return exits.success(b.toString(10));

  }


};

