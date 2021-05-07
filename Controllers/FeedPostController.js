const { FeedPost } = require("@models/index");
const { getUserIdWithToken } = require("@libs/Helper");

exports.getFeedPost = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);
  const offset = req.query.offset == 0 ? null : parseInt(req.query.offset);

  FeedPost.getByUserId(userId, offset)
    .then((feedPost) => {
      res.send(feedPost);
      logger.info("Fetching feedpost by userId success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during fetching by userId");
    });
};

exports.createFeedPost = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);
  const textContent = req.body.textContent;
  const imageUrl = req.body.imageUrl ?? null;

  FeedPost.new(userId, textContent, imageUrl)
    .then(() => {
      res.send(true);
      logger.info("feedpost creation success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during feedpost creation");
    });
};

exports.deleteFeedPost = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);

  FeedPost.delete(feedPostId)
    .then(() => {
      res.send("suppression reussie");
      logger.info("feedpost deletion success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during feedpost deletion");
    });
};
