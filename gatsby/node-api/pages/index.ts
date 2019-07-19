import { CreatePagesArgs } from "gatsby";
import { createIntlPage } from "./helpers";
import { CreateRedirectFn } from "../../types";

import { createBlogPages } from "./blog";
import { createDocsPages } from "./docs";
import { createRoadmapPages } from "./roadmap";
import { onCreatePage } from "./onCreatePage";

const createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const createPage = createIntlPage(actions);
  const { createRedirect: cr } = actions;
  const createRedirect = cr as CreateRedirectFn;

  await createBlogPages({ graphql, createPage, createRedirect });
  await createDocsPages({ graphql, createPage });
  await createRoadmapPages({ graphql, createPage, createRedirect });
};

export { createPages, onCreatePage };
