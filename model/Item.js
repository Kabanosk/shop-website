const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    desc: String,
    price: Number
  });

module.exports = Item = mongoose.model("item", itemSchema);