import { createRootPage } from "./rootPage";
import { createModalPage } from "./modalPage";
import { getCapabilities } from "./helpers";
import { CreatePageFn, CreateRedirectFn } from "../../../types";

export interface CreateRoadmapPages {
  graphql: Function;
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
}

export const createRoadmapPages = async ({
  graphql,
  createPage,
  createRedirect,
}: CreateRoadmapPages) => {
  const capabilities = await getCapabilities(graphql);

  createRootPage({ createPage, createRedirect, capabilities });
  createModalPage({ createPage, createRedirect, capabilities });
};
