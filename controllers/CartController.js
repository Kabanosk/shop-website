const ItemService = require("../services/ItemService");
const UserService = require("../services/UserService");
const OrderService = require("../services/OrderService")
const path = require("path");
const fs = require('fs');
const HttpError = require("../errors/GenericErrors").HttpError;
module.exports = class CartController{
    static async checkCart(req, res, next){
        try{
            let cart = req.session.cart;
            if (!cart) {
                cart = [];
            }
            let cartItems = await Promise.all(cart.map(async (x) => await ItemService.getItembyId(x)));
            res.render("cart", {items: cartItems});
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async addOrderToDB(req, res, next) {
        try{
            let cart = req.session.cart;
            let cartItems = await Promise.all(cart.map(async (x) => await ItemService.getItembyId(x)));
            let finalPrice = 0;
            for(var i = 0; i < cartItems.length; i++) {
                finalPrice += cartItems[i].price;
            }
            await OrderService.addOrder(
                req.session.cart,
                new Date(),
                finalPrice,
                req.session.user.email
            );
            res.end();
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async goToCheckout(req, res, next){
        try{
            if (!req.session.cart || !req.session.user || req.session.cart.length == 0) {
                throw Error("Cart is empty or user not logged"); // TODO add message in frontend
            }
            let cartItems = await Promise.all(req.session.cart.map(async (x) => await ItemService.getItembyId(x)));
            res.render("checkout", {items: cartItems});
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async deleteFromCart(req, res, next){
        try{
            let index = req.session.cart.indexOf(req.body.item_id);
            req.session.cart.splice(index,1);
            req.session.save();

            if(req.session.user) {
                await UserService.updateUser(req.session.user._id, {cart : req.session.cart});
            }

            res.end();
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }
}