const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../Controllers/UserController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/searchUser", auth, userController.searchUser);
router.get("/userById", auth, userController.userById);
router.get("/searchFriendUsers", auth, userController.searchFriendUsers);
router.post("/addFriend", auth, userController.addFriend);

module.exports = router;
