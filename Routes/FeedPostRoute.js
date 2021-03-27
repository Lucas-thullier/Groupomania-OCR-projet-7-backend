const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const FeedPostController = require("../Controllers/FeedPostController");

router.get("/test", auth, FeedPostController.allFeed);

module.exports = router;
