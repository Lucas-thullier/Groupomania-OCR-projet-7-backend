const express = require("express");
const router = express.Router();
const MessageController = require("../Controllers/MessageController");

router.post("/newMessage", MessageController.postMessage);
router.get("/getMessagesByConvId", MessageController.getMessagesByConvId);

module.exports = router;
