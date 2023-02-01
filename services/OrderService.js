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

    static async getOrdersByEmail(userEmail){
        try {
            return await Order.find({user_email: userEmail});
        } catch (error) {
            console.log(`Could not fetch orders ${error}`)
            throw error
        }
    }

    static async addOrder(products, date, price, user_email, order_status){
        try {
            let obj = {
                products: products,
                date: date,
                price: price,
                user_email: user_email,
                orderStatus: order_status
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
            await Order.findByIdAndUpdate(_id, updated_order);
        } catch (error) {
            console.log(`Could not fetch orders ${error}`)
            throw error
        }
    }

    static async deleteOrder(_id) {
        try {
            await Order.findByIdAndDelete(_id);
        } catch (error) {
            console.log(`Could not fetch orders ${error}`)
            throw error
        }
    }
}