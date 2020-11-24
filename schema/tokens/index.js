const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    _userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires: {
      type: Number,
      default: 86400000,
    },
  },
  {
    collection: "tokens",
  }
);
module.exports.Token = mongoose.model("Token", TokenSchema);
