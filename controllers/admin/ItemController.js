const ItemService = require("../../services/ItemService");
const path = require("path");
const fs = require('fs');
const HttpError = require("../../errors/GenericErrors").HttpError;

module.exports = class AdminItemController {
    static async renderPage(req, res, next){
        try {
            const items = await ItemService.getAllItems();
            if(!items){
                throw Error("Error 404: could not find any items.")
            }
            res.render("admin/items", {
                items: items
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
            let filteredItems = await ItemService.getItemsByPhrase(phrase);
            res.render("admin/items", { items: filteredItems});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    static async handleSearchPost(req, res, next) {
        try{
            console.log("eeee");
            let searchPhrase = req.body.searchbar;
            res.redirect("/admin/items/search/" + searchPhrase);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    static async renderAddingForm(req, res, next){
        try {
            if(!req.params.item_id)
            {
                res.render("admin/newitem", {
                    item: undefined,
                    action: "add"
                });
            } else 
            {
                const itemToEdit = await ItemService.getItembyId(req.params.item_id);
                res.render("admin/item", {
                            item: itemToEdit,
                            action: "update"
                        });
            }
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
                    data: fs.readFileSync(path.resolve(__dirname, '../../') + '\\uploads\\' + req.file.filename),
                    contentType: 'image/png'
                },
                req.body.price
            );
            res.redirect("../"); // TODO ustalić co robimy pod dodaniu (idziemy do tyłu o jeden itp itd)
            //res.render("admin/item", {item: undefined, action: "add", msg: "Image added successfully"});
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async updateItem(req, res, next) {
        try {
            const item = ItemService.getItembyId(req.body.id);
            if (!item) {
                throw Error("404! Item not found");
            }
            const updated_item = {
                id: req.body.id,
                name: req.body.name,
                desc: req.body.desc,
                price: req.body.price,
                img: {
                    data: fs.readFileSync(path.resolve(__dirname, '../../') + '\\uploads\\' + req.file.filename),
                    contentType: 'image/png'
                },
            };
            await ItemService.updateItem(req.body.id, updated_item)
            res.redirect("../items");
            //res.render("admin/item", {item: updated_item, action: "update", msg: "Image updated successfully"});
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async deleteItem(req, res, next) {
        try {
            await ItemService.deleteItem(req.body.id);
            res.redirect("../items");
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }
}