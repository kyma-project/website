import { resolve } from "path";
import {
  generateCapabilitiesNavigation,
  generateMapOfDisplayNameToId,
} from "./helpers";
import { CapabilityQL } from "./types";
import { CreatePageFn, CreateRedirectFn } from "../../../types";
import { ROADMAP_PATH_PREFIX } from "../../../constants";

export interface CreateRootPageArgs {
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
  capabilities: CapabilityQL[];
}

export const createRootPage = ({
  createPage,
  createRedirect,
  capabilities,
}: CreateRootPageArgs) => {
  const roadmapTemplate: string = resolve(
    __dirname,
    "../../../../src/templates/Roadmap.tsx",
  );

  const capabilitiesNavigation = generateCapabilitiesNavigation(capabilities);
  const ids = generateMapOfDisplayNameToId(capabilities);
  const path = `/${ROADMAP_PATH_PREFIX}`;

  createRedirect({
    fromPath: path,
    redirectInBrowser: true,
    toPath: `${path}/`,
  });

  createPage({
    path: `${path}/`,
    component: roadmapTemplate,
    context: {
      capabilitiesNavigation,
      ids,
    },
  });
};
