import { CreatePagesArgs } from "gatsby";
import {
  createIntlPage,
  addToContextSlidesBanner,
  extractSlidesBanner,
  createPreviewPage,
} from "./utils";

import { createLandingPages } from "./landingPage";
import { createPageNotFound } from "./404";
import { createBlogPages } from "./blog";
import { createDocsPages } from "./docs";
import { createCommunityPages } from "./community";
import { createRoadmapPages } from "./roadmap";

import { BuildFor } from "../../../src/types/common";

const createWebsitePages = async ({
  graphql,
  actions: { createRedirect, ...otherActions },
}: CreatePagesArgs) => {
  let createPage = createIntlPage(otherActions.createPage, createRedirect);
  createPage = addToContextSlidesBanner(createPage, extractSlidesBanner());

  await createLandingPages({ graphql, createPage, createRedirect });
  await createPageNotFound({ createPage, createRedirect });
  await createBlogPages({ graphql, createPage, createRedirect });
  await createDocsPages({ graphql, createPage, buildFor: BuildFor.WEBSITE });
  await createCommunityPages({
    graphql,
    createPage,
    buildFor: BuildFor.WEBSITE,
  });
  await createRoadmapPages({ graphql, createPage, createRedirect });
};

const createWebsitePreviewPages = async ({
  graphql,
  actions: { createRedirect, ...otherActions },
}: CreatePagesArgs) => {
  let createPage = createIntlPage(otherActions.createPage, createRedirect);
  createPage = addToContextSlidesBanner(createPage, extractSlidesBanner());

  await createLandingPages({ graphql, createPage, createRedirect });
  await createPageNotFound({ createPage, createRedirect });
  await createBlogPages({
    graphql,
    createPage,
    createRedirect,
    options: { numberOfLatestPosts: 4 },
  });
  await createDocsPages({ graphql, createPage, buildFor: BuildFor.WEBSITE });
  await createCommunityPages({
    graphql,
    createPage,
    buildFor: BuildFor.WEBSITE,
  });
  await createRoadmapPages({ graphql, createPage, createRedirect });
};

const createDocsPreviewPages = async ({
  graphql,
  actions: { createRedirect, ...otherActions },
}: CreatePagesArgs) => {
  let createPage = createIntlPage(otherActions.createPage, createRedirect);
  createPage = createPreviewPage(createPage);

  await createDocsPages({
    graphql,
    createPage,
    buildFor: BuildFor.DOCS_PREVIEW,
  });
};

const createCommunityPreviewPages = async ({
  graphql,
  actions: { createRedirect, ...otherActions },
}: CreatePagesArgs) => {
  let createPage = createIntlPage(otherActions.createPage, createRedirect);
  createPage = createPreviewPage(createPage);

  await createCommunityPages({
    graphql,
    createPage,
    buildFor: BuildFor.COMMUNITY_PREVIEW,
  });
};

export const createPages = async (createPagesArgs: CreatePagesArgs) => {
  switch (process.env.BUILD_FOR) {
    case BuildFor.WEBSITE: {
      await createWebsitePages(createPagesArgs);
      return;
    }
    case BuildFor.WEBSITE_PREVIEW: {
      await createWebsitePreviewPages(createPagesArgs);
      return;
    }
    case BuildFor.DOCS_PREVIEW: {
      await createDocsPreviewPages(createPagesArgs);
      return;
    }
    case BuildFor.COMMUNITY_PREVIEW: {
      await createCommunityPreviewPages(createPagesArgs);
      return;
    }
    default: {
      await createWebsitePages(createPagesArgs);
    }
  }
};
