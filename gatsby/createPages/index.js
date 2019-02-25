const { createIntlPage } = require("../helpers");
const createBlogPostPages = require("./blogPostPages");
const createDocsPages = require("./docsPages");

module.exports = async ({ graphql, actions }) => {
  const createPage = createIntlPage({ actions });
  const { createRedirect } = actions;

  await createBlogPostPages({ graphql, createPage, createRedirect });
  await createDocsPages({ graphql, createPage });
};
