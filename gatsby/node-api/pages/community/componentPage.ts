import { CreatePageFn } from "../../../types";
import { COMMUNITY_GET_STARTED_TYPE } from "../../../constants";

export interface CreatDocsPageArgs {
  createPage: CreatePageFn;
  context: any;
  path: string;
  rootPath: string;
}

export const createComponentCommunityPage = ({
  createPage,
  context: { docsType, topic },
  path,
  rootPath,
}: CreatDocsPageArgs) => {
  createPage({
    path,
  });

  if (
    COMMUNITY_GET_STARTED_TYPE === docsType &&
    COMMUNITY_GET_STARTED_TYPE === topic
  ) {
    createPage({
      path: rootPath,
    });
  }
};
