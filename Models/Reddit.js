"use strict";
const fs = require("fs");
const snoowrap = require("snoowrap");

module.exports = () => {
  class Reddit {
    static async connexion() {
      const configFile = fs.readFileSync(`${process.cwd()}/config/reddit.json`, "utf-8");
      const config = JSON.parse(configFile);
      const redditWrapper = new snoowrap(config);

      return redditWrapper;
    }

    static async getHotSubmissions() {
      try {
        const redditWrapper = await this.connexion();
        const hotSubmissions = await redditWrapper.getHot();

        let hotSubmissionsData = [];
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
              subredditNamePrefixed: singleSubmission.subreddit_name_prefixed,
              textContent: singleSubmission.selftext,
            });
          }
        }

        return hotSubmissionsData;
      } catch (error) {
        logger.error(error);
        logger.error("error during fetching hot submissions");
      }
    }

    static async getCommentsById(submissionId) {
      try {
        const redditWrapper = await this.connexion();
        const submission = await redditWrapper.getSubmission(submissionId).expandReplies({ limit: 1, depth: 0 });

        let comments = [];
        for (const singleComment of submission.comments) {
          comments.push({
            User: {
              username: singleComment.author.name,
              imageUrl: null,
            },
            text_content: singleComment.body,
          });
        }

        return comments;
      } catch (error) {
        logger.error(error);
        logger.error("error during fetching comments by Id");
      }
    }

    static async getPopularSubreddits() {
      try {
        const redditWrapper = await this.connexion();
        const popularSubreddits = await redditWrapper.getPopularSubreddits();
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
      } catch (error) {
        logger.error(error);
        logger.error("error during fetching popular subreddits");
      }
    }

    static async getSubreddit(subredditId) {
      try {
        const redditWrapper = await this.connexion();
        const subredditContent = await redditWrapper.getTop(subredditId);

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
      } catch (error) {
        logger.error(error);
        logger.error("error during fetching subreddit");
      }
    }
  }

  return Reddit;
};
