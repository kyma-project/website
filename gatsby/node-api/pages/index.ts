import { CreatePagesArgs } from "gatsby";
import { createIntlPage, addToContextSlidesBanner } from "./utils";

import { createLandingPages } from "./landingPage";
import { createPageNotFound } from "./404";
import { createBlogPages } from "./blog";
import { createDocsPages } from "./docs";
import { createCommunityPages } from "./community";
import { createRoadmapPages } from "./roadmap";

const createPages = async ({
  graphql,
  actions: { createRedirect, ...otherActions },
}: CreatePagesArgs) => {
  let createPage = createIntlPage(otherActions.createPage, createRedirect);
  createPage = addToContextSlidesBanner(createPage);

  await createLandingPages({ graphql, createPage, createRedirect });
  await createPageNotFound({ createPage, createRedirect });
  await createBlogPages({ graphql, createPage, createRedirect });
  await createDocsPages({ graphql, createPage });
  await createCommunityPages({ graphql, createPage });
  await createRoadmapPages({ graphql, createPage, createRedirect });
};

export { createPages };
