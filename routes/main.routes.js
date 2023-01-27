const  express =  require("express");
const router = express.Router();
const MainPageController = require("../controllers/MainPageController")

router.get("/", MainPageController.openMainPage);
router.post("/", MainPageController.selectMainPageOption);

router.get("/search/:phrase", MainPageController.searchForItem);

module.exports = router;
