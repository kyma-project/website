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
  specifications: Specification[];
}

const createPagesForSpecifications = ({
  createPage,
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
  context: { specifications },
}: CreatDocsPageArgs) => {
  createPagesForSpecifications({
    createPage,
    specifications,
  });
};
