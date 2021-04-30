const express = require("express");
const router = express.Router();
const auth = require("@middlewares/auth");
const FeedPostController = require("@controllers/FeedPostController");

router.get("/user", auth, FeedPostController.getFeedPost);
router.post("/create", FeedPostController.createFeedPost);

module.exports = router;
