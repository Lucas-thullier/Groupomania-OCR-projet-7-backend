const Friend = require("@models/Friend");
const Helper = require("@lib/Helper");
const { Op } = require("sequelize");

exports.addFriend = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  const newFriendId = req.body.newFriendId;

  if (userId === newFriendId) {
    res.send("refuse car ami = user connecte");
  } else {
    Friend.getRelation(userId, newFriendId)
      .then((relation) => {
        if (relation.length === 2) {
          res.send("Already friends (or friendship pending)");
        } else {
          Friend.addFriend(userId, newFriendId)
            .then(() => {
              logger.info(`Friendship creation between ${userId} and ${newFriendId} OK`);
            })
            .catch((error) => {
              logger.error(`Friendship creation between ${userId} and ${newFriendId} failed`);
              logger.error(error);
            });
        }
      })
      .catch((error) => {
        logger.error(`error during getting relation between ${userId} and ${newFriendId}`);
        logger.error(error);
      });
  }
};

exports.getFriendsByUserId = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  Friend.getAllByUserId(userId)
    .then((response) => {
      logger.info("Getting all friends OK");
    })
    .catch((error) => {
      logger.error("error during fetching all friends");
      logger.error(error);
    });
};

exports.deleteFriend = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);

  const friendId = req.query.friendId;
  Friend.destroy({
    where: {
      [Op.and]: {
        user_a: userId,
        user_b: friendId,
      },
    },
  })
    .then(() => {
      Friend.destroy({
        where: {
          [Op.and]: {
            user_a: friendId,
            user_b: userId,
          },
        },
      })
        .then(() => {
          res.send("suppressions OK");
        })
        .catch((error) => {
          console.log(error);
          console.log("erreur lors de la suppresion de la relation ou user_a = friendId");
        });
    })
    .catch((error) => {
      console.log(error);
      console.log("erreur lors de la suppresion de la relation ou user_a = userId");
    });
};
