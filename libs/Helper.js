const jwt = require("jsonwebtoken");

class Helper {
  static getUserIdWithToken(authToken) {
    const token = authToken;
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    return userId;
  }
}
module.exports = Helper;
