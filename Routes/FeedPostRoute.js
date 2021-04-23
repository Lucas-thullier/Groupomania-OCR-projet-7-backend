const express = require("express");
const router = express.Router();
const auth = require("@middlewares/auth");
const FeedPostController = require("@controllers/FeedPostController");

router.get("/getFeedPost", auth, FeedPostController.getFeedPost);
router.post("/createFeedPost", FeedPostController.createFeedPost);

module.exports = router;
