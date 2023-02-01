const  express =  require("express");
const router = express.Router();

const UserController = require("../controllers/UserController")

router.get("/profile", UserController.openProfile);
router.post("/profile/logout", UserController.logoutProfile);

router.get("/login", UserController.openLogin);
router.post("/login", UserController.tryLogin);

router.get("/register", UserController.openRegister);
router.post("/register", UserController.tryRegister);

module.exports = router;