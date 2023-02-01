const  express =  require("express");
const router = express.Router();

const OrderController = require("../../controllers/admin/OrderController")

router.get("/", OrderController.renderPage);
router.get("/update/:order_id", OrderController.renderAddingForm);

router.post("/update", OrderController.updateOrder);
router.post("/delete", OrderController.deleteOrder);

module.exports = router;
