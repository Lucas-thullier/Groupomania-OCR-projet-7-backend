const express = require("express");
const router = express.Router();
const ConversationController = require("../Controllers/ConversationController");

router.get("/getAllConvByUserId", ConversationController.getAllConvByUserId);
// router.get("/byUserAndFriend", ConversationController.getConversationByUserAndFriendId);
module.exports = router;
