const ItemService = require("../services/ItemService");
const UserService = require("../services/UserService");
const path = require("path");
const fs = require('fs');
const HttpError = require("../errors/GenericErrors").HttpError;

module.exports = class ItemController{
    static async saveItemToCart(req, res, next){
        try {
            if(!req.session.cart) {
                req.session.cart = [req.params.item_id];
            } else {
                req.session.cart.push(req.params.item_id);
            }
            req.session.save();
            if(req.session.user) {
                await UserService.updateUser(req.session.user._id, {cart : req.session.cart});
            }
            
            res.redirect('back');
            //res.status(204).send(); // Return a 204 (No Content response)
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }
    static async getAllItems(req, res, next){
        try {
            const items = await ItemService.getAllItems();
            if(!items){
               throw Error("Error 404: could not find any items.") // TODO Może komunikat a nie error od razu?
            }
            res.render("add", {
                items: items
            });
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async getItemById(req, res, next){
        try {
            const item = await ItemService.getItembyId(req.params.item_id);
            if(!item){
               res.status(404).json("No items in the database.") // TODO komunikat? czy tak jak jest obecnie
            }
            res.render("item", {
                item: item
            });

        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async addItem(req, res, next){
        try {
            await ItemService.addItem(
                req.body.name,
                req.body.desc,
                {
                    data: fs.readFileSync(path.resolve(__dirname, '..') + '\\uploads\\' + req.file.filename),
                    contentType: 'image/png'
                },
                req.body.price
            );
            res.redirect('/items/add');
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }
}