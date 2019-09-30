import { CreatePageFn, CreateRedirectFn } from "../../../types";

export interface CreateLandingPageRootPageArgs {
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
}

export const createLandingPageRootPage = ({
  createPage,
  createRedirect,
}: CreateLandingPageRootPageArgs) => {
  const path = `/`;

  createRedirect({
    fromPath: "/index",
    redirectInBrowser: true,
    toPath: path,
  });

  createRedirect({
    fromPath: "/index.html",
    redirectInBrowser: true,
    toPath: path,
  });

  createPage({
    path,
  });
};
