const  express =  require("express");
const router = express.Router();

const OrderController = require("../../controllers/admin/OrderController")

router.get("/", OrderController.renderPage);
router.get("/update/:order_id", OrderController.renderAddingForm);

router.get("/search/:phrase", OrderController.renderSearchedPage);

router.post("/updateStatus", OrderController.changeOrderStatus);
router.post("/search", OrderController.handleSearchPost);
router.post("/delete", OrderController.deleteOrder);

module.exports = router;
