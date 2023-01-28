const ItemService = require("../services/ItemService");
const path = require("path");
const fs = require('fs');

module.exports = class ItemController{

    static async cartAddItem(req, res, next){
        try {
            
            // TODO ADD TO CART
            
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
    static async getAllItems(req, res, next){
        try {
            const items = await ItemService.getAllItems();
            if(!items){
               throw Error("Error 404: could not find any items.")
            }
            res.render("add", {
                items: items
            });
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async getItemById(req, res, next){
        try {

            const item = await ItemService.getItembyId(req.params.item_id);
            if(!item){
               res.status(404).json("No items in the database.")
            }
            res.render("item", {
                item: item
            });

        } catch (error) {
            res.status(500).json({error: error})
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
            res.status(500).json({error: error});
        }
    }
}