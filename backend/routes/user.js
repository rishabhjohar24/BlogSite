const router = require("express").Router();

const userController = require("../controller/user");

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.get("/:id", userController.userInfo);
router.get("/", userController.users);

module.exports = router;
