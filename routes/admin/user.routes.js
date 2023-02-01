const  express =  require("express");
const router = express.Router();
const upload = require("../../model/LocalStorage")

const UserController = require("../../controllers/admin/UserController")

router.get("/", UserController.renderPage);
router.get("/update/:user_id", UserController.renderAddingForm)
router.get("/search/:phrase", UserController.renderSearchedPage);


router.post("/search/", UserController.handleSearchPost);
router.post("/update", UserController.updateUser);
router.post("/delete", UserController.deleteUser);

module.exports = router;
