import { resolve } from "path";
import { createLandingPageRootPage } from "./rootPage";
import {
  CreatePageFn,
  CreateRedirectFn,
  GraphQLFunction,
} from "../../../types";
import { createLandingPage, getAdopters } from "./helpers";
import { getLastPost } from "../blog/helpers";

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
  const adopters = await getAdopters(graphql);
  const lastBlogPost = await getLastPost(graphql);

  const landingPageTemplate: string = resolve(
    __dirname,
    "../../../../src/views/landingPage/index.tsx",
  );
  const createPage = createLandingPage(createPageFn, landingPageTemplate, {
    adopters,
    lastBlogPost,
  });

  createLandingPageRootPage({ createPage, createRedirect });
};
