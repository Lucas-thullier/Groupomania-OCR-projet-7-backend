const Friend = require("../Models/Friend");
const Helper = require("@lib/Helper");
const { Op } = require("sequelize");

exports.getAllFriends = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  Friend.getFriendsOf(userId).then((allFriends) => {
    return res.send(allFriends);
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
