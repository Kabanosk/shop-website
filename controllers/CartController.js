const ItemService = require("../services/ItemService");
const UserService = require("../services/UserService");
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
            res.status(500).json({error: error});
        }
    }

    static async goToCheckout(req, res, next){
        try{
            throw Error("Checkout has not been implemented");
        } catch (error) {
            res.status(500).json({error: error});
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