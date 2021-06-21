const mongoose = require("mongoose");

const Customer = mongoose.model("customer", {
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

module.exports = Customer;
