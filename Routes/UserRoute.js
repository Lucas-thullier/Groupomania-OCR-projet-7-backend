const express = require("express");
const router = express.Router();
const auth = require("@middlewares/auth");
const multer = require("@middlewares/multer-config");
const userController = require("@controllers/UserController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/search", userController.searchUser);
router.get("/:id(\\d+)", userController.userById);
router.get("/id/friends", userController.getFriendsByUserId);

router.post("/profil-picture/change", multer, userController.changeProfilPicture);

module.exports = router;
