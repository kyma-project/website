import { CreateRoadmapPages } from "./types";
import { getCapabilities } from "./helpers";

import { createRootPage } from "./rootPage";
import { createModalPage } from "./modalPage";

export const createRoadmapPages = async ({
  graphql,
  createPage,
  createRedirect,
}: CreateRoadmapPages) => {
  const capabilities = await getCapabilities(graphql);

  createRootPage({ createPage, createRedirect, capabilities });
  createModalPage({ createPage, createRedirect, capabilities });
};
