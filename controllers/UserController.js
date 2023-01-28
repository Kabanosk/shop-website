const UserService = require("../services/UserService");
const HttpError = require("../errors/GenericErrors").HttpError;

module.exports = class UserController{
    static async openProfile(req, res, next){
        try{
            let user = req.session.user;
            if (!user) {
                res.redirect("/users/login");
            }
            else{
                res.render("profile", {
                    email: user.email,
                    name: user.name,
                    surname: user.surname
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
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    cart: []
                };
                res.redirect("/");
            }
        } catch (error) {
            if(error instanceof HttpError)
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

            if(!(await UserService.tryRegister(email, password, name, surname))) {
                res.redirect("/users/login");
                return;
            }
            req.session.user = {
                email: email,
                name: name,
                surname: surname,
                cart: []
            };
            res.redirect("/");
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }
}