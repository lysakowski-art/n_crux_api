const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      unique: false,
      required: false,
    },
    email_adress: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    user_type: {
      type: String,
      unique: false,
      required: true,
    },
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
