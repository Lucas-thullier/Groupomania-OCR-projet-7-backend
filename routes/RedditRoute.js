const express = require('express')
const router = express.Router()
const auth = require('@middlewares/auth')
const RedditController = require('@controllers/RedditController')

router.get('/hot-submissions', RedditController.getHotSubmissions)
router.get('/popular-subreddits', RedditController.getPopularSubreddits)
router.get('/comment/id', RedditController.getCommentsById)
router.get('/subreddit', RedditController.getSubreddit)
router.get('/authorize_callback', RedditController.authorize_callback)

module.exports = router
