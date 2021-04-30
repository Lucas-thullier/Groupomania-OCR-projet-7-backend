const { User } = require("@models/index");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const validator = require("validator");
const { getUserIdWithToken } = require("@libs/Helper");

exports.signup = (req, res, next) => {
  if (!validator.isStrongPassword(req.body.password)) {
    throw (
      "Le mot de passe doit contenir: une lettre minuscule, une lettre majuscule, un chiffre, " +
      "un caractère spécial et doit faire plus de 8 caractères."
    );
  }

  if (!validator.isEmail(req.body.email)) {
    throw "L'adresse mail renseignée n'est pas valide.";
  }

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const username = req.body.username;
      const email = req.body.email;
      User.new(username, email, hash)
        .then(() => {
          res.status(201).json({ message: "Utilisateur créé !" });
          logger.info("User created !");
        })
        .catch((error) => {
          res.status(400).json({ error });
          logger.error("User creation failed !");
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
      logger.error("password encryption failed");
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
          res.status(200).json({
            userId: user.id,
            token: jsonWebToken.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
          logger.info("Connexion success");
        })
        .catch((error) => {
          res.status(500).json({ error });
          logger.error("Comparing password failed");
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
      logger.error("Getting user from database failed");
    });
};

exports.searchUser = (req, res, next) => {
  const searchContent = req.query.searchContent;

  User.searchByUsername(searchContent)
    .then((userLikeSearch) => {
      res.send(userLikeSearch);
      logger.info("Sending Users fetched");
    })
    .catch((error) => {
      console.log(error);
      logger.error("Error during search by user");
    });
};

exports.userById = (req, res, next) => {
  const userId = req.query.userId;

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
