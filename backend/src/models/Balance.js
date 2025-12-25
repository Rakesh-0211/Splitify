const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Balance", balanceSchema);
