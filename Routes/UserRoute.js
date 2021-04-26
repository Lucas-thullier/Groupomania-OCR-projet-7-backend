const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const userController = require("../controllers/UserController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/searchUser", auth, userController.searchUser);
router.get("/userById", auth, userController.userById);
router.get("/searchFriendUsers", auth, userController.searchFriendUsers);
router.get("/getFriendsByUserId", auth, userController.getFriendsByUserId);

router.post("/addFriend", auth, userController.addFriend);
router.post("/changeProfilPicture", auth, multer, userController.changeProfilPicture);

module.exports = router;
