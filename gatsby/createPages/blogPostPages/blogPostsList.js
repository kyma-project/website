const { resolve } = require("path");

const { BLOG_PATH_PREFIX, POSTS_PER_PAGE } = require("../../constants");

module.exports = ({ createPage, posts }) => {
  const blogPostsListTemplate = resolve(
    __dirname,
    "../../../src/templates/BlogPostsList.tsx",
  );

  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: !i ? `/${BLOG_PATH_PREFIX}` : `/${BLOG_PATH_PREFIX}/page/${i + 1}`,
      component: blogPostsListTemplate,
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
      },
    });
  });
};
