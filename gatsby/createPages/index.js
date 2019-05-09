const { createIntlPage } = require("../helpers");
const createBlogPostPages = require("./blogPostPages");
const createDocsPages = require("./docsPages");
const createRoadmapPages = require("./roadmapPages");

module.exports = async ({ graphql, actions }) => {
  const createPage = createIntlPage({ actions });
  const { createRedirect } = actions;

  await createBlogPostPages({ graphql, createPage, createRedirect });
  await createDocsPages({ graphql, createPage });
  await createRoadmapPages({ graphql, createPage, createRedirect });
};
