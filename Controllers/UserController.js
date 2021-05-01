const { User } = require("@models/index");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const validator = require("validator");
const { getUserIdWithToken } = require("@libs/Helper");

exports.signup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (!validator.isStrongPassword(password)) {
    return res.status(401).send("test!");
  }

  if (!validator.isEmail(email)) {
    return res.status(401).send("test");
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.new(username, email, hash)
        .then(() => {
          logger.info("User created !");
          return res.status(201).json({ message: "Utilisateur créé !" });
        })
        .catch((error) => {
          logger.error("User creation failed !");
          return res.status(401).json({ error });
        });
    })
    .catch((error) => {
      logger.error("password encryption failed");
      return res.status(401).json({ error });
    });
};

exports.login = (req, res, next) => {
  const userEmail = req.body.email;
  const passwordFromRequest = req.body.password;

  User.findByMail(userEmail)
    .then((user) => {
      if (!user) {
        return res.statut(401).json({ error: "Utilisateur non trouvé !" });
      }

      bcrypt
        .compare(passwordFromRequest, user.password)
        .then((valid) => {
          if (!valid) {
            return res.statut(401).json({ error: "Mot de passe incorrect !" });
          }

          logger.info("Connexion success");
          return res.status(200).json({
            userId: user.id,
            token: jsonWebToken.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => {
          logger.error("Comparing password failed");
          return res.status(401).json({ error });
        });
    })
    .catch((error) => {
      logger.error("Getting user from database failed");
      return res.status(401).json({ error });
    });
};

exports.searchUser = (req, res, next) => {
  const searchContent = req.query.searchContent;

  User.searchByUsername(searchContent)
    .then((userLikeSearch) => {
      logger.info("Sending Users fetched");
      return res.send(userLikeSearch);
    })
    .catch((error) => {
      logger.error(error);
      return logger.error("Error during search by user");
    });
};

exports.userById = (req, res, next) => {
  const userId = req.params.id;

  User.getById(userId)
    .then((singleUser) => {
      res.send(singleUser);
      logger.info("Fetching by Id success");
    })
    .catch((error) => {
      logger.error("Fetching by Id error");
    });
};

exports.getFriendsByUserId = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);

  User.getFriends(userId)
    .then((friends) => {
      res.send(friends);
      logger.info("Fetching friends success");
    })
    .catch((error) => {
      console.log(error);
      logger.error("Fetching friends error");
    });
};

exports.changeProfilPicture = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

  User.updateProfilPicture(userId, imageUrl)
    .then(() => {
      res.send("update effectue");
      logger.info("picture profil update success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during profilPicture update");
    });
};
