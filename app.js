require("module-alias/register");
require("dotenv").config();
const express = require("express");
const path = require("path");
const winston = require("winston");

logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "log/error.log", level: "error" }),
    new winston.transports.File({ filename: "log/combined.log" }),
  ],
});

const app = express();

const UserRoute = require("./routes/UserRoute");
const FeedPostRoute = require("./routes/FeedPostRoute");
const FeedPostCommentRoute = require("./routes/FeedPostCommentRoute");
const ConversationRoute = require("./routes/ConversationRoute");
const FriendRoute = require("./routes/FriendRoute");
const MessageRoute = require("./routes/MessageRoute");
const AuthCheckRoute = require("./routes/AuthCheckRoute");
const RedditRoute = require("./routes/RedditRoute");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/user", UserRoute);
app.use("/conversation", ConversationRoute);
app.use("/friend", FriendRoute);
app.use("/feedpost", FeedPostRoute);
app.use("/feedpost/comment", FeedPostCommentRoute);
app.use("/message", MessageRoute);
app.use("/checkIfLogged", AuthCheckRoute);
app.use("/reddit", RedditRoute);

module.exports = app;
