const  express =  require("express");
const router = express.Router();
const MainPageController = require("../controllers/MainPageController")

router.get("/", MainPageController.openMainPage);
router.get("/search/:phrase", MainPageController.searchForItem);

router.post("/", MainPageController.selectMainPageOption);

module.exports = router;
