import { CreatePageFn, CreatePageFnArgs } from "../../../types";

export const createPreviewPage = (createPage: CreatePageFn): CreatePageFn => (
  props: CreatePageFnArgs,
) => {
  createPage({
    ...props,
    context: {
      ...props.context,
      inPreview: true,
    },
  });
};
