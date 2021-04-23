const { Op } = require("sequelize");
const snoowrap = require("snoowrap");
const RedditComment = require("@models/RedditComment");
const User = require("@models/User");
const Helper = require(`@lib/Helper`);

exports.getHotSubreddits = (req, res, next) => {
  // hot submissions not subreddits
  const redditWrapper = new snoowrap({
    userAgent: "groupomania study project",
    clientId: "EDnNl-BJsw5LQQ",
    clientSecret: "nh_b3Je-K4tUXirYbbeBoAVk1vv9QQ",
    refreshToken: "839979606045-wBu-L7yz6EXs-Sk6vuEWEw-VKVhIlQ",
  });

  redditWrapper
    .getHot()
    .then((hotSubreddits) => {
      let hotSubredditsData = [];
      for (const singleSubreddit of hotSubreddits) {
        if (singleSubreddit.over_18 == false) {
          hotSubredditsData.push({
            title: singleSubreddit.title,
            author: singleSubreddit.author.name,
            submissionId: singleSubreddit.name,
            thumbnail: singleSubreddit.thumbnail,
            commentsCount: singleSubreddit.num_comments,
            url: "https://reddit.com" + singleSubreddit.permalink,
            preview: singleSubreddit.preview,
            subredditNamePrefixed: singleSubreddit.subreddit_name_prefixed,
            textContent: singleSubreddit.selftext,
          });
        }
      }
      res.send(hotSubredditsData);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getCommentsById = (req, res, next) => {
  const submissionId = req.query.submissionId;
  const redditAndGroupoComments = {
    redditComments: null,
    groupoComments: null,
  };
  const redditWrapper = new snoowrap({
    userAgent: "groupomania study project",
    clientId: "EDnNl-BJsw5LQQ",
    clientSecret: "nh_b3Je-K4tUXirYbbeBoAVk1vv9QQ",
    refreshToken: "839979606045-wBu-L7yz6EXs-Sk6vuEWEw-VKVhIlQ",
  });
  redditWrapper
    .getSubmission(submissionId)
    .expandReplies({ limit: 1, depth: 0 })
    .then((singleSubmission) => {
      let redditComments = [];
      for (const singleComment of singleSubmission.comments) {
        redditComments.push({
          User: {
            username: singleComment.author.name,
            imageUrl: null,
          },
          text_content: singleComment.body,
        });
      }
      redditAndGroupoComments.redditComments = redditComments;

      RedditComment.findAll({
        where: {
          submission_id: submissionId,
        },
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      })
        .then((redditComments) => {
          redditAndGroupoComments.groupoComments = redditComments;
          res.send(redditAndGroupoComments);
        })
        .catch((error) => {
          console.log(error);
        });
    });
};

exports.getPopularSubreddits = (req, res, next) => {
  const redditWrapper = new snoowrap({
    userAgent: "groupomania study project",
    clientId: "EDnNl-BJsw5LQQ",
    clientSecret: "nh_b3Je-K4tUXirYbbeBoAVk1vv9QQ",
    refreshToken: "839979606045-wBu-L7yz6EXs-Sk6vuEWEw-VKVhIlQ",
  });
  redditWrapper
    .getPopularSubreddits()
    .then((popularSubreddits) => {
      const dataToSend = [];
      popularSubreddits.forEach((singleSubreddit) => {
        if (singleSubreddit.over18 == false) {
          dataToSend.push({
            displayName: singleSubreddit.display_name,
            displayNamePrefixed: singleSubreddit.display_name_prefixed,
          });
        }
      });
      res.send(dataToSend);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getSubreddit = (req, res, next) => {
  const redditWrapper = new snoowrap({
    userAgent: "groupomania study project",
    clientId: "EDnNl-BJsw5LQQ",
    clientSecret: "nh_b3Je-K4tUXirYbbeBoAVk1vv9QQ",
    refreshToken: "839979606045-wBu-L7yz6EXs-Sk6vuEWEw-VKVhIlQ",
  });
  redditWrapper
    .getTop(req.query.subredditId)
    .then((subredditContent) => {
      const subredditData = [];
      subredditContent.forEach((singleSubmission) => {
        subredditData.push({
          title: singleSubmission.title,
          author: singleSubmission.author.name,
          submissionId: singleSubmission.name,
          thumbnail: singleSubmission.thumbnail,
          commentsCount: singleSubmission.num_comments,
          url: "https://reddit.com" + singleSubmission.permalink,
          preview: singleSubmission.preview,
          subredditNamePrefixed: singleSubmission.subreddit_name_prefixed,
          textContent: singleSubmission.selftext,
        });
      });
      res.send(subredditData);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.createRedditComment = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  const submissionId = req.body.submissionId;
  const textContent = req.body.textContent;

  RedditComment.create({
    submission_id: submissionId,
    user_id: userId,
    text_content: textContent,
  })
    .then((success) => {
      res.send(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.authorize_callback = (req, res, next) => {
  console.log(req.headers, res.headers);
  console.log("============================================================");
  console.log(req._parsedUrl, res._parsedUrl);
  res.send("ss");
};
