const Reddit = require("../models/Reddit");

exports.getHotSubmissions = (req, res, next) => {
  Reddit.getHotSubmissions()
    .then((hotSubmissions) => {
      res.send(hotSubmissions);
      logger.info(`fetching hot submissions OK`);
    })
    .catch((error) => {
      logger.error("error during fetching hot submissions");
      logger.error(error);
    });
};

exports.getCommentsById = (req, res, next) => {
  const submissionId = req.query.submissionId;
  Reddit.getCommentsById(submissionId)
    .then((comments) => {
      res.send(comments);
      logger.info("fetching comments ok");
    })
    .catch((error) => {
      logger.error("error during fetching comments");
      logger.error(error);
    });
};

exports.getPopularSubreddits = (req, res, next) => {
  Reddit.getPopularSubreddits()
    .then((popularSubreddits) => {
      res.send(popularSubreddits);
      logger.info("fetching popular subreddits OK");
    })
    .catch((error) => {
      logger.error("error during fetching popular subreddits");
      logger.error(error);
    });
};

exports.getSubreddit = (req, res, next) => {
  const subredditId = req.query.subredditId;

  Reddit.getSubreddit(subredditId)
    .then((subredditContent) => {
      res.send(subredditContent);
      logger.info("fetching subreddit OK");
    })
    .catch((error) => {
      logger.error("error during fetching subreddit");
      logger.error(error);
    });
};
