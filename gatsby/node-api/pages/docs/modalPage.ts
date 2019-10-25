import { CreatePageFn } from "../../../types";
import { Specification } from "@typings/docs";
import { createModalPage } from "../utils/createModalPage";
import {
  DOCS_PATH_PREFIX,
  DOCS_ROOT_TYPE,
  DOCS_KYMA_ID,
  DOCS_SPECIFICATIONS_PATH,
} from "../../../constants";

interface CreatePagesForSpecificationsArgs {
  createPage: CreatePageFn;
  path: string;
  specifications: Specification[];
}

const createPagesForSpecifications = ({
  createPage,
  path,
  specifications,
}: CreatePagesForSpecificationsArgs) => {
  if (!specifications || !specifications.length) {
    return;
  }

  specifications.forEach(specification => {
    createModalPage(createPage)({
      path: specification.pageUrl,
      context: {
        modalContext: {
          specifications,
          specification,
        },
      },
    });
  });
};

export interface CreatDocsPageArgs {
  createPage: CreatePageFn;
  context: any;
}

export const createModalDocsPage = ({
  createPage,
  context: { version, docsType, topic, specifications },
}: CreatDocsPageArgs) => {
  const path = `/${DOCS_PATH_PREFIX}/${
    version ? `${version}/` : ""
  }${docsType}/${topic}/${DOCS_SPECIFICATIONS_PATH}`;

  createPagesForSpecifications({
    createPage,
    path,
    specifications,
  });

  if (DOCS_ROOT_TYPE === docsType && DOCS_KYMA_ID === topic) {
    const rootPath = `/${DOCS_PATH_PREFIX}/${version}/${DOCS_SPECIFICATIONS_PATH}`;
    createPagesForSpecifications({
      createPage,
      path: rootPath,
      specifications,
    });
  }
};
