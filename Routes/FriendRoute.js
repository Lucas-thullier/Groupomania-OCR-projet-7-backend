const express = require("express");
const router = express.Router();
const auth = require("@middlewares/auth");
const FriendController = require("@controllers/FriendController");

router.post("/add", FriendController.add);
router.delete("/delete", auth, FriendController.delete);

module.exports = router;
