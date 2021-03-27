const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const MessageController = require("../Controllers/MessageController");

router.post("/newMessage", auth, MessageController.postMessage);
router.get("/getMessagesByConvId", auth, MessageController.getMessagesByConvId);

module.exports = router;
