const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const FriendController = require("../Controllers/FriendController");

router.get("/getAllFriends", auth, FriendController.getAllFriends);

module.exports = router;
