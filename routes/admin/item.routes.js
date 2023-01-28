const  express =  require("express");
const router = express.Router();
const upload = require("../../model/LocalStorage")

const ItemController = require("../../controllers/admin/ItemController")

router.get("/", ItemController.renderPage);
router.get("/add", ItemController.renderAddingForm);
router.get("/search/:phrase", ItemController.renderSearchedPage);

router.post("/add", ItemController.addItem);
router.put("/update", ItemController.updateItem);
router.delete("/delete", ItemController.deleteItem);

module.exports = router;
