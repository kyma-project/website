import { resolve } from "path";
import { createLandingPageRootPage } from "./rootPage";
import {
  CreatePageFn,
  CreateRedirectFn,
  GraphQLFunction,
} from "../../../types";
import { createLandingPage, getAdopters } from "./helpers";

export interface CreateLandingPagesArgs {
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
  graphql: GraphQLFunction;
}

export const createLandingPages = async ({
  createPage: createPageFn,
  createRedirect,
  graphql,
}: CreateLandingPagesArgs) => {
  const adopters = await getAdopters();
  const landingPageTemplate: string = resolve(
    __dirname,
    "../../../../src/views/landingPage/index.tsx",
  );
  const createPage = createLandingPage(createPageFn, landingPageTemplate, {
    adopters,
  });

  createLandingPageRootPage({ createPage, createRedirect });
};
