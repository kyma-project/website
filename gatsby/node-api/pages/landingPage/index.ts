import { resolve } from "path";
import { createLandingPageRootPage } from "./rootPage";
import { CreatePageFn, CreateRedirectFn } from "../../../types";
import { createLandingPage } from "./helpers";

export interface CreateLandingPagesArgs {
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
}

export const createLandingPages = async ({
  createPage: createP,
  createRedirect,
}: CreateLandingPagesArgs) => {
  const landingPageTemplate: string = resolve(
    __dirname,
    "../../../../src/views/landingPage/index.tsx",
  );
  const createPage = createLandingPage(createP, landingPageTemplate);

  createLandingPageRootPage({ createPage, createRedirect });
};
