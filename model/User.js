const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password : String,
    name: String,
    surname: String,
    cart: [Number]
  });

module.exports = User = mongoose.model("user", userSchema);