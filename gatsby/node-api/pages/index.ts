import { CreatePagesArgs } from "gatsby";
import {
  createIntlPage,
  addToContextSlidesBanner,
  extractSlidesBanner,
  createPreviewPage,
} from "./utils";

import { createLandingPages } from "./landingPage";
import { createPageNotFound } from "./404";
import { createDocsPages } from "./docs";

import { BuildFor } from "../../../src/types/common";

const createWebsitePages = async ({
  graphql,
  actions: { createRedirect, ...otherActions },
}: CreatePagesArgs) => {
  let createPage = createIntlPage(otherActions.createPage, createRedirect);
  createPage = addToContextSlidesBanner(createPage, extractSlidesBanner());

  await createLandingPages({ graphql, createPage, createRedirect });
  await createPageNotFound({ createPage, createRedirect });
  await createDocsPages({
    graphql,
    createPage,
    createRedirect,
    buildFor: BuildFor.WEBSITE,
  });
};

const createWebsitePreviewPages = async ({
  graphql,
  actions: { createRedirect, ...otherActions },
}: CreatePagesArgs) => {
  let createPage = createIntlPage(otherActions.createPage, createRedirect);
  createPage = addToContextSlidesBanner(createPage, extractSlidesBanner());

  await createLandingPages({ graphql, createPage, createRedirect });
  await createPageNotFound({ createPage, createRedirect });

  await createDocsPages({
    graphql,
    createPage,
    createRedirect,
    buildFor: BuildFor.WEBSITE,
  });
};

const createDocsPreviewPages = async (
  { graphql, actions: { createRedirect, ...otherActions } }: CreatePagesArgs,
  prepareForRepo = "kyma",
) => {
  let createPage = createIntlPage(otherActions.createPage, createRedirect);
  createPage = createPreviewPage(createPage);
  await createDocsPages({
    graphql,
    createPage,
    createRedirect,
    buildFor: BuildFor.DOCS_PREVIEW,
    prepareForRepo,
  });
};

const createCommunityPreviewPages = async ({
  graphql,
  actions: { createRedirect, ...otherActions },
}: CreatePagesArgs) => {
  let createPage = createIntlPage(otherActions.createPage, createRedirect);
  createPage = createPreviewPage(createPage);
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
      await createDocsPreviewPages(
        createPagesArgs,
        process.env.APP_PREPARE_FOR_REPO,
      );
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
