const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const FriendController = require("../controllers/FriendController");

router.get("/getAllFriends", auth, FriendController.getAllFriends);
router.delete("/deleteFriend", auth, FriendController.deleteFriend);

module.exports = router;
