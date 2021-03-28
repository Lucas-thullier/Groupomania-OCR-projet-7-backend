const Friend = require("../Models/Friend");
const Helper = require("../libs/Helper");

exports.getAllFriends = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  Friend.getFriendsOf(userId).then((allFriends) => {
    return res.send(allFriends);
  });
};
