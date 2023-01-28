const  express =  require("express");
const router = express.Router();
const upload = require("../../model/LocalStorage")

const UserController = require("../../controllers/admin/UserController")

router.get("/", UserController.renderPage);
router.get("/add", UserController.renderAddingForm);
router.get("/search/:phrase", UserController.renderSearchedPage);

router.post("/add", UserController.addUser);
router.put("/update", UserController.updateUser);
router.delete("/delete", UserController.deleteUser);

module.exports = router;
