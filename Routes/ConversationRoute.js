const express = require("express");
const router = express.Router();
const ConversationController = require("../Controllers/ConversationController");

router.get("/", ConversationController.getConversation);

module.exports = router;
