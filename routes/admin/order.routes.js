const  express =  require("express");
const router = express.Router();

const OrderController = require("../../controllers/admin/OrderController")

router.get("/", OrderController.renderPage);
router.get("/add", OrderController.renderAddingForm);

router.post("/add", OrderController.addOrder);
router.put("/update", OrderController.updateOrder);
router.delete("/delete", OrderController.deleteOrder);

module.exports = router;
