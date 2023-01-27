const  express =  require("express");
const router = express.Router();
const upload = require("../model/LocalStorage")

const ItemController = require("../controllers/ItemController")

router.get("/add", ItemController.getAllItems);
router.post("/add", upload.single('image'), ItemController.addItem);

module.exports = router;
