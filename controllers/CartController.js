const ItemService = require("../services/ItemService");
const path = require("path");
const fs = require('fs');

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

    static async addToCart(req, res, next){
        try{
            throw Error("Adding to cart has not been implemented");
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
}