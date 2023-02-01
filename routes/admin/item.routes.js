const express =  require("express");
const router = express.Router();
const upload = require("../../model/LocalStorage")

const ItemController = require("../../controllers/admin/ItemController")

router.get("/", ItemController.renderPage);
router.get("/add", ItemController.renderAddingForm);
router.get("/update/:item_id", ItemController.renderAddingForm);
router.get("/search/:phrase", ItemController.renderSearchedPage);


router.post("/search/", ItemController.handleSearchPost);
router.post("/add", upload.single('image'), ItemController.addItem);
router.post("/update", upload.single('image'), ItemController.updateItem);
router.post("/delete", ItemController.deleteItem);

module.exports = router;
