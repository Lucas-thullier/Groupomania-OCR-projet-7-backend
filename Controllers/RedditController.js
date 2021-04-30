const { Reddit } = require("@models/index");

exports.getHotSubmissions = (req, res, next) => {
  Reddit.getHotSubmissions()
    .then((hotSubmissions) => {
      res.send(hotSubmissions);
      logger.info("fetching hot submissions success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during fetching hot submissions data");
    });
};

exports.getCommentsById = (req, res, next) => {
  const submissionId = req.query.submissionId;

  Reddit.getCommentsById(submissionId)
    .then((comments) => {
      res.send(comments);
      logger.info("fetching comments by submission id success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during fetching comments by submission id");
    });
};

exports.getPopularSubreddits = (req, res, next) => {
  Reddit.getPopularSubreddits()
    .then((popularSubreddits) => {
      res.send(popularSubreddits);
      logger.info("fetching popular subreddit success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during fetching popular subreddits");
    });
};

exports.getSubreddit = (req, res, next) => {
  const subredditId = req.query.subredditId;

  Reddit.getSubreddit(subredditId)
    .then((subreddit) => {
      res.send(subreddit);
      logger.info("fetching subreddit success");
    })
    .catch((error) => {
      logger.info(error);
      logger.info("error during fetching subreddit");
    });
};

exports.authorize_callback = (req, res, next) => {
  console.log(req.headers, res.headers);
  console.log("============================================================");
  console.log(req._parsedUrl, res._parsedUrl);
};
