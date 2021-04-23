const redditConnexion = require("@lib/RedditConnexion");

class Reddit {
  static async getHotSubmissions() {
    const hotSubmissions = await redditConnexion.getHot();

    const hotSubmissionsData = [];
    for (const singleSubmission of hotSubmissions) {
      if (singleSubmission.over_18 == false) {
        hotSubmissionsData.push({
          title: singleSubmission.title,
          author: singleSubmission.author.name,
          submissionId: singleSubmission.name,
          thumbnail: singleSubmission.thumbnail,
          commentsCount: singleSubmission.num_comments,
          url: "https://reddit.com" + singleSubmission.permalink,
          preview: singleSubmission.preview,
          submissionNamePrefixed: singleSubmission.submission_name_prefixed,
          textContent: singleSubmission.selftext,
        });
      }
    }

    return hotSubmissionsData;
  }

  static async getCommentsById(id) {
    await redditConnexion.getSubmission(submissionId).expandReplies({ limit: 1, depth: 0 });

    const redditComments = [];
    for (const singleComment of singleSubmission.comments) {
      redditComments.push({
        User: {
          username: singleComment.author.name,
          imageUrl: null,
        },
        text_content: singleComment.body,
      });
    }
    return redditComments;
  }

  static async getPopularSubreddits() {
    const popularSubreddits = await redditConnexion.getPopularSubreddits();

    const dataToSend = [];
    popularSubreddits.forEach((singleSubreddit) => {
      if (singleSubreddit.over18 == false) {
        dataToSend.push({
          displayName: singleSubreddit.display_name,
          displayNamePrefixed: singleSubreddit.display_name_prefixed,
        });
      }
    });

    return dataToSend;
  }

  static async getSubreddit(subredditId) {
    const subredditContent = await redditConnexion.getTop(subredditId);

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

    return subredditData;
  }
}
module.exports = Reddit;
