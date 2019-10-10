import { CreatePageFn, CreateRedirectFn } from "../../../types";
import { ROADMAP_PATH_PREFIX } from "../../../constants";
import { createModalPage } from "../utils/createModalPage";
import { Tickets } from "../../../../tools/content-loader/src/prepare-roadmap/types";

import allTickets from "../../../../content/roadmap/tickets.json";

export interface CreateRoadmapModalPageArgs {
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
}

export const createRoadmapModalPage = ({
  createPage,
  createRedirect,
}: CreateRoadmapModalPageArgs) => {
  // this convert is intentional
  const releases = (allTickets as any) as Tickets;

  Object.keys(releases).map(release => {
    const capabilities = releases[release];

    Object.keys(capabilities).map(capability => {
      const tickets = capabilities[capability];

      tickets.map(ticket => {
        const path = `/${ROADMAP_PATH_PREFIX}/${ticket.repository.name}/${ticket.number}`;

        createRedirect({
          fromPath: path,
          redirectInBrowser: true,
          toPath: `${path}/`,
        });

        createModalPage(createPage)({
          path: `${path}/`,
          context: {
            modalContext: {
              ticket,
            },
          },
        });
      });
    });
  });
};
