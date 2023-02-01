const { read } = require("fs");
const { AuthenticationError } = require("../errors/GenericErrors");
const UserService = require("../services/UserService");
const ItemService = require('../services/ItemService')
const OrderService = require("../services/OrderService");
const HttpError = require("../errors/GenericErrors").HttpError;

module.exports = class UserController{
    static async openProfile(req, res, next){
        try{
            let user = req.session.user;
            if (!user) {
                res.redirect("/users/login");
            }
            else {
                let userOrders = await OrderService.getOrdersByEmail(user.email);
                let ordersCart = await Promise.all(userOrders.map(async (order) => await Promise.all(order.products.map(async (x) => await ItemService.getItembyId(x)))));

                res.render("profile", {
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    orders: userOrders,
                    carts: ordersCart
                });
            }
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async openLogin(req, res, next){
        try{
            res.render("login");
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }
    static async logoutProfile(req, res, next){
        req.session.user = undefined;
        req.session.cart = undefined;
        req.session.save();
        res.redirect("/");
    }
    static async tryLogin(req, res, next){
        try{
            if (req.body["register"]) {
                res.redirect("/users/register");
            }
            else{
                let email = req.body.email,
                    password = req.body.password;

                const user = await UserService.tryLogin(email, password);

                req.session.user = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    isAdmin: user.isAdmin
                };
                if(!req.session.cart) {
                    req.session.cart = user.cart;
                } else {
                    await UserService.updateUser(user._id, {cart : req.session.cart});
                }
                if(user.isAdmin)
                {
                    res.redirect("/admin");
                } else 
                {
                    res.redirect("/");
                }
                
            }
        } catch (error) {
            if(error instanceof AuthenticationError){
                res.render('login.ejs', {error: error});
            }
            else if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async openRegister(req, res, next){
        res.render("register");
    }

    static async tryRegister(req, res, next){
        try{
            let email = req.body.email,
                password = req.body.password,
                name = req.body.name,
                surname = req.body.surname;

            let newUser = await UserService.tryRegister(email, password, name, surname);
            if(!newUser) {
                res.redirect("/users/login");
                return;
            }
            req.session.user = {
                _id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                surname: newUser.surname,
                isAdmin: false
            };
            if(!req.session.cart) {
                req.session.cart = [];
            } else {
                await UserService.updateUser(newUser._id, {cart : req.session.cart});
            }
            res.redirect("/");
        } catch (error) {
            if(error instanceof AuthenticationError){
                res.render('register.ejs', {error: error});
            }
            else if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }
}