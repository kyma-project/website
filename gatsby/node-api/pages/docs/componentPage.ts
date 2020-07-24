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

interface RedirectFromLatestArgs {
  createRedirect: CreateRedirectFn;
  path: string;
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

  redirectFromLatest({ createRedirect, path });
};

function redirectFromLatest({ createRedirect, path }: RedirectFromLatestArgs) {
  if (!path.includes("docs/latest")) {
    return;
  }

  const toPath = path.replace("docs/latest", "docs");
  createRedirect({
    fromPath: path,
    redirectInBrowser: true,
    toPath,
  });
  createRedirect({
    fromPath: path.endsWith("/") ? path.slice(0, -1) : `${path}/`,
    redirectInBrowser: true,
    toPath,
  });
  createRedirect({
    fromPath: "/docs/latest/",
    redirectInBrowser: true,
    toPath: "/docs/",
  });
  createRedirect({
    fromPath: "/docs/latest",
    redirectInBrowser: true,
    toPath: "/docs/",
  });
}
