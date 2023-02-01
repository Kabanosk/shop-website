const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
      type: String,
      unique: true,
      required: true,
    },
    hashedPassword : {
      type: String,
      required: true,
    },
    salt : String,
    name: String,
    surname: String,
    cart: [String],
    isAdmin: Boolean
  });

module.exports = User = mongoose.model("user", userSchema);