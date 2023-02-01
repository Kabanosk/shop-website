const  express =  require("express");
const router = express.Router();

const UserController = require("../controllers/UserController")

router.get("/profile", UserController.openProfile);
router.get("/login", UserController.openLogin);
router.get("/register", UserController.openRegister);


router.post("/profile/logout", UserController.logoutProfile);
router.post("/login", UserController.tryLogin);
router.post("/register", UserController.tryRegister);

module.exports = router;