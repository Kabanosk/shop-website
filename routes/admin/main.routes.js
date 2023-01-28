const  express =  require("express");
const router = express.Router();
const upload = require("../../model/LocalStorage")

const MainController = require("../../controllers/admin/MainPageController")

router.get("/", MainController.renderPage);
router.post("/", MainController.redirectPage);

module.exports = router;