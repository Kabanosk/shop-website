const path = require("path");
const fs = require('fs');

module.exports = class CartController{
    static async checkCart(req, res, next){
        try{
            let user = req.session.user;
            if (!user) {
                res.redirect("/users/login");
                return ;
            }
            res.render("cart", {items: user.cart});
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