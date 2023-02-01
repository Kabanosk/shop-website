const OrderService = require("../../services/OrderService");
const ItemService = require("../../services/ItemService");
const HttpError = require("../../errors/GenericErrors").HttpError;

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
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async renderSearchedPage(req, res, next) {
        try{
            let phrase = req.params.phrase;
            let filteredItems = await OrderService.getOrdersByDate(phrase);
            res.render("admin/orders", { orders: filteredItems});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }


    static async handleSearchPost(req, res, next) {
        try{
            let searchPhrase = req.body.searchbar;
            res.redirect("/admin/orders/search/" + searchPhrase);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    static async renderAddingForm(req, res, next){
        try {
            const orderToEdit = await OrderService.getOrderById(req.params.order_id);
            let cart = orderToEdit.products;
            let cartItems = await Promise.all(cart.map(async (x) => await ItemService.getItembyId(x)));
            res.render("admin/order", {
                        items: cartItems,
                        order: orderToEdit,
                        action: "update"
                    });
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }


    static async updateOrder(req, res, next) {
        try {
            const order = OrderService.getOrderById(req.body.id);
            console.log(order);
            if (!order) {
                throw Error("404! Item not found");
            }
            const updated_order = {
                id: req.body.id,
                user_email: req.body.user_email,
                date: req.body.date,
                price: req.body.price,
               
            };
            console.log(updated_order);
            await OrderService.updateOrder(req.body.id, updated_order)
            res.redirect("../orders");
            //res.render("admin/item", {item: updated_item, action: "update", msg: "Image updated successfully"});
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async deleteOrder(req, res, next) {
        try {
            await OrderService.deleteOrder(req.body.id);
            res.redirect("../orders");
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }
}