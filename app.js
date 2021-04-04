require("dotenv").config();
const express = require("express");
const fs = require("fs");
const auth = require("./middleware/auth");
const path = require("path");

const app = express();

const UserRoute = require("./Routes/UserRoute");
const FeedPostRoute = require("./Routes/FeedPostRoute");
const ConversationRoute = require("./Routes/ConversationRoute");
const FriendsRoute = require("./Routes/FriendsRoute");
const MessageRoute = require("./Routes/MessageRoute");
const AuthCheckRoute = require("./Routes/AuthCheckRoute");
const RedditRoute = require("./Routes/RedditRoute");

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
app.use("/friends", FriendsRoute);
app.use("/feedpost", FeedPostRoute);
app.use("/messages", MessageRoute);
app.use("/checkIfLogged", AuthCheckRoute);
app.use("/reddit", RedditRoute);

module.exports = app;
