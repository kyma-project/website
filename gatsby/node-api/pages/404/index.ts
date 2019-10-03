import { resolve } from "path";
import { CreatePageFn, CreateRedirectFn } from "../../../types";

export interface CreatePageNotFoundArgs {
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
}

export const createPageNotFound = async ({
  createPage,
  createRedirect,
}: CreatePageNotFoundArgs) => {
  const pageNotFoundTemplate: string = resolve(
    __dirname,
    "../../../../src/views/404/index.tsx",
  );
  const path = `/404/`;

  createRedirect({
    fromPath: "/404",
    redirectInBrowser: true,
    toPath: path,
  });

  createRedirect({
    fromPath: "/404.html",
    redirectInBrowser: true,
    toPath: path,
  });

  createPage({
    path,
    component: pageNotFoundTemplate,
  });
};
