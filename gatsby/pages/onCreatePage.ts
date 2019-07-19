import { createIntlPage } from "./helpers";

export const onCreatePage = async ({ page, actions }: any) => {
  const createPage = createIntlPage(actions);
  const { deletePage } = actions;

  return new Promise(resolve => {
    if (page.path && page.component && page.context) {
      deletePage({
        path: page.path,
        component: page.component,
      });
      createPage({
        path: page.path,
        component: page.component,
        context: page.context,
      });
    }
    resolve();
  });
};
