const Order = require("../model/Order");

module.exports = class OrderService{
    static async getAllOrders(){
        try {
            return await Order.find();
        } catch (error) {
            console.log(`Could not fetch orders ${error}`)
            throw error
        }
    }

    static async getOrderById(orderId){
        try {
            return await Order.findById({_id: orderId});
        } catch (error) {
            console.log(`Order not found. ${error}`)
            throw error
        }
    }

    static async getOrdersByDate(date){
        try {
            return await Order.find({date: date});
        } catch (error) {
            console.log(`Could not fetch orders ${error}`)
            throw error
        }
    }

    static async addOrder(products, date, price, user_email){
        try {
            let obj = {
                products: products,
                date: date,
                price: price,
                user_email: user_email,
            }
            Order.create(obj, (err, order) => {
                if (err) {
                    throw err;
                }
                else {
                    order.save();
                }
            });
        } catch (error) {
            console.log(`Could not add order ${error}`)
            throw error
        }
    }

    static async updateOrder(_id, updated_order) {
        try {
            Order.findByIdAndUpdate(_id, updated_order);
        } catch (error) {
            console.log(`Could not fetch orders ${error}`)
            throw error
        }
    }

    static async deleteOrder(_id) {
        try {
            Order.findByIdAndDelete(_id);
        } catch (error) {
            console.log(`Could not fetch orders ${error}`)
            throw error
        }
    }
}