const OrderService = require("../../services/OrderService");

module.exports = class AdminOrderController {
    static async renderPage(req, res, next){
        try {
            const orders = await OrderService.getAllOrders();
            if(!orders){
                throw Error("Error 404: could not find any orders.")
            }
            res.render("admin/orders", {
                orders: orders
            });
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async renderAddingForm(req, res, next){
        try {
            const order = await OrderService.getOrderById(res, req, next);
            if(!order){
                res.render("admin/order", {
                    action: "add"
                });
            } else {
                res.render("admin/order", {
                    order: order,
                    action: "update"
                });
            }
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async addOrder(req, res, next){
        try {
            await OrderService.addOrder( //TODO: Jak dodać liste produktów
                [],
                req.body.date,
                req.body.price,
                req.body.user_email,
            );

            res.render("admin/order", {action: "add", msg: "Image added successfully"});
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async updateOrder(req, res, next) {
        try {
            const order = OrderService.getOrderById(req, res, next);
            if (!order) {
                throw Error("404! Order not found");
            }

            const updated_order = {
                id: order.id,
                products: order.products,
                date: req.body.date,
                user_email: req.body.user_email,
                price: req.body.price
            };

            await OrderService.updateOrder(order.id, updated_order)
            res.render("admin/order", {order: updated_order, action: "update", msg: "Image updated successfully"});
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async deleteOrder(req, res, next) {
        try {
            const order = OrderService.getOrderById(req, res, next);

            await OrderService.deleteOrder(order.id);
            res.render("admin/orders", {orders: OrderService.getAllOrders(), msg: "Image deleted successfully"});
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
}