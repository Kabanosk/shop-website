const  express =  require("express");
const router = express.Router();
const upload = require("../../model/LocalStorage")

const UserController = require("../../controllers/admin/UserController")

router.get("/", UserController.renderPage);
router.get("/update", UserController.renderAddingForm)
router.get("/search", UserController.renderSearchedPage);


router.post("/search", UserController.handleSearchPost);
router.post("/update", UserController.updateUser);
router.post("/delete", UserController.deleteUser);

module.exports = router;
