const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/searchUser", userController.searchUser);

module.exports = router;
