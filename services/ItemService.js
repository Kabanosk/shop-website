const Item = require("../model/Item");
const fs = require('fs');

module.exports = class ItemService{
    static async getAllItems(){
        try {
            const items = await Item.find();
            return items;
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }

    static async addItem(name, description, image, price){
        try {
            var obj = {
                name: name,
                desc: description,
                img: image,
                price: price
            }
            console.log("Creating");
            Item.create(obj, (err, item) => {
                if (err) {
                    throw err;
                }
                else {
                    item.save();
                }
            });
            console.log("Created");
        } catch (error) {
            console.log(`Could not add item ${error}`)
            throw error
        }
    }

    static async getItembyId(itemId){
        try {
            const singleItemResponse =  await Item.findById({_id: itemId});
            return singleItemResponse;
        } catch (error) {
            console.log(`Item not found. ${error}`)
            throw error
        }
    }

    static async getItemsByPhrase(phrase){
        try {
            const items = await Item.find({name : phrase});
            return items;
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }

    //Later on will add update and delete options
}