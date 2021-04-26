const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const MessageController = require("../controllers/MessageController");

router.post("/newMessage", auth, MessageController.postMessage);
router.get("/getMessagesByConvId", auth, MessageController.getMessagesByConvId);

module.exports = router;
