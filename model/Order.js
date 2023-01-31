const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [String],
    date: Date,
    price: Number,
    user_email: {
        type: String,
        required: true,
    }
});

module.exports = Order = mongoose.model("order", orderSchema);