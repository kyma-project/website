import {
  createIntlPage,
  addToContextSlidesBanner,
  extractSlidesBanner,
} from "./utils";

export const onCreatePage = async ({ page, actions }: any) => {
  let createPage = createIntlPage(actions.createPage, actions.createRedirect);
  createPage = addToContextSlidesBanner(createPage, extractSlidesBanner());

  return new Promise(resolve => {
    if (page.path && page.component && page.context) {
      actions.deletePage({
        path: page.path,
        component: page.component,
      });
      createPage({
        path: page.path,
        component: page.component,
        context: {
          ...page.context,
          horizontalHeaderBg: page.path !== "/",
        },
      });
    }
    resolve();
  });
};
