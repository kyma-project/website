import { CreatePageFn, CreateRedirectFn } from "../../../types";
import { DOCS_ROOT_TYPE, DOCS_KYMA_ID } from "../../../constants";

export interface CreatDocsPageArgs {
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
  context: any;
  path: string;
  rootPath: string;
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
}: CreatDocsPageArgs) => {
  createPage({
    path,
  });

  if (DOCS_ROOT_TYPE === docsType && DOCS_KYMA_ID === topic) {
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
