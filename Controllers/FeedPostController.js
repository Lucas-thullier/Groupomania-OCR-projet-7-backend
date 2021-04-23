const { getUserIdWithToken } = require("@lib/Helper");
const FeedPost = require("@models/FeedPost");

exports.getFeedPost = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);

  FeedPost.getFeedPost(userId)
    .then((feedPost) => {
      res.send(feedPost);
      logger.info("fetching feedpost OK");
    })
    .catch((error) => {
      logger.error("error during fetching feedpost");
      logger.error(error);
    });
};

exports.createFeedPost = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);
  const textContent = req.body.textContent;
  const imageUrl = req.body.imageUrl;

  FeedPost.createFeedPost(userId, textContent, imageUrl)
    .then(() => {
      res.send(true);
      logger.info("feedpost creation OK");
    })
    .catch((error) => {
      logger.error("feedpost creation failed");
      logger.error(error);
    });
};

exports.deleteFeedPost = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);
  const feedPostId = 3; // TODO int magique a supprimer

  FeedPost.delete(feedPostId)
    .then(() => {
      logger.info("feedpost deletion OK");
    })
    .catch((error) => {
      logger.error("error during feedpost deletion");
      logger.error(error);
    });
};
