import { CreatePageFn } from "../../../types";
import {
  DOCS_PATH_PREFIX,
  DOCS_ROOT_TYPE,
  DOCS_KYMA_ID,
} from "../../../constants";

export interface CreatDocsPageArgs {
  createPage: CreatePageFn;
  context: any;
}

export const createComponentDocsPage = ({
  createPage,
  context: { version, docsType, topic },
}: CreatDocsPageArgs) => {
  const path = `/${DOCS_PATH_PREFIX}/${
    version ? `${version}/` : ""
  }${docsType}/${topic}`;

  createPage({
    path,
  });

  if (DOCS_ROOT_TYPE === docsType && DOCS_KYMA_ID === topic) {
    const rootPath = `/${DOCS_PATH_PREFIX}/${version}`;
    createPage({
      path: rootPath,
    });
  }
};
