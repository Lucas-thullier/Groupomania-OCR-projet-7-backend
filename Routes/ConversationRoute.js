const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const ConversationController = require("../Controllers/ConversationController");

router.get("/getAllConvByUserId", auth, ConversationController.getAllConvByUserId);
router.post("/createConversation", auth, ConversationController.createConversation);
router.post(
  "/changeConversationPicture",
  auth,
  multer,
  ConversationController.changeConversationPicture
);

// router.get("/byUserAndFriend", ConversationController.getConversationByUserAndFriendId);
module.exports = router;
