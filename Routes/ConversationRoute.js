const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ConversationController = require("../Controllers/ConversationController");

router.get("/getAllConvByUserId", auth, ConversationController.getAllConvByUserId);
router.post("/createConversation", ConversationController.createConversation);

// router.get("/byUserAndFriend", ConversationController.getConversationByUserAndFriendId);
module.exports = router;
