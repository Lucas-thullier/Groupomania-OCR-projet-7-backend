const express = require("express");
const router = express.Router();
const auth = require("@middlewares/auth");
const MessageController = require("@controllers/MessageController");

router.post("/newMessage", auth, MessageController.postMessage);

module.exports = router;
