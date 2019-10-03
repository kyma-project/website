import { CreatePageFn, CreatePageFnArgs } from "../../../types";

export const createModalPage = (createPage: CreatePageFn): CreatePageFn => (
  props: CreatePageFnArgs,
) => {
  createPage({
    ...props,
    context: {
      ...props.context,
      inModal: true,
    },
  });
};
