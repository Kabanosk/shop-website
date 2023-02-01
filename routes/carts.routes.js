const  express =  require("express");
const router = express.Router();
const CartController = require("../controllers/CartController")

router.get("/", CartController.checkCart);
router.post("/checkout", CartController.goToCheckout);
router.post("/checkout/add", CartController.addOrderToDB);
router.post("/", CartController.deleteFromCart);

module.exports = router;
