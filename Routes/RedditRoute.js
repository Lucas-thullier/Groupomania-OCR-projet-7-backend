const express = require("express");
const router = express.Router();
const auth = require("@middlewares/auth");

const RedditController = require("@controllers/RedditController");

router.get("/hot-submissions", RedditController.getHotSubmissions);
router.get("/getCommentsById", RedditController.getCommentsById);
router.get("/getPopularSubreddits", RedditController.getPopularSubreddits);
router.get("/getSubreddit", RedditController.getSubreddit);

module.exports = router;
