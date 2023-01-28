const  express =  require("express");
const router = express.Router();
const upload = require("../model/LocalStorage")

const ItemController = require("../controllers/ItemController")

router.get("/add", ItemController.getAllItems);
router.post("/add", upload.single('image'), ItemController.addItem);

router.post("/add_to_cart", ItemController.cartAddItem)

router.get("/:item_id", ItemController.getItemById);

module.exports = router;
