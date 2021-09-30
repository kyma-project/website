import { CreatePageFn, CreateRedirectFn } from "../../../types";
import { DocsRepository } from "./types";

export interface CreatDocsPageArgs {
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
  context: any;
  path: string;
  rootPath: string;
  repository: DocsRepository;
}

export const createComponentDocsPage = ({
  createPage,
  createRedirect,
  context: { docsType, topic },
  path,
  rootPath,
  repository,
}: CreatDocsPageArgs) => {
  createPage({
    path,
  });

  if (
    repository.rootPath.docsType === docsType &&
    repository.rootPath.docsTopic === topic
  ) {
    createPage({
      path: rootPath,
    });
  }
};
