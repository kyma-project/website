import { resolve } from "path";
import { createLandingPageRootPage } from "./rootPage";
import {
  GraphQLFunction,
  CreatePageFn,
  CreateRedirectFn,
} from "../../../types";
import { createLandingPage, getAdopters } from "./helpers";
import { getPosts } from "../blog/helpers";

export interface CreateLandingPagesArgs {
  graphql: GraphQLFunction;
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
}

export const createLandingPages = async ({
  graphql,
  createPage: createPageFn,
  createRedirect,
}: CreateLandingPagesArgs) => {
  const adopters = await getAdopters();
  const latestBlogPosts = await getPosts(graphql, 4);
  const context = {
    adopters,
    latestBlogPosts,
  };
  const landingPageTemplate: string = resolve(
    __dirname,
    "../../../../src/views/landingPage/index.tsx",
  );
  const createPage = createLandingPage(
    createPageFn,
    landingPageTemplate,
    context,
  );

  createLandingPageRootPage({ createPage, createRedirect });
};
