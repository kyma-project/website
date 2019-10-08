import { resolve } from "path";
import { createLandingPageRootPage } from "./rootPage";
import {
  CreatePageFn,
  CreateRedirectFn,
  GraphQLFunction,
} from "../../../types";
import { createLandingPage, getAdopters } from "./helpers";

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
  const landingPageTemplate: string = resolve(
    __dirname,
    "../../../../src/views/landingPage/index.tsx",
  );
  const createPage = createLandingPage(
    createPageFn,
    landingPageTemplate,
    adopters,
  );

  createLandingPageRootPage({ createPage, createRedirect });
};
