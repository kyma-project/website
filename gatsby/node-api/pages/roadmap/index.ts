import { resolve } from "path";
import { createRoadmapRootPage } from "./rootPage";
import { createRoadmapModalPage } from "./modalPage";
import {
  CreatePageFn,
  CreateRedirectFn,
  GraphQLFunction,
} from "../../../types";
import { getCapabilities, createRoadmapPage } from "./helpers";

export interface CreateRoadmapPages {
  graphql: GraphQLFunction;
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
}

export const createRoadmapPages = async ({
  graphql,
  createPage: originalCreatePage,
  createRedirect,
}: CreateRoadmapPages) => {
  const roadmapTemplate: string = resolve(
    __dirname,
    "../../../../src/views/roadmap/index.tsx",
  );
  const capabilities = await getCapabilities(graphql);
  const createPage = createRoadmapPage(
    originalCreatePage,
    roadmapTemplate,
    capabilities,
  );

  createRoadmapRootPage({ createPage, createRedirect });
  createRoadmapModalPage({ createPage, createRedirect });
};
