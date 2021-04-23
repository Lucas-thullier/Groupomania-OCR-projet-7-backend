const express = require("express");
const router = express.Router();
const auth = require("@middlewares/auth");
const multer = require("@middlewares/multer-config");
const userController = require("@controllers/UserController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/search", auth, userController.searchUser);
router.get("/:id", auth, userController.getById);
// router.get("/searchFriendUsers", auth, userController.searchFriendUsers);
// router.get("/getFriendsByUserId", auth, userController.getFriendsByUserId);

// router.post("/addFriend", auth, userController.addFriend);
// router.post("/changeProfilPicture", auth, multer, userController.changeProfilPicture);

module.exports = router;
