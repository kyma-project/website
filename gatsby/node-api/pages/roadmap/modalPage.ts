import { resolve } from "path";
import {
  generateCapabilitiesNavigation,
  generateMapOfDisplayNameToId,
} from "./helpers";
import { CapabilityQL } from "./types";
import { CreatePageFn, CreateRedirectFn } from "../../../types";
import { ROADMAP_PATH_PREFIX } from "../../../constants";
import { Tickets } from "../../../../tools/content-loader/src/prepare-roadmap-content/types";

export interface CreateModalPageArgs {
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
  capabilities: CapabilityQL[];
}

const releases: Tickets = require("../../../../content/roadmap/tickets.json");

export const createModalPage = ({
  createPage,
  createRedirect,
  capabilities,
}: CreateModalPageArgs) => {
  const roadmapTemplate: string = resolve(
    __dirname,
    "../../../../src/templates/Roadmap.tsx",
  );

  const capabilitiesNavigation = generateCapabilitiesNavigation(capabilities);
  const ids = generateMapOfDisplayNameToId(capabilities);

  Object.keys(releases).map(release => {
    const capabilities = releases[release];

    Object.keys(capabilities).map(capability => {
      const tickets = capabilities[capability];

      tickets.map(ticket => {
        const path = `/${ROADMAP_PATH_PREFIX}/${ticket.repository.name}/${
          ticket.number
        }`;

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
            ticket,
          },
        });
      });
    });
  });
};
