const express = require("express");
const router = express.Router();
const FriendController = require("../Controllers/FriendController");

router.get("/getAllFriends", FriendController.getAllFriends);

module.exports = router;
