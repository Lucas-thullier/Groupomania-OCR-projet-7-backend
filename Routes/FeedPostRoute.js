const express = require("express");
const router = express.Router();
const FeedPostController = require("../Controllers/FeedPostController");

router.get("/test", FeedPostController.allFeed);

module.exports = router;
