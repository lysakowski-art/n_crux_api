const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_name: String,
    email_adress: String,
    password: String,
    user_type: String,
    resetPasswordToken: {
      type: String,
      required: false
    },
    resetPasswordExpires: {
      type: Date,
      required: false
    }
  },
  {
    timestamps: true
  },
  {
    collection: "users",
  }
);

module.exports.User = mongoose.model("User", UserSchema);
