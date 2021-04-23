const express = require("express");
const router = express.Router();
const auth = require("@middlewares/auth");

const RedditController = require("@controllers/RedditController");

router.get("/getHotSubreddits", RedditController.getHotSubreddits);
router.get("/getCommentsById", RedditController.getCommentsById);
router.get("/authorize_callback", RedditController.authorize_callback);
router.get("/getPopularSubreddits", RedditController.getPopularSubreddits);
router.get("/getSubreddit", RedditController.getSubreddit);
router.post("/createRedditComment", RedditController.createRedditComment);

module.exports = router;
