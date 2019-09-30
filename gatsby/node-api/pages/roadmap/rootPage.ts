import { CreatePageFn, CreateRedirectFn } from "../../../types";
import { ROADMAP_PATH_PREFIX } from "../../../constants";

export interface CreateRoadmapRootPageArgs {
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
}

export const createRoadmapRootPage = ({
  createPage,
  createRedirect,
}: CreateRoadmapRootPageArgs) => {
  const path = `/${ROADMAP_PATH_PREFIX}`;

  createRedirect({
    fromPath: path,
    redirectInBrowser: true,
    toPath: `${path}/`,
  });

  createPage({
    path: `${path}/`,
  });
};
