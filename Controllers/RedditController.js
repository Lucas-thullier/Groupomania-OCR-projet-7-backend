require("dotenv");
const snoowrap = require("snoowrap");
const Helper = require(`${process.cwd()}/libs/Helper`);

exports.getHotSubreddits = (req, res, next) => {
  const redditWrapper = new snoowrap({
    userAgent: "groupomania study project",
    clientId: "EDnNl-BJsw5LQQ",
    clientSecret: "nh_b3Je-K4tUXirYbbeBoAVk1vv9QQ",
    refreshToken: "839979606045-wBu-L7yz6EXs-Sk6vuEWEw-VKVhIlQ",
  });

  redditWrapper.getHot().then((hotSubreddits) => {
    let hotSubredditsData = [];
    console.log(hotSubreddits[4]);
    for (const singleSubreddit of hotSubreddits) {
      hotSubredditsData.push({
        title: singleSubreddit.title,
        author: singleSubreddit.author.name,
        submissionId: singleSubreddit.name,
        imageUrl: singleSubreddit.url.includes("imgur")
          ? `${singleSubreddit.url}.jpg`
          : singleSubreddit.url,
        thumbnail: singleSubreddit.thumbnail,
        commentsCount: singleSubreddit.num_comments,
        url: "https://reddit.com" + singleSubreddit.permalink,
      });
    }
    res.send(hotSubredditsData);
  });
};

exports.getCommentsById = (req, res, next) => {
  const submissionId = req.query.submissionId;
  const redditWrapper = new snoowrap({
    userAgent: "groupomania study project",
    clientId: "EDnNl-BJsw5LQQ",
    clientSecret: "nh_b3Je-K4tUXirYbbeBoAVk1vv9QQ",
    refreshToken: "839979606045-wBu-L7yz6EXs-Sk6vuEWEw-VKVhIlQ",
  });

  redditWrapper
    .getSubmission(submissionId)
    .expandReplies({ limit: 0, depth: 0 })
    .then((singleSubmission) => {
      let comments = [];
      // console.log(singleSubmission.comments);
      for (const singleComment of singleSubmission.comments) {
        comments.push({
          author: singleComment.author.name,
          body: singleComment.body,
        });
      }
      res.send(comments);
      // res.send("cc");
    });
};

exports.authorize_callback = (req, res, next) => {
  console.log(req.headers, res.headers);
  console.log("============================================================");
  console.log(req._parsedUrl, res._parsedUrl);
  res.send("ss");
};
