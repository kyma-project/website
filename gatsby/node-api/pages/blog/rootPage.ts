import { resolve } from "path";
import { PostGQL } from "./types";
import { BLOG_PATH_PREFIX } from "../../../constants";
import { CreatePageFn, CreateRedirectFn } from "../../../types";

export interface CreateRootBlogPageArgs {
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
  posts: PostGQL[];
}

export const createRootPage = ({
  createPage,
  createRedirect,
  posts,
}: CreateRootBlogPageArgs) => {
  const blogTemplate: string = resolve(
    __dirname,
    "../../../../src/views/blog/root/index.tsx",
  );
  const path = `/${BLOG_PATH_PREFIX}`;

  createRedirect({
    fromPath: path,
    redirectInBrowser: true,
    toPath: `${path}/`,
  });

  createPage({
    path: `${path}/`,
    component: blogTemplate,
    context: {
      posts,
    },
  });
};
