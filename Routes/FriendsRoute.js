const express = require("express");
const router = express.Router();
const auth = require("@middlewares/auth");
const FriendController = require("@controllers/FriendController");

router.get("/add", FriendController.addFriend);
router.get("/all", FriendController.getFriendsByUserId);
router.delete("/deleteFriend", auth, FriendController.deleteFriend);

module.exports = router;
