const ItemService = require("../services/ItemService");
const path = require("path");
const fs = require('fs');

module.exports = class ItemController{
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
            throw Error("Get item by id is not implemented");

            // To be determined how to retrieve id from req

            const items = await ItemService.getItemById(/* id from req here */);
            if(!items){
               res.status(404).json("No items in the database.")
            }
            res.json(items);
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
            res.redirect('/add');
         } catch (error) {
            res.status(500).json({error: error});
         }
    }
}